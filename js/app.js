fetch("./sliders.json")
  .then((response) => response.json())
  .then((data) => {
    const mainWrapper = document.querySelector(".main-wrapper")

    const sliderToHtml = (slider) => `
      <div class="swiper slider ${slider.id}">
        <div class="swiper-wrapper slider__wrapper">
          ${slider.slides.map(slideToHtml).join("")}
        </div>
      </div>
    `

    const slideToHtml = (slide) => `
      <div class="swiper-slide slider__item">
        <div class="slider__img" style="background-image: url(${slide.imageUrl})">
          <a href="${slide.projectUrl}" class="slider__link" title="${slide.title}" target="_blank"></a>
        </div>
      </div>
    `

    data.sliders.forEach((slider) => {
      mainWrapper.innerHTML += sliderToHtml(slider)
    })

    initializeSwipers()
  })
  .catch((error) => console.error("Error:", error))

const initializeSwipers = () => {
  const sliders = document.querySelectorAll(".slider")
  const swiperInstances = []

  sliders.forEach((sliderElement, index) => {
    const swiperInstance = new Swiper(sliderElement, {
      freeMode: true,
      centeredSlides: true,
      direction: "vertical",
      mousewheel: true,
      slidesPerView: 1.75,
      slidesOffsetBefore: -125,
      loop: true,
      mousewheel: {
        sensitivity: 3,
      },
      speed: 200,
      freeModeMomentumRatio: 2,
      loopAdditionalSlides: 2,
    })

    swiperInstances.push(swiperInstance)

    window[`slider${index + 1}`] = swiperInstance
  })

  if (swiperInstances.length > 1) {
    bindSwipers(...swiperInstances)
  }
}
