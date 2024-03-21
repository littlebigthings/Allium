class ACCORDIAN {
    constructor(mainWrapper) {
        this.mainWrapper = mainWrapper;
        this.allAccordian = mainWrapper?.querySelectorAll("[tab-item='accordian']");
        this.tabOne = mainWrapper?.querySelector("[tab-item='one']");
        this.tabTwo = mainWrapper?.querySelector("[tab-item='two']");
        this.addListener();
    }

    addListener() {
        if (this.allAccordian?.length > 0) {
            this.allAccordian.forEach(accordian => {
                accordian.setAttribute("is-open", false)
                accordian.addEventListener("click", (evt) => {
                    let clickedOn = evt.currentTarget;
                    let parentWrapper = clickedOn?.parentElement;
                    this.openCloseAccordian({clickedOn, parentWrapper});
                })
            });
            this.openDefault();
        }
    }

    openDefault(){
        let topAccordianOne = this.tabOne?.querySelectorAll("[tab-item='accordian']")[0];
        let topAccordianTwo = this.tabTwo?.querySelectorAll("[tab-item='accordian']")[0];
        topAccordianOne?.click();
        topAccordianTwo?.click();
    }

    openCloseAccordian(currentAccordianObj) {
        let currentAccordian = currentAccordianObj.clickedOn;
        let parentWrapper = currentAccordianObj.parentWrapper;
        let allAccordian = parentWrapper?.querySelectorAll("[tab-item='accordian']");
        if (currentAccordian != null) {
            let openOrClose = currentAccordian.getAttribute("is-open");
            allAccordian.forEach(accordian => {
                let elementToToggle = accordian.querySelector("[accordian-item='collapse']");
                let elementToHideShow = accordian.querySelectorAll("[accordian-item='hide']");
                if (accordian == currentAccordian) {
                    if (openOrClose == "false") {
                        gsap.to(elementToToggle, { height: "auto", duration: 1 });
                        gsap.to(elementToHideShow, { height: "0", duration: 1 });
                        currentAccordian.setAttribute("is-open", true);
                    } else {
                        gsap.to(elementToToggle, { height: "0", duration: 1 });
                        gsap.to(elementToHideShow, { height: "auto", duration: 1 });
                        currentAccordian.setAttribute("is-open", false);
                    }

                } else {
                    gsap.to(elementToToggle, { height: "0", duration: 1 });
                    gsap.to(elementToHideShow, { height: "auto", duration: 1 });
                    accordian.setAttribute("is-open", false);

                }
            })
        }
    }
}

const allAccordianWrapper = document.querySelectorAll("[wrapper='tab']");
if (allAccordianWrapper?.length > 0) {
    allAccordianWrapper.forEach(wrapper => {
        new ACCORDIAN(wrapper);
    })
}