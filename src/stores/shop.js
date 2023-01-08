import { defineStore } from 'pinia'
import equal from 'fast-deep-equal';
import { validateEmail, decimalPlacesCurrency } from '@/helper.js'
import { DateTime } from "luxon";
import axios from 'axios'
import { loadScript } from "@paypal/paypal-js";
const axiosInstance = axios.create({
  baseURL: 'https://api.delivery.plus'
});

export const useShopStore = defineStore('store', {
  state: () => {
    return {
      toggleOpen: false,
      cdn: import.meta.env.VITE_DEV == "1" ? 'https://cdn.delivery.plus/' : '',
      shop: shop,
      cart: [],
      paypal: null,
      paypalCheckout: false,
      paymentError: false,
      successPayment: false,
      //Message
      Email: '',
      Message: '',
      messageHasSent: false,
      //Shop 
      showIngredientsOfProduct: '',
      showMoreIngredientsOfProduct: [],
      selectedIngredientsOfProduct: {},
      showMobileCart: false,
      showAddressView: 'cart',
      reRenderId: 0,
      //Adress
      saveAddress: false,
      orderCheckbox: false,
      order: {
        DeliveryType: "",
        PaymentType: "",
        FullName: "",
        Street: "",
        PostalCode: "",
        City: "",
        Email: "",
        Phone: "",
        Notes: "",
      },
      //Modal
      showModal: false,
      modalClass: '',
      modalTitle: '',
      modalText: '',
    }
  },
  getters: {
    /*********************************************************************************
    ***********************************Region Getters*********************************
    *********************************************************************************/

    getShopTimezone(state) {
      if (state.shop.Settings.ShopTimezone != '') {
        return state.shop.Settings.ShopTimezone
      }
      return 'Europe/Berlin'
    },
    getShopLangCode(state) {
      if (state.shop.Settings.ShopLangCode != '') {
        return state.shop.Settings.ShopLangCode
      }
      return navigator.language || navigator.userLanguage
    },
    getShopCurrency(state) {
      if (state.shop.Settings.ShopCurrency != '') {
        return state.shop.Settings.ShopCurrency
      }
      return "EUR"
    },
    getShopLanguage(state) {
      if (state.shop.Settings.ShopLangCode != '') {
        return state.shop.Settings.ShopLanguage
      }
      return "GERMAN"
    },
    getAmountWithCurrency(_) {
      return (amount) => {
        return new Intl.NumberFormat(this.getShopLangCode, { style: 'currency', currency: this.getShopCurrency }).formatToParts(amount).map(val => val.value).join('');
      }
    },
    getDecimalOfCurrency(state) {
      const decimal = decimalPlacesCurrency[state.shop.Settings.ShopCurrency]
      if (decimal == undefined) {
        console.err("Invalid CurrencyCode")
        console.err(decimal)
        console.err(state.shop.Settings.ShopCurrency)
      }
      return decimal == undefined ? 2 : decimal
    },

    /*********************************************************************************
    *********************************OpenHours Getters*********************************
    *********************************************************************************/

    getOpenHoursTime(_) {
      return (day, openTime, closeTime, dayHasPause, dayPauseStart, dayPauseEnd) => {
        if (day == false)
          return false
        if (dayHasPause) {
          return this.getFormatedTime(openTime) + ' - ' + this.getFormatedTime(dayPauseStart) + '\n' + this.getFormatedTime(dayPauseEnd) + ' - ' + this.getFormatedTime(closeTime)
        }
        return this.getFormatedTime(openTime) + ' - ' + this.getFormatedTime(closeTime)
      }
    },
    getFormatedTime(state) {
      return (time) => {
        if (state.shop.Settings.ShopTimeFormat == false) {
          return time
        } else {
          let timeSplit = time.split(":")
          let pmAm = Number(timeSplit[0]) >= 12 ? 'PM' : 'AM';
          let hours = (Number(timeSplit[0]) % 12) || 12
          return hours + ':' + timeSplit[1] + ' ' + pmAm
        }

      }
    },
    isShopInHoliday(state) {
      return () => {
        let now = DateTime.now()
        for (let holiday of state.shop.Holidays) {
          if (holiday.StartDate < now.ts && now.ts < holiday.EndDate)
            return true
        }
        return false
      }
    },
    isShopOpenOnDay(state) {
      return (openHourDay, openHourDayBefore, now, dayBefore, dayAfter) => {
        if (state.shop.OpenHours[openHourDay]) {
          let openDate = this.buildDateObject(state.shop.OpenHours[openHourDay + 'Open'], now, this.getShopTimezone, this.getShopLangCode)
          let closeDate = this.buildDateObject(state.shop.OpenHours[openHourDay + 'Close'], now, this.getShopTimezone, this.getShopLangCode)
          if (openDate > closeDate)
            closeDate = this.buildDateObject(state.shop.OpenHours[openHourDay + 'Close'], dayAfter, this.getShopTimezone, this.getShopLangCode)

          if (state.shop.OpenHours[openHourDay + 'Pause'] == false && openDate.ts < now.ts && now.ts < closeDate.ts)
            return true

          if (state.shop.OpenHours[openHourDay + 'Pause']) {
            let pauseStart = this.buildDateObject(state.shop.OpenHours[openHourDay + 'PauseStart'], now, this.getShopTimezone, this.getShopLangCode)
            let pauseEnd = this.buildDateObject(state.shop.OpenHours[openHourDay + 'PauseEnd'], now, this.getShopTimezone, this.getShopLangCode)
            if (pauseStart > pauseEnd)
              pauseEnd = this.buildDateObject(state.shop.OpenHours[openHourDay + 'PauseEnd'], dayAfter, this.getShopTimezone, this.getShopLangCode)

            if ((openDate.ts < now.ts && now.ts < pauseStart.ts) || (pauseEnd.ts < now.ts && now.ts < closeDate.ts)) {
              return true
            }
          }
        }

        if (state.shop.OpenHours[openHourDayBefore]) {
          let dayBeforeOpenDate = this.buildDateObject(state.shop.OpenHours[openHourDayBefore + 'Open'], dayBefore, this.getShopTimezone, this.getShopLangCode)
          let dayBeforeCloseDate = this.buildDateObject(state.shop.OpenHours[openHourDayBefore + 'Close'], dayBefore, this.getShopTimezone, this.getShopLangCode)
          if (dayBeforeOpenDate > dayBeforeCloseDate) {
            dayBeforeCloseDate = this.buildDateObject(state.shop.OpenHours[openHourDayBefore + 'Close'], now, this.getShopTimezone, this.getShopLangCode)
            if (state.shop.OpenHours[openHourDayBefore + 'Pause'] == false && dayBeforeOpenDate.ts < now.ts && now.ts < dayBeforeCloseDate.ts)
              return true

            if (state.shop.OpenHours[openHourDayBefore + 'Pause']) {
              let dayBeforePauseStart = this.buildDateObject(state.shop.OpenHours[openHourDayBefore + 'PauseStart'], dayBefore, this.getShopTimezone, this.getShopLangCode)
              let dayBeforePauseEnd = this.buildDateObject(state.shop.OpenHours[openHourDayBefore + 'PauseEnd'], dayBefore, this.getShopTimezone, this.getShopLangCode)
              if (dayBeforePauseStart > dayBeforePauseEnd)
                dayBeforePauseEnd = this.buildDateObject(state.shop.OpenHours[openHourDayBefore + 'PauseEnd'], now, this.getShopTimezone, this.getShopLangCode)

              if ((dayBeforeOpenDate.ts < now.ts && now.ts < dayBeforePauseStart.ts) || (dayBeforePauseEnd.ts < now.ts && now.ts < dayBeforeCloseDate.ts)) {
                return true
              }
            }
          }
        }
        return false
      }
    },
    isShopOpen(state) {
      return () => {
        let now = DateTime.now().setZone(this.getShopTimezone)
        let dayBefore = DateTime.now().setZone(this.getShopTimezone).minus({ days: 1 })
        let dayAfter = DateTime.now().setZone(this.getShopTimezone).plus({ days: 1 })
        if (this.isShopInHoliday())
          return false
        if (state.shop.Settings.ShopStatus == false)
          return false
        switch (now.weekday) {
          case 1:
            return this.isShopOpenOnDay('Monday', 'Sunday', now, dayBefore, dayAfter)
          case 2:
            return this.isShopOpenOnDay('Tuesday', 'Monday', now, dayBefore, dayAfter)
          case 3:
            return this.isShopOpenOnDay('Wednesday', 'Tuesday', now, dayBefore, dayAfter)
          case 4:
            return this.isShopOpenOnDay('Thursday', 'Wednesday', now, dayBefore, dayAfter)
          case 5:
            return this.isShopOpenOnDay('Friday', 'Thursday', now, dayBefore, dayAfter)
          case 6:
            return this.isShopOpenOnDay('Saturday', 'Friday', now, dayBefore, dayAfter)
          case 7:
            return this.isShopOpenOnDay('Sunday', 'Saturday', now, dayBefore, dayAfter)
        }
      }
    },

    /*********************************************************************************
    ********************************Ingredients Getters*******************************
    *********************************************************************************/

    isIngredientsEmpty(_) {
      return (product) => {
        return (Object.keys(product.Ingredients).length == 0 &&
          Object.keys(product.SimpleIngredients).length == 0 &&
          Object.keys(product.SimpleIngredient2s).length == 0 &&
          Object.keys(product.SimpleIngredient3s).length == 0)
      }
    },
    getSortedIngredients(state) {
      return (ingredients) => {
        if (state.shop.Settings.IngredientSorting == "PriceUp") {
          return Object.entries(ingredients).sort((a, b) => a[1].Price - b[1].Price)
        } else if (state.shop.Settings.IngredientSorting == "PriceDown") {
          return Object.entries(ingredients).sort((a, b) => b[1].Price - a[1].Price)
        } else if (state.shop.Settings.IngredientSorting == "TitleUp") {
          return Object.entries(ingredients).sort((a, b) => a[1].Title.localeCompare(b[1].Title))
        } else if (state.shop.Settings.IngredientSorting == "TitleDown") {
          return Object.entries(ingredients).sort((a, b) => b[1].Title.localeCompare(a[1].Title))
        } else if (state.shop.Settings.IngredientSorting == "PositionUp") {
          return Object.entries(ingredients).sort((a, b) => a[1].Position - b[1].Position)
        } else if (state.shop.Settings.IngredientSorting == "PositionDown") {
          return Object.entries(ingredients).sort((a, b) => b[1].Position - a[1].Position)
        } else {
          return Object.entries(ingredients)
        }
      }
    },
    getSortedCategorys(state) {
      return (categorys) => {
        if (state.shop.Settings.CategorySorting == "TitleUp") {
          return categorys.sort((a, b) => a.Title.localeCompare(b.Title))
        } else if (state.shop.Settings.CategorySorting == "TitleDown") {
          return categorys.sort((a, b) => b.Title.localeCompare(a.Title))
        } else if (state.shop.Settings.CategorySorting == "PositionUp") {
          return categorys.sort((a, b) => a.Position - b.Position)
        } else if (state.shop.Settings.CategorySorting == "PositionDown") {
          return categorys.sort((a, b) => b.Position - a.Position)
        } else {
          return categorys
        }
      }
    },
    getSortedProducts(state) {
      return (products) => {
        if (state.shop.Settings.ProductSorting == "PriceUp") {
          return products.sort((a, b) => a.Price - b.Price)
        } else if (state.shop.Settings.ProductSorting == "PriceDown") {
          return products.sort((a, b) => b.Price - a.Price)
        } else if (state.shop.Settings.ProductSorting == "TitleUp") {
          return products.sort((a, b) => a.Title.localeCompare(b.Title))
        } else if (state.shop.Settings.ProductSorting == "TitleDown") {
          return products.sort((a, b) => b.Title.localeCompare(a.Title))
        } else if (state.shop.Settings.ProductSorting == "PositionUp") {
          return products.sort((a, b) => a.Position - b.Position)
        } else if (state.shop.Settings.ProductSorting == "PositionDown") {
          return products.sort((a, b) => b.Position - a.Position)
        } else {
          return products
        }
      }
    },
    getIngredientsList(_) {
      return (product) => {
        let list = ''
        Object.entries(product.Ingredients).forEach((ingredient) => {
          list += (ingredient[1].Title + ', ')
        })
        Object.entries(product.SimpleIngredients).forEach((ingredient) => {
          list += (ingredient[1].Title + ', ')
        })
        Object.entries(product.SimpleIngredient2s).forEach((ingredient) => {
          list += (ingredient[1].Title + ', ')
        })
        Object.entries(product.SimpleIngredient3s).forEach((ingredient) => {
          list += (ingredient[1].Title + ', ')
        })
        return list.slice(0, -2)
      }
    },
    getTotalAmountOfProduct(_) {
      return (product) => {
        let amount = product.Price
        Object.entries(product.Ingredients).forEach((ingredient) => {
          amount += ingredient[1].Price
        })
        Object.entries(product.SimpleIngredients).forEach((ingredient) => {
          amount += ingredient[1].Price
        })
        Object.entries(product.SimpleIngredient2s).forEach((ingredient) => {
          amount += ingredient[1].Price
        })
        Object.entries(product.SimpleIngredient3s).forEach((ingredient) => {
          amount += ingredient[1].Price
        })
        return +(amount * product.Counter).toFixed(this.getDecimalOfCurrency)
      }
    },
    getTotalAmountOfCart(state) {
      let amount = 0
      for (let cartEntry of state.cart) {
        amount = +(amount + this.getTotalAmountOfProduct(cartEntry)).toFixed(this.getDecimalOfCurrency)
      }
      return amount
    },
    isPostalCodeInDeliveryArea(state) {
      if (state.shop.DeliveryAreas.length == 0)
        return true
      for (let deliveryArea of state.shop.DeliveryAreas) {
        if (state.order.PostalCode == deliveryArea.PostalCode)
          return true
      }
      return false
    },
    getMinimumOrderValueOfPostalCode(state) {
      for (let deliveryArea of state.shop.DeliveryAreas) {
        if (state.order.PostalCode == deliveryArea.PostalCode) {
          return deliveryArea.MinimumOrderValue
        }
      }
      return state.shop.Settings.MinimumOrderValue
    },
    getDeliveryAreasTextFormatted(state) {
      return (textInfo, postalCode, minimumOrderValue) => {
        let text = textInfo
        for (let deliveryArea of state.shop.DeliveryAreas) {
          text += '\n' + postalCode + ': ' + deliveryArea.PostalCode + ' | ' + minimumOrderValue + ': ' + this.getAmountWithCurrency(deliveryArea.MinimumOrderValue)
        }
        return text
      }
    },
    isOrderValid(state) {
      if (state.orderCheckbox == false || state.order.DeliveryType == '' || state.order.PaymentType == '' || state.order.FullName == '' ||
        state.order.Street == '' || state.order.PostalCode == '' || state.order.City == '' || state.order.Email == '' ||
        state.order.Phone == '' || !validateEmail(state.order.Email) || !state.isPostalCodeInDeliveryArea ||
        state.getMinimumOrderValueOfPostalCode > state.getTotalAmountOfCart)
        return false
      return true
    },
  },
  actions: {
    buildDateObject(day, now, timeZone, langCode) {
      let time = day.split(':')
      return DateTime.fromObject({
        day: now.day,
        month: now.month,
        year: now.year,
        hour: +time[0],
        minute: +time[1]
      }, {
        zone: timeZone,
        locale: langCode,
      })
    },
    addToCart(product) {
      this.showAddressView = 'cart'
      let cartEntrys = this.cart.filter(cartEntry => cartEntry.Id === product.Id)
      for (let cartEntry of cartEntrys) {
        if (equal({ ...product, Counter: undefined }, { ...cartEntry, Counter: undefined })) {
          cartEntry.Counter += product.Counter
          return
        }
      }
      this.cart.push(JSON.parse(JSON.stringify(product)))
    },
    clickOnProductButton(product) {
      if (this.isIngredientsEmpty(product)) {
        let cartProduct = {
          Id: product.Id,
          Title: product.Title,
          Description: product.Description,
          Price: product.Price,
          Tax: product.Tax,
          Ingredients: {},
          SimpleIngredients: {},
          SimpleIngredient2s: {},
          SimpleIngredient3s: {},
          Counter: 1,
        }
        this.addToCart(cartProduct)
      } else {
        this.showIngredientsOfProduct == product.Id ? this.showIngredientsOfProduct = '' : this.showIngredientsOfProduct = product.Id
      }
    },
    selectIngredient(event, product, ingredient) {
      if (event.target.checked) {
        this.selectedIngredientsOfProduct[product.Id].Ingredients[ingredient[0]] = ingredient[1]
      } else {
        delete this.selectedIngredientsOfProduct[product.Id].Ingredients[ingredient[0]]
      }
    },
    saveAdressLocalStorage(saveItem) {
      localStorage.removeItem('delivery_address');
      if (saveItem) {
        var cart = {
          /* DeliveryType: this.order.DeliveryType, */
          /* PaymentType: this.order.PaymentType, */
          FullName: this.order.FullName,
          Street: this.order.Street,
          PostalCode: this.order.PostalCode,
          City: this.order.City,
          Email: this.order.Email,
          Phone: this.order.Phone,
          Notes: this.order.Notes,
        }
        localStorage.setItem('delivery_address', JSON.stringify(cart))
      }
    },
    getAddressFromLocalStorage() {
      let cart = JSON.parse(localStorage.getItem('delivery_address'))
      if (cart != null) {
        this.saveAddress = true
        /* this.order.DeliveryType = 'DeliveryType' in cart ? cart.DeliveryType : '' */
        /* this.order.PaymentType = 'PaymentType' in cart && this.shop.Settings ? cart.PaymentType : '' */
        this.order.FullName = 'FullName' in cart ? cart.FullName : ''
        this.order.Street = 'Street' in cart ? cart.Street : ''
        this.order.PostalCode = 'PostalCode' in cart ? cart.PostalCode : ''
        this.order.City = 'City' in cart ? cart.City : ''
        this.order.Email = 'Email' in cart ? cart.Email : ''
        this.order.Phone = 'Phone' in cart ? cart.Phone : ''
        this.order.Notes = 'Notes' in cart ? cart.Notes : ''
      }
    },
    openModal(title, text, classNames) {
      this.modalTitle = title
      this.modalText = text
      this.modalClass = classNames
      this.showModal = true
    },
    createOrder(paymentId = '') {
      axiosInstance.post('/order', {
        ShopId: this.shop.ShopId,
        CognitoIdentityId: this.shop.CognitoIdentityId,
        SubId: this.shop.SubId,
        Timezone: this.shop.Settings.ShopTimezone,
        PaymentId: paymentId,
        Email: this.order.Email,
        Price: this.getTotalAmountOfCart,
        CurrencyCode: this.shop.Settings.ShopCurrency,
        PaymentType: this.order.PaymentType,
        DeliveryType: this.order.DeliveryType,
        Phone: this.order.Phone,
        FullName: this.order.FullName,
        Street: this.order.Street,
        PostalCode: this.order.PostalCode,
        City: this.order.City,
        Notes: this.order.Notes,
        ShopName: this.shop.Homepage.ShopName,
        ShopTelephone: this.shop.Settings.Telephone,
        ShopEmail: this.shop.Settings.Email,
        ShopStreet: this.shop.Settings.Street,
        ShopPostalCode: this.shop.Settings.PostalCode,
        ShopCity: this.shop.Settings.City,
        ShopLanguage: this.shop.Settings.ShopLanguage,
        SendMailCustomer: this.shop.Settings.SendMailCustomer,
        ShopLangCode: this.shop.Settings.ShopLangCode,
        CartEntry: this.cart
      }).then(() => {
        this.cart = []
        this.orderCheckbox = false
        this.showAddressView = 'successPayment'
      }).catch((error) => {
        this.showAddressView = 'errorPayment'
        console.log(error);
      });
      return true
    },
    createMessage(email, message) {
      axiosInstance.post('/message', {
        ShopId: this.shop.ShopId,
        SubId: this.shop.SubId,
        CognitoIdentityId: this.shop.CognitoIdentityId,
        Email: email,
        Message: message
      }).then(() => {
        this.messageHasSent = true
      }).catch((error) => {
        console.log(error);
      });
    },
    reRender() {
      this.reRenderId++
      return true
    },
    async loadPaypalScript() {
      try {
        this.paypal = await loadScript({
          "client-id": this.shop.Settings.PaypalClientId,
          currency: this.shop.Settings.ShopCurrency
        });
        console.log("loaded paypal")
      } catch (error) {
        console.error("failed to load the PayPal JS SDK script", error);
      }
    },
    checkPaymentMethod() {
      if (this.order.PaymentType == 'paypal') {
        this.showAddressView = 'paypalCheckout'
      } else if (this.order.PaymentType == 'cashPayment') {
        this.createOrder()
      }
      return true
    }
  },
})
