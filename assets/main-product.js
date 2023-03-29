// toggle product description button disabled
const descriptionBtn = document.querySelector('.product-description button')

function toggleCollapseEl(element, open = true) {
  element.setAttribute('aria-expanded', open)
  document.querySelector(element.dataset.target).classList.toggle('show', open)
}

const handleMatchMedia990 = (matchMedia) => {
  if (matchMedia.matches) {
      // disable description button
      descriptionBtn.setAttribute('disabled', 'disabled')
  } else {
    // enable description button
    descriptionBtn.removeAttribute('disabled')
  }
}

var matchMedia990 = window.matchMedia("(min-width: 990px)")
handleMatchMedia990(matchMedia990)
matchMedia990.addListener(handleMatchMedia990)

const addonToggleCollapseEls = Array.from(document.querySelectorAll('.collapse-toggler.media-collapse-toggler'))
const collapsedSumEls = document.querySelectorAll('.collapsed-summary')
const cardMessageField = document.querySelector('.card-message-fieldset')

const handleMatchMedia750 = (matchMedia) => {
  if (matchMedia.matches) {
      // hide addons and card message summary 
      collapsedSumEls.forEach(el => el.classList.remove('show'))
      // hide addons and card message menu
      addonToggleCollapseEls.forEach(collapseEl => {
        toggleCollapseEl(collapseEl, true)
      })
      // disable addons and card message menu +/- button
      Array.from(document.querySelectorAll('#product-items-form .collapse-toggler')).forEach((el) => {
        el.setAttribute('disabled', 'disabled')
      })
      // hide card message field set
      cardMessageField.classList.remove('show')

  } else {
    // show addons and card message summary 
    collapsedSumEls.forEach(el => el.classList.add('show'))
    // show addons and card message menu
    addonToggleCollapseEls.forEach(collapseEl => {
      toggleCollapseEl(collapseEl, false)
    })
    // enable addons and card message menu +/- button
    Array.from(document.querySelectorAll('#product-items-form .collapse-toggler')).forEach((el) => {
      el.removeAttribute('disabled')
    })
    // show card message field set
    cardMessageField.classList.add('show')
  }
}

var matchMedia750 = window.matchMedia("(min-width: 750px)")
handleMatchMedia750(matchMedia750)
matchMedia750.addListener(handleMatchMedia750)


// media gallery handling
const variantImages = JSON.parse(document.querySelector('#variant-images [type="application/json"]').textContent)
const firstImage = document.querySelector('[data-id="0"].carousel-item img')
const firstThumbnail = document.querySelector('[data-slide-to="0"].product-image-thumbnail img')

const variantPicker = document.querySelector('fieldset.product-vase-fieldset')
variantPicker.addEventListener('change', function() {
  const option = this.querySelector('input:checked').value

  firstImage.src = variantImages[option].normal.src
  firstImage.srcset = variantImages[option].normal.srcset
  firstThumbnail.src = variantImages[option].thumbnail.src
  firstThumbnail.srcset = variantImages[option].thumbnail.srcset

  const variantData = JSON.parse(this.querySelector('[type="application/json"]').textContent)
  const selectedVariant = variantData.find((variant) => variant.option1 == option)
  if (!selectedVariant) return;
  const form_input = document.querySelector('#{{ form_id }}').querySelector('input[name="id"]')
  form_input.value = selectedVariant.id
})

// #reselect-zip-code button event listener
const zipCodeInput = document.getElementById('zip-code')
const openDeliveryModalBtns = document.querySelectorAll('.delivery-date-button')
const submitBtn = document.querySelector('button[type="submit"]')
const deliveryDateInput = document.getElementById('delivery-date')


document.getElementById('reselect-zip-code')
  .addEventListener('click', (e) => {
    zipCodeInput.focus()
    zipCodeInput.removeAttribute('readonly');
    e.target.classList.remove('show');

    cardMessageField.classList.remove('always-show')
    submitBtn.setAttribute('hidden', 'hidden')
    submitBtn.setAttribute('disabled', 'disabled')

    openDeliveryModalBtns.forEach((btn) => btn.classList.add('show'))

    deliveryDateInput.value = ''
    deliveryDateInput.parentElement.classList.remove('show');
  })


// #reselect-delivery-date button event listener

document.getElementById('reselect-delivery-date')
  .addEventListener('click', (e) => {
    document.querySelector('.delivery-date-button').click()
  })

// #card-type collapsed-summary update

document.getElementById('card-type')
  .addEventListener('change', function(e) {
    this.closest('.col-12:not(.form-group)').querySelector('.collapsed-summary').textContent = this.value
  })

// #card-type textarea length count
document.getElementById('card-message').addEventListener('keyup', (e) => {
  document.getElementById('text-area-length').textContent = e.target.value.length
})

// #addon-fields handling
const addonFieldsEl = document.querySelector('.addons-fieldset')
const addonFieldCollSumAddons = Array.from(addonFieldsEl.querySelectorAll('.addon-label'))

// 1. Mylar Balloon #addon-m-qty and #addon-m-opt
const balloonQtySelector = addonFieldsEl.querySelector('#addon-m-qty')
const balloonOptSelector = addonFieldsEl.querySelector('#addon-m-opt')
// 2. Chocolate #addon-c-opt
const chocolateOptSelector = addonFieldsEl.querySelector('#addon-c-opt')
// 3. Teddy Bear #addon-t-opt
const bearOptSelector = addonFieldsEl.querySelector('#addon-t-opt')

function resizeCollapseBtn(addonLabels) {
  let btnBtmPadding = addonLabels.filter(label => label.classList.contains('show')).length;
  addonFieldsEl.querySelector('.collapse-toggler').classList.remove('summary-count-1', 'summary-count-2', 'summary-count-3');
  if (btnBtmPadding == 0) btnBtmPadding = 1;
  addonFieldsEl.querySelector('.collapse-toggler').classList.add(`summary-count-${btnBtmPadding}`);
}

Array(balloonQtySelector, balloonOptSelector).forEach((el) => {
    el.addEventListener('change', (e) => {
        if (balloonQtySelector.value == '' ||  balloonOptSelector.value == '') {
          addonFieldCollSumAddons.find(el => el.textContent == 'Mylar Balloons').classList.remove('show')
        } else {
          addonFieldCollSumAddons.find(el => el.textContent == 'Mylar Balloons').classList.add('show')
        }
        setTimeout(() => {
          resizeCollapseBtn(addonFieldCollSumAddons)
        })
      }
    )
  }
)
Array(chocolateOptSelector, bearOptSelector).forEach((el) => {
    el.addEventListener('change', (e) => {
        let optionName = 'Chocolate'
        if (el.id == 'addon-t-opt') optionName = 'Teddy Bear'
        if (el.value == '') {
          addonFieldCollSumAddons.find(el => el.textContent == optionName).classList.remove('show')
        } else {
          addonFieldCollSumAddons.find(el => el.textContent == optionName).classList.add('show')
        }
        resizeCollapseBtn(addonFieldCollSumAddons)
      }
    )
  }
)