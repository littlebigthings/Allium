class TabSlider {
    constructor(
        {
            sliderTabs,
            aniDuration = 0.7,
            imageToChange,
        }
    ) {
        this.$sliderTabs = sliderTabs;
        this.currTab = 0;

        this.isRunning = false;
        this.aniDuration = aniDuration;
        this.closeTab = this.closeTab.bind(this);
        this.$imageToChange = imageToChange;

        this.init();
    }

    init() {

        this.activateEvents();
        this.addTabHeights();
        this.checkOnResize();
        this.clearImgAttribute();
    }

    clearImgAttribute() {
        this.$imageToChange.removeAttribute("srcset");
    }

    addTabHeights() {
        for (let tab = 0; tab < this.$sliderTabs.length; tab++) {
            const currTab = this.$sliderTabs[tab].querySelector("[accordian-item='hide-show']");
            const tabChild = [...currTab.children];
            let elHeight = 0;
            for (let child = 0; child < tabChild.length; child++) {
                const element = tabChild[child];
                if (element.style.display != "none") {
                    elHeight = elHeight + parseInt(element.getBoundingClientRect().height) + parseInt(window.getComputedStyle(element).getPropertyValue('margin-top'));
                }
                currTab.setAttribute("tab-height", elHeight)
            }
        }
    }

    activateEvents() {
        for (let wrapper = 0; wrapper < this.$sliderTabs.length; wrapper++) {
            const tabWrapper = this.$sliderTabs[wrapper];
            tabWrapper.addEventListener("click", (e) => {
                const $currTab = e.currentTarget;
                if (!$currTab.classList.contains(this.activeCardClass)) {
                    this.openTab($currTab, true);
                }
            })
        }
        this.$sliderTabs[0].click();
    }


    openTab(ele) {
        const $currTab = ele;
        const $btmTab = $currTab.querySelector("[accordian-item='hide-show']");
        const $tabImg = $currTab.querySelector("[accordian-img='fetch']");
        const imgSrc = $tabImg.getAttribute("src");


        gsap.to($currTab, {
            borderColor: "#BE59C0",
            duration: this.aniDuration,
            ease: "Power1.easeInOut",
        });

        gsap.to($btmTab, {
            height: `${$btmTab.getAttribute("tab-height")}px`,
            duration: this.aniDuration,
            ease: "Power1.easeInOut",
        });

        gsap.fromTo(
            this.$imageToChange,
            { opacity: 0.5, x: 0 },
            { duration: this.aniDuration, x: -50, opacity: 0 }
        ).then(() => {
            this.$imageToChange?.setAttribute("src", imgSrc);
        }).then(() => {
            gsap.fromTo(
                this.$imageToChange,
                { opacity: 0, x: 50 },
                { duration: this.aniDuration, x: 0, opacity: 1 }
            );
        });



        const otherTabs = this.$sliderTabs.filter(tab => tab != $currTab);
        [...otherTabs].forEach(this.closeTab);

        this.currTab = this.$sliderTabs.indexOf($currTab) + 1;
    }

    closeTab(ele) {
        const $currTab = ele;
        const $btmTab = $currTab.querySelector("[accordian-item='hide-show']");

        gsap.to($currTab, {
            borderColor: "rgba(0, 0, 0, 0.2)",
            duration: this.aniDuration,
            ease: "Power1.easeInOut",
        });

        gsap.to($btmTab, {
            height: "0px",
            duration: this.aniDuration,
            ease: "Power1.easeInOut",
        });

    }

    checkOnResize() {
        window.addEventListener('resize', this.debounce(this.resetAnimation), false)
    }

    resetAnimation() {
        let tabsToReset = this.$sliderTabs;
        tabsToReset.forEach(tab => {
            const resetHeight = tab.querySelector("[accordian-item='hide-show']");
            resetHeight.style.height = "auto";
        })
        this.addTabHeights();
        this.$sliderTabs[0].click();
    }

    debounce(func, timeout = 500) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout)
        }
    };

}

const $tabSecOne = document.querySelector("[data-wrapper='anim-accordian']");
const imageToChange = $tabSecOne?.querySelector("[accordian-img='change']")
if ($tabSecOne != undefined) {

    const tabCardsData = [
        {
            sliderTabs: [...$tabSecOne.querySelectorAll("[accordian-item='tab']")],
            sectionEle: $tabSecOne,
            aniDuration: 0.5,
            imageToChange,
        },
    ];
    tabCardsData.forEach((echObj) => {
        const tabSlider = new TabSlider(echObj);
    });
}
