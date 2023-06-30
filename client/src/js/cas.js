
class Carousel {
    constructor({
        parentClass= "ani-nav",
        childClass= "ani-li",
        activeClass= "active",
        sqx= 2,
        sqy= 0.2,
    }) {
        this.parentClass = parentClass;
        this.childClass = childClass;
        this.activeClass = activeClass;
        this.parentEl = $(this.d(parentClass))[0];
        this.activeEl = $(this.d(this.activeClass))[0];
        this.allEls = $(this.d(this.childClass));
        // this.activeEl = $(".active");
        this.sqx = sqx;
        this.sqy = sqy;
        this.render();
    }

    d(className){
        return `.${className}`;
    }

    render() {
        this.refreshActive();
        
        this.allEls.each((index, el) => {

            let offset = this.activeIndex - index;

            let degJump = 360 / this.allEls.length;
            let deg = (offset * degJump + 360 + 180) % 360;

            let indop = this.getZIndexAndOpacity(index, this.activeIndex, this.allEls.length);

            let zInd = indop.zindex;
            let opacity = indop.opacity;

            let x = this.sqx * 100 * Math.sin((deg * Math.PI) / 180);
            let y = this.sqy * 100 * Math.cos((deg * Math.PI) / 180);


            let scale = 0.4;
            if (index == this.activeIndex) {
                scale = 1;
            } else if (
                Math.abs(index - this.activeIndex) == 1 ||
                (index == 0 && this.activeIndex == this.allEls.length - 1) ||
                (index == this.allEls.length - 1 && this.activeIndex == 0)
            ) {
                scale = 0.7;
            }

            
            $(el).css("z-index", zInd);
            // $(el).css("scale", `${scale}`);
            $(el).css("transform", `translate(${x}px, ${y}px)  translate(-50%, -50%) scale(${scale})`);
            $(el).css("opacity", `${opacity}`);
        });
    }

    move(side) {
        this.refreshActive();
        let index;
        switch (side) {
            case "l":
                index = this.activeIndex - 1;
                if (index < 0) {
                    index = this.allEls.length - 1;
                }
                break;
            case "r":
                index = this.activeIndex + 1;
                if (index > this.allEls.length - 1) {
                    index = 0;
                }
                break;
        }
        $(this.allEls[this.activeIndex]).removeClass(this.activeClass);
        $(this.allEls[index]).addClass(this.activeClass);

        this.render();
    }

    refreshActive() {
        this.activeEl = $(this.d(this.activeClass))[0];
        this.activeIndex = this.allEls.index(this.activeEl);
    }
    getZIndexAndOpacity(ei, ai, l) {
        if (ei === ai) {
            return { zindex: 100, opacity: 1.0 };
        } else {
            var distance = Math.min((ei - ai + l) % l, (ai - ei + l) % l);
            var opacity = 1.0 - (distance / (l / 2)) * 0.8; // Adjust the range from 1.0 to 0.2
            return { zindex: 100 - distance, opacity: opacity };
        }
    }
}

