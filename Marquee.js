function Marquee(marquee) {
    let scrollElem = marquee.querySelector("[data-marquee='horizontal']"); //Add this data attribute to the slider wrapper.
    if (scrollElem != undefined || scrollElem != null) {
        $(scrollElem).marquee({
            //duration in milliseconds of the marquee
            duration: 20000,
            //gap in pixels between the tickers
            gap: 0,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 200,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            startVisible: true,
        });
    }
}
const MarqueeContainer = document.querySelectorAll("[container='marquee']");
if(MarqueeContainer?.length>0){
    MarqueeContainer.forEach(marquee => {
        Marquee(marquee);
    })
}