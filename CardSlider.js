class addSlickSlider {
    constructor(sliderObj) {
        this.sliderObj = sliderObj;
        this.$sliderParent = this.sliderObj.sliderParent;
        this.dots = this.sliderObj.dots ?? true;
        this.slidesToScroll = this.sliderObj.slidesToScroll ?? 2;
        this.slidesToShow = this.sliderObj.slidesToShow ?? 4;
        this.infinite = this.sliderObj.infinite ?? false;
        this.autoplay = this.sliderObj.autoplay ?? true;
        this.autoplaySpeed = this.sliderObj.autoplaySpeed ?? 1000;
        this.arrows = this.sliderObj.arrows ?? true;
        this.speed = this.sliderObj.speed ?? 500;
        this.fade = this.sliderObj.fade ?? false;
        this.nextArrow = this.sliderObj.nextArrow;
        this.prevArrow = this.sliderObj.prevArrow;
        this.centerMode = this.sliderObj.centerMode ?? false;
        this.showonRespo = this.sliderObj.responsive;
        this.initElement();
    }

    initElement() {
        if (this.$sliderParent.length <= 0) return;
        this.$sliderParent.forEach(element => {
            let sliderWrapper = element.querySelector("[slick-slider='activate']");//Add this attribute to slider item.
            let $paginationBox = element.querySelector("[slick-slider='bread-crums-box']"); //Add this attribute to pagination dot wrapper.
            let prevArrow = element.querySelector("[arrow='prev']");
            let nextArrow = element.querySelector("[arrow='next']");
            this.activateSlider({ sliderWrapper, prevArrow, nextArrow, $paginationBox });
        });
    }

    activateSlider(sliderToActivate) {

        let sliderControl = $(sliderToActivate.sliderWrapper).slick({
            dots: this.dots,
            slidesToShow: this.slidesToShow,
            slidesToScroll: this.slidesToScroll,
            centerMode: this.centerMode,
            infinite: this.infinite,
            autoplay: this.autoplay,
            autoplaySpeed: this.autoplaySpeed,
            arrows: this.arrows,
            speed: this.speed,
            fade: this.fade,
            prevArrow: sliderToActivate.prevArrow,
            nextArrow: sliderToActivate.nextArrow,
            appendDots:  this.dots != false ? sliderToActivate.$paginationBox : "none",
            responsive: [{
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }]
        });
    }
}
// activate slider
let sliderObj = {
    sliderParent: document.querySelectorAll("[wrapper='slick-slider']"),
    slidesToShow: 3,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    fade: false,
    centerMode: false,
    dots: false,
    arrows: true,
    responsive: 1,
}
new addSlickSlider(sliderObj)