const slider = document.getElementById('product-image-carousel')
const sliderItemNodes = slider.querySelectorAll('.carousel-item')


document.querySelectorAll('.product-image-thumbnail').forEach(element => {
  // mouseenter
  element.addEventListener('click', (e) => {
    const slideIndex = element.dataset.slideTo
    const activeIndex = document.querySelector('.active').dataset.id

    const animationOver = document.querySelectorAll('.carousel-item-right, .carousel-item-left').length == 0

    if (!animationOver) return
    
    if (activeIndex == slideIndex) return

    if (activeIndex < slideIndex) {
      sliderItemNodes[slideIndex].classList.add('carousel-item-next');
      sliderItemNodes[activeIndex].classList.add('carousel-item-left');
      setTimeout(() => {
        sliderItemNodes[slideIndex].classList.add('carousel-item-left');
      }, 0)
    } else {
      sliderItemNodes[slideIndex].classList.add('carousel-item-prev');
      sliderItemNodes[activeIndex].classList.add('carousel-item-right');
      setTimeout(() => {
        sliderItemNodes[slideIndex].classList.add('carousel-item-right');
      }, 0)
    }

    const addRemoveSlideClasses = () => {
      sliderItemNodes.forEach(function(sliderEl) {
        sliderEl.classList.remove(
          'active', 'carousel-item-left', 'carousel-item-next',
          'carousel-item-right', 'carousel-item-prev'
        )
      })
      element.parentElement.querySelector('.active').classList.remove('active')
      element.classList.add('active')
      sliderItemNodes[slideIndex].classList.add('active')
    }
  
    setTimeout(addRemoveSlideClasses, 75)
  })
})