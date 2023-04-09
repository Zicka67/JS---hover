
export class Fx4 {
    DOM = {
        el: null
    }
    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.layout();
    }
    layout() {
        
        // get element background-image url
        const url = getComputedStyle(this.DOM.el).backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
        gsap.set(this.DOM.el, {backgroundImage: 'none'});

        const iterations = 2;
        let innerHTML = '';
        for (let i = 0; i < iterations; ++i) {
            innerHTML += `<div class="double__img" style="background-image:url(${url})"></div>`;
        }
        this.DOM.el.innerHTML = innerHTML;

        this.DOM.bottom = this.DOM.el.querySelector('.double__img:first-child');
        this.DOM.top = this.DOM.el.querySelector('.double__img:last-child');
    }
    mouseenter() {

        if ( this.leaveTimeout ) {
            this.leaveTimeout.kill();
        }

        this.enterTimeout = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: 'power3',
            },
        })
        .set(this.DOM.top, {willChange: 'clip-path'})
        .fromTo(this.DOM.top, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }, {
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
        }, 0)
        
        .fromTo(this.DOM.bottom, {
            scale: 1,
            filter: 'brightness(400%) hue-rotate(-190deg)',
        }, {
            scale: 1.4,
            filter: 'brightness(100%) hue-rotate(0deg)'
        }, 0);

    }
    mouseleave() {
        
        if ( this.enterTimeout ) {
            this.enterTimeout.kill();
        }

        this.leaveTimeout = gsap.timeline({
            defaults: {
                duration: 0.4,
                ease: 'power3.inOut',
            },
        })
        .set(this.DOM.top, {willChange: 'clip-path'})
        .to(this.DOM.top, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }, 0)

    }
}