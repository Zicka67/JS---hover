import { Fx1 } from './fx1.js';


export class DoubleImageEffect {
    DOM = {
        el: null
    }
    effects = {
       
    };
    classMap = {Fx1};

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.effectName = this.effects[this.DOM.el.dataset.effect] || 'Fx1';
        this.effect = new this.classMap[this.effectName](this.DOM.el);
        this.initEvents();
    }
    initEvents() {
        this.DOM.el.addEventListener('mouseenter', () => { 
            this.effect.mouseenter();
        });

        this.DOM.el.addEventListener('mouseleave', () => {
            this.effect.mouseleave();
        });
    }
}