let isMobile = window.innerWidth < 991;
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
        this.adaptiveHeight = this.sliderObj.adaptiveHeight ?? false;
        this.centerMode = this.sliderObj.centerMode ?? false;
        this.showonRespOnDesk = this.sliderObj.respOnDeskSmall;
        this.showonRespOnTablet = this.sliderObj.respOnTablet;
        this.showonRespOnMobile = this.sliderObj.respOnMobile;
        this.enableWheel = this.sliderObj.enableWheel ?? false;
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
            adaptiveHeight: this.adaptiveHeight,
            appendDots: this.dots != false ? sliderToActivate.$paginationBox : "none", //set this wrapper to relative.
            responsive: [{
                breakpoint: 1030,
                settings: {
                    slidesToShow: this.showonRespOnDesk,
                    centerMode: false
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: this.showonRespOnTablet,
                    centerMode: false
                }
            },

            {
                breakpoint: 500,
                settings: {
                    slidesToShow: this.showonRespOnMobile,
                    centerMode: false
                }
            }
            ]
        });
        if (this.enableWheel) {
            this.enableWheelListener(sliderToActivate.sliderWrapper, sliderControl);
        }
    }
    enableWheelListener(wrapper, control) {
        wrapper?.addEventListener('wheel', (e) => {
            this.debouncedHandleWheel(e, control); // Pass event and control to debounced function
        });
    }

    debounce(func) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, 24);
        };
    }

    debouncedHandleWheel = this.debounce((e, control) => {
        if (e.deltaY !== 0 || e.deltaX !== 0) {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                
            } else {
                e.preventDefault();
                // Horizontal scrolling
                if (e.deltaX < 0) {
                    this.handleSlideChange('slickPrev', control);
                } else {
                    this.handleSlideChange('slickNext', control);
                }
            }
        }
    });

    handleSlideChange = (direction, control) => {
        control.slick(direction);
    };

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
    respOnDeskSmall: 2,
    respOnTablet: 1,
    respOnMobile: 1,
}
let ourDataSliderObj = {
    sliderParent: document.querySelectorAll("[wrapper='our-data-slick-slider']"),
    slidesToShow: 5,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    fade: false,
    centerMode: false,
    dots: true,
    arrows: true,
    respOnDeskSmall: 3,
    respOnTablet: 2,
    respOnMobile: 1,
    enableWheel: true,
}
let methodSliderObj = {
    sliderParent: document.querySelectorAll("[wrapper='method-slick-slider']"),
    slidesToShow: 4,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    fade: false,
    centerMode: false,
    dots: true,
    arrows: true,
    respOnDeskSmall: 3,
    respOnTablet: 2,
    respOnMobile: 1,
}
let usecaseSliderObj = {
    sliderParent: document.querySelectorAll("[wrapper='usecase-slick-slider']"),
    slidesToShow: 4,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    fade: false,
    centerMode: false,
    dots: true,
    arrows: false,
    adaptiveHeight: true,
    respOnDeskSmall: 1,
    respOnTablet: 1,
    respOnMobile: 1,
}

document.addEventListener("DOMContentLoaded", (event) => {
    new addSlickSlider(sliderObj)
    new addSlickSlider(ourDataSliderObj)
    new addSlickSlider(methodSliderObj)
    if (isMobile) {
        new addSlickSlider(usecaseSliderObj)
    }
});