// #product-items-form fieldset.js-error-container .section-error

const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector)

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
    },
    {
      attribute: 'required',
      isValid: (formGroup) => formGroup.value.trim() !== '',
      errorMessage: (formGroup) => {
        const errorEl = document.createElement('div')
        errorEl.classList.add('invalid-feedback')

        errorEl.textContent = 'This field is required'
        return errorEl
      }
    },
    {
      attribute: 'requiredpair',
      isValid: (formGroup) => {

        if (formGroup.id == 'addon-m-qty') {
          if (formGroup.parentElement.querySelector('#addon-m-opt').value == '' && formGroup.value == '') return true

          return (formGroup.parentElement.querySelector('#addon-m-opt').value && formGroup.value )
          
        } else {
          if (formGroup.parentElement.querySelector('#addon-m-qty').value == '' && formGroup.value == '') return true

          return (formGroup.parentElement.querySelector('#addon-m-qty').value && formGroup.value )
        }
      },
      errorMessage: (formGroup) => {
        const errorEl = document.createElement('div')
        errorEl.classList.add('invalid-feedback')

        errorEl.textContent = 'Please make sure that both a quantity and a type are selected'
        return errorEl
      }
    }
  ]

    const validateAllFormGroups = (formToValidate) => {
      const formGroups = Array.from(formElement.querySelectorAll('.formGroup'))

      formGroups.forEach((formGroup) => {
        validateSingleFormGroup(formGroup)
      })
      return formGroups.every((formGroup) => {
        return validateSingleFormGroup(formGroup)
      })
    }

    const validateSingleFormGroup = (formGroup) => {
      let errorContainer
      switch (formGroup.id) {
        case 'card-message':
        case 'card-signature':
          errorContainer = formGroup.parentElement.querySelector('.section-error')
          break
        default:
          errorContainer = formGroup.closest('fieldset').querySelector('.section-error')
      }

      let formGroupError = false;
      let formGroupErrors = []
      for (const option of validateOptions) {
        if (formGroup.hasAttribute(option.attribute) && !option.isValid(formGroup)) {
          formGroupErrors.push(
            option.errorMessage(formGroup)
          )
          formGroup.classList.add('border-red')

          formGroupError = true;
        }
      }

      console.log(`formGroup: ${formGroup}, formGroupErrors: ${formGroupErrors}`)

      if (!formGroupError) {
        errorContainer.innerHTML = ''
        formGroup.classList.remove('border-red')
        
      } else {
        errorContainer.innerHTML = ''
        for (const error of formGroupErrors) {
          errorContainer.append(error)
        }
        if (formGroup.id == 'addon-m-qty' || formGroup.id == 'addon-m-opt') {
          const addonRect = formGroup.closest('fieldset').getBoundingClientRect();
          if (addonRect.top <= 0) formGroup.closest('fieldset').scrollIntoView()
        }
      }

      return !formGroupError
    }
  
  Array(document.getElementById('card-signature'), document.getElementById('card-message')).forEach((element) => {
    element.addEventListener('blur', () => {
      const cardTypeEl = document.getElementById('card-type')

      if (element.value && cardTypeEl.value == 'No Card') {
        cardTypeEl.value = 'Blank Card'
      }
    })
  })

  formElement.addEventListener('submit', (event) => {
    const formValid = validateAllFormGroups(formElement)

    if (!formValid) {
      event.preventDefault();
    }
  })
}

validateForm('#product-items-form')