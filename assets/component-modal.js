class ProductDeliveryModal extends HTMLElement {
  constructor() {
    super();

    this.dateButtonContainer = this.querySelector('core-availability ol')
    this.dateSelectContainer = this.querySelector('#other-delivery-dates')
    this.createButtonsAndInputs();
    // add event listeners to buttons and inputs
    this.deliveryDateInput = document.getElementById('delivery-date')
    this.zipCodeInput = document.getElementById('zip-code')
    
    this.wireButtonsAndInputs();

    this.openModalLogic();

    // modal close button set onclick
    this.querySelector('button.close').onclick = (e) => {
      document.querySelector('body').classList.remove('modal-open')
      this.classList.remove('show')
    }
  }

  createButtonsAndInputs() {
    let dateToday = new Date()

    const firstOptionCtaBtn = document.querySelector('.first-option-cta button')
    firstOptionCtaBtn.value = dateToday.toISOString();
    firstOptionCtaBtn.textContent = `Available as Early as: ${dateToday.toLocaleString('en-us', {  weekday: 'long', month: 'long', day: '2-digit' })}`
    this.updateDeliveryDate(firstOptionCtaBtn, 'click')


    // Buttons
    for (let i=0; i < 30; i++) {
      const listEl = new DOMParser().parseFromString(
        `
        <li class="option col-6 col-md-4 col-lg-2">
          <button
            class="option-content"
            type="button"
            value="${dateToday.toISOString()}"
            data-label="${dateToday.toLocaleString('en-us', {  weekday: 'long', month: 'long', day: '2-digit' })}"
            style="border-color: rgb(99, 93, 168); color: rgb(99, 93, 168); box-shadow: none;"
          >
            <div class="label">
              <span class="weekday">${dateToday.toLocaleString('en-us', {  weekday: 'short'})}</span>
              <div class="month-day">${dateToday.toLocaleString('en-us', { month: 'short', day: '2-digit'})}</div>
            </div>
          </button>
        </li>
      `
      , 'text/html').querySelector('li')
      this.dateButtonContainer.append(listEl)
      dateToday.setDate(dateToday.getDate() + 1);
    }
    // Inputs
    for (let i=0; i <30; i++) {
      const dateOptionEl = new DOMParser().parseFromString(
        `<option
          data-label="${dateToday.toLocaleString('en-us', {  weekday: 'long', month: 'long', day: '2-digit' })}"
          value="${dateToday.toISOString()}"
        >
          ${dateToday.toLocaleString('en-us', {  weekday: 'short', month: 'short', day: '2-digit'})}
        </option>`
      , 'text/html').querySelector('option')
    
      this.dateSelectContainer.append(dateOptionEl)
      dateToday.setDate(dateToday.getDate() + 1);
    }
  }

  wireButtonsAndInputs() {
    // button click / close modal


    Array.from(this.dateButtonContainer.querySelectorAll('li button')).forEach((deliveryBtn) => {
      this.updateDeliveryDate(deliveryBtn, 'click')
    })

    // selector change / close modal
    this.updateDeliveryDate(this.dateSelectContainer, 'change')
  }

  openModalLogic() {
    this.openModalBtnEls = Array.from(document.querySelectorAll('.delivery-date-button'))
    const sectionErrorEl = this.zipCodeInput.closest('fieldset').querySelector('.section-error')

    this.zipCodeInput.addEventListener('change', (e) => {
      document.getElementById('modal-zip-code').value = this.zipCodeInput.value
    })

    this.openModalBtnEls.forEach((openModalBtn) => {
      openModalBtn.onclick = (e) => {
        const zipInputIsInteger = Number.isInteger(+this.zipCodeInput.value.trim())
        const zipInputIsLength = `${+this.zipCodeInput.value.trim()}`.length == 5
    
        if (zipInputIsInteger && zipInputIsLength) {
          this.openModal(sectionErrorEl);
        } else {
          this.openModalError(sectionErrorEl);
        }
      }
    })
  }
  
  updateDeliveryDate(deliveryBtnOrOption, event = 'click') {
    deliveryBtnOrOption.addEventListener(event, (e) => {
      this.deliveryDateInput.value = new Date(deliveryBtnOrOption.value).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: '2-digit' });

      this.closeModal()
    })
  }

  openModal(sectionErrorEl) {
    sectionErrorEl.innerHTML = ''
    this.zipCodeInput.classList.remove('border-red')
    document.querySelector('body').classList.add('modal-open')
    this.classList.add('show')
    this.scrollTop = 0
  }

  openModalError(sectionErrorEl) {
    const zipCodeRect = this.zipCodeInput.closest('fieldset').getBoundingClientRect();
    if (zipCodeRect.top <= 0) this.zipCodeInput.closest('fieldset').scrollIntoView()
    this.zipCodeInput.classList.add('border-red')
    sectionErrorEl.innerHTML = `
    <div class="invalid-feedback">
      Please enter recipient's zip code for delivery information.
    </div>
    `
  }

  closeModal() {
    const openDeliveryModalBtns = Array.from(document.querySelectorAll('.delivery-date-button'))
    const submitBtn = document.querySelector('button[type="submit"]')

    this.deliveryDateInput.parentElement.classList.add('show');

    this.zipCodeInput.setAttribute('readonly', 'readonly');
    document.getElementById('reselect-zip-code').classList.add('show');

    openDeliveryModalBtns.forEach((btn) => btn.classList.remove('show'))
    document.querySelector('.card-message-fieldset').classList.add('always-show')
    submitBtn.removeAttribute('hidden')
    submitBtn.removeAttribute('disabled')
    
    this.querySelector('button.close').click();
  }
}

