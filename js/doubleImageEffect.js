//Importations 
import { Fx1 } from './fx1.js';
import { Fx2 } from './fx2.js';
import { Fx3 } from './fx3.js';
import { Fx4 } from './fx4.js';
import { Fx5 } from './fx5.js';

export class DoubleImageEffect {
    DOM = {
        el: null
    }
    effects = {
        '1': 'Fx1',
        '2': 'Fx2',
        '3': 'Fx3',
        '4': 'Fx4',
        '5': 'Fx5',
    };
    classMap = {Fx1,Fx2,Fx3,Fx4,Fx5};

    /// Définit la classe DoubleImageEffect qui est exportée pour être utilisée ailleurs.

    // DOM       qui contient l'élément sur lequel l'effet sera appliqué, 
    // Effects   qui map les effectName avec leur Id 
    // ClassMap  qui map les effectName avec leur classe respective.
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