customElements.define('product-delivery-modal', ProductDeliveryModal)


class CartDeliveryModal extends ProductDeliveryModal {
  constructor() {
    super();

  }

  openModalLogic() {
    this.openModalBtnEls = Array.from(document.querySelectorAll('.delivery-date-button'))
    this.openModalBtnEls.forEach((openModalBtn) => {
      openModalBtn.onclick = (e) => {
        this.line = e.target.dataset.line
        document.getElementById('modal-zip-code').value = document.getElementById(`CartItem-${this.line}`).querySelector('[id^="[Zip]-"]').value
        
        this.openModal();
      }
    })
  }

  updateDeliveryDate(deliveryBtnOrOption, event = 'click') {
    deliveryBtnOrOption.addEventListener(event, (e) => {
      const cartItem = document.getElementById(`CartItem-${this.line}`)
      const newDeliveryDate = new Date(deliveryBtnOrOption.value).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: '2-digit' });
  
      

      this.data = {
        "Line": this.line,
        "Balloon": {
          "Quantity": cartItem.querySelector('[id^="[Balloon][Quantity]-"]').value,
          "Option": cartItem.querySelector('[id^="[Balloon][Option]-"]').value
        },
        "Chocolate": cartItem.querySelector('[id^="[Chocolate]-"]').value,
        "Teddy Bear": cartItem.querySelector('[id^="[Teddy Bear]-"]').value,
        "Zip": cartItem.querySelector('[id^="[Zip]-"]').value,
        "Delivery Date": newDeliveryDate,
        "Card Type": cartItem.querySelector('[id^="[Card Type]-"]').value,
        "Your Card Message": cartItem.querySelector('[id^="[Your Card Message]-"]').value,
        "Your Signature": cartItem.querySelector('[id^="[Your Signature]-"]').value,

        "sections": document.getElementById('cart-container').dataset.id,
        "sections_url": window.location.pathname
      }
  
      const body = JSON.stringify(
        {
          "line": this.data["Line"],
          "properties": {
            "Balloon": {
              "Quantity": this.data["Balloon"]["Quantity"],
              "Option": this.data["Balloon"]["Option"]
            },
            "Chocolate": this.data["Chocolate"],
            "Teddy Bear": this.data["Teddy Bear"],
            "Zip": this.data["Zip"],
            "Delivery Date": this.data["Delivery Date"],
            "Card Type": this.data["Card Type"],
            "Your Card Message": this.data["Your Card Message"],
            "Your Signature": this.data["Your Signature"]
          },
          "sections": this.data["sections"],
          "sections_url": this.data["sections_url"]
        }
      )
  
      fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body }})
      .then((response) => response.text())
      .then((state) => {
        const parsedState = JSON.parse(state);
        const parsedHtml = new DOMParser().parseFromString(parsedState.sections[this.data["sections"]], 'text/html')
        const itemSelector = `#CartItem-${this.data["Line"]}`

        document.querySelector(`${itemSelector} .delivery-date`).innerHTML = parsedHtml.querySelector(`${itemSelector} .delivery-date`).innerHTML

        // update cart item property inputs
        document.querySelector(`${itemSelector} [id^="[Delivery Date]-"]`).value = this.data['Delivery Date']
      })
      
  
      this.closeModal()
    })
  }



  openModal() {
    document.querySelector('body').classList.add('modal-open')
    this.classList.add('show')
    this.scrollTop = 0
  }

  closeModal() {
    this.querySelector('button.close').click();
  }
}

customElements.define('cart-delivery-modal', CartDeliveryModal)

class EditMessageModal extends HTMLElement {
  constructor() {
    super()
    this.openModalLogic()

    this.form = this.querySelector('form')
    this.messageEls = Array(this.querySelector('#card-message'), this.querySelector('#card-signature'))

    this.messageEls.forEach((element) => {
      element.addEventListener('blur', () => {
        const cardTypeEl = document.getElementById('card-type')
  
        if (element.value && cardTypeEl.value == 'No Card') {
          cardTypeEl.value = 'Blank Card'
        }
      })
    })

    this.form.addEventListener('submit', this.onFormSubmit.bind(this))

    // modal close button set onclick
    this.closeButton = this.querySelector('button.close')
    this.closeButton.onclick = (e) => {
      document.querySelector('body').classList.remove('modal-open')
      this.classList.remove('show')
    }
    // Redundant cancel button 
    this.querySelector('button.buttonCancel').addEventListener('click', (e) => {
        e.preventDefault()
        this.closeButton.click()
      }
    )
  }

  validateForm() {
    const validateOptions = [
      {
        attribute: 'customminlength',
        isValid: (formGroup) => (formGroup.value && formGroup.value.length >= parseInt(formGroup.getAttribute('customminlength'), 10)) || document.getElementById('card-type').value == 'No Card',
        errorMessage: (formGroup) => {
          const errorEl = document.createElement('div')
          errorEl.classList.add('invalid-feedback')
  
          errorEl.textContent = 'Please enter a message for the card'
          if (formGroup.id == 'card-signature') errorEl.textContent = 'Please type your signature for the card'
          return errorEl
        }
      }
    ]
      const validateAllFormGroups = () => {
        this.messageEls.forEach((formGroup) => {
          validateSingleFormGroup(formGroup)
        })
        return this.messageEls.every((formGroup) => {
          return validateSingleFormGroup(formGroup)
        })
      }

      const validateSingleFormGroup = (formGroup) => {
        const errorContainer = formGroup.parentElement.querySelector('.section-error')

        let formGroupError = false
        for (const option of validateOptions) {
          if (formGroup.hasAttribute(option.attribute) && !option.isValid(formGroup)) {
            errorContainer.innerHTML = ''
            errorContainer.append(option.errorMessage(formGroup))
            formGroup.classList.add('border-red')
            formGroupError = true;
          }
        }

        if (!formGroupError) {
          errorContainer.innerHTML = ''
          formGroup.classList.remove('border-red')
        }

        return !formGroupError
      }

    const formValid = validateAllFormGroups()
    return formValid
  }
  

  onFormSubmit(event) {
    event.preventDefault()

    if(this.validateForm()) {
      this.data['Cart Type'] = this.querySelector('#card-type').value;
      this.data['Your Card Message'] = this.querySelector('#card-message').value;
      this.data['Your Signature'] = this.querySelector('#card-signature').value;

      const body = JSON.stringify(
        {
          "line": this.data["Line"],
          "properties": {
            "Balloon": {
              "Quantity": this.data["Balloon"]["Quantity"],
              "Option": this.data["Balloon"]["Option"]
            },
            "Chocolate": this.data["Chocolate"],
            "Teddy Bear": this.data["Teddy Bear"],
            "Zip": this.data["Zip"],
            "Delivery Date": this.data["Delivery Date"],
            "Card Type": this.data['Cart Type'],
            "Your Card Message": this.data['Your Card Message'],
            "Your Signature": this.data['Your Signature'],

            "sections": this.data["sections"],
            "sections_url": this.data["sections_url"]
          },
          "sections": document.getElementById('cart-container').dataset.id,
          "sections_url": window.location.pathname
        }
      )
      
      fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body }})
      .then((response) => response.text())
      .then((state) => {
        const parsedState = JSON.parse(state);
        const parsedHtml = new DOMParser().parseFromString(parsedState.sections[this.data["sections"]], 'text/html')
        const itemSelector = `#CartItem-${this.data["Line"]}`

        document.querySelector(`${itemSelector} .card-message`).innerHTML = parsedHtml.querySelector(`${itemSelector} .card-message`).innerHTML
        document.querySelector(`${itemSelector} .card-signature`).innerHTML = parsedHtml.querySelector(`${itemSelector} .card-signature`).innerHTML

        // update cart item property inputs
        document.querySelector(`${itemSelector} [id^="[Card Type]-"]`).value = this.data['Card Type']
        document.querySelector(`${itemSelector} [id^="[Your Card Message]-"]`).value = this.data['Your Card Message']
        document.querySelector(`${itemSelector} [id^="[Your Signature]-"]`).value = this.data['Your Signature']
      })
  
      this.closeModal()
      
    }
  }

  openModalLogic() {
    this.openModalBtnEls = Array.from(document.querySelectorAll('.edit-card-button'))
    this.openModalBtnEls.forEach((openModalBtn) => {
      openModalBtn.onclick = (e) => {
        this.line = e.target.dataset.line
        this.querySelector('.detail-group.name .label').textContent = document.getElementById(`ProductName-${this.line}`).textContent
        this.openModal();
      }
    })
  }

  openModal() {
    const cartItem = document.getElementById(`CartItem-${this.line}`)

    this.data = {
      "Line": this.line,
      "Balloon": {
        "Quantity": cartItem.querySelector('[id^="[Balloon][Quantity]-"]').value,
        "Option": cartItem.querySelector('[id^="[Balloon][Option]-"]').value
      },
      "Chocolate": cartItem.querySelector('[id^="[Chocolate]-"]').value,
      "Teddy Bear": cartItem.querySelector('[id^="[Teddy Bear]-"]').value,
      "Zip": cartItem.querySelector('[id^="[Zip]-"]').value,
      "Delivery Date": cartItem.querySelector('[id^="[Delivery Date]-"]').value,
      "Card Type": cartItem.querySelector('[id^="[Card Type]-"]').value,
      "Your Card Message": cartItem.querySelector('[id^="[Your Card Message]-"]').value,
      "Your Signature": cartItem.querySelector('[id^="[Your Signature]-"]').value,

      "sections": document.getElementById('cart-container').dataset.id,
      "sections_url": window.location.pathname
    }
    
    this.querySelector('#deliveryZip span').textContent = this.data["Zip"]
    this.querySelector('#deliveryDate span').textContent = this.data["Delivery Date"]
    
    this.querySelector('#card-type').value = this.data["Card Type"];
    this.querySelector('#card-message').value = this.data["Your Card Message"];
    this.querySelector('#card-signature').value = this.data["Your Signature"];

    document.querySelector('body').classList.add('modal-open')
    this.classList.add('show')
    this.scrollTop = 0
  }

  closeModal() {
    this.querySelector('button.close').click();
  }
}

customElements.define('edit-message-modal', EditMessageModal)