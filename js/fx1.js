export class Fx1 {
    DOM = {
        el: null,
        bottom: null,
        top: null
    }
    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        this.layout();
    }
    layout() {
        // Obtenir l'URL de l'image de fond de l'élément
        const url = getComputedStyle(this.DOM.el).backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
        // Réinitialiser l'image de fond à "none"
        gsap.set(this.DOM.el, {backgroundImage: 'none'});

        const iterations = 2;
        let innerHTML = '';
        // Créer deux divs avec l'image de fond de l'élément
        for (let i = 0; i < iterations; ++i) {
            innerHTML += `<div class="double__img" style="background-image:url(${url})"></div>`;
        }
        // Ajoute ces deux divs à l'élément d'origine
        this.DOM.el.innerHTML = innerHTML;

        // Récupére les deux divs créés
        this.DOM.bottom = this.DOM.el.querySelector('.double__img:first-child');
        this.DOM.top = this.DOM.el.querySelector('.double__img:last-child');
        
        // Applique une transformation à l'un des divs
        gsap.set(this.DOM.bottom, {
            scale: 1.5
        });
    }
    mouseenter() {
        // Supprime le timeout "mouseleave" s'il existe
        if ( this.leaveTimeout ) {
            this.leaveTimeout.kill();
        }

        // Définir une nouvelle animation pour "mouseenter"
        this.enterTimeout = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: 'power3.inOut',
            },
        })
        // Applique le changement "will-change" pour le filtre sur l'un des divs
        .set(this.DOM.bottom, {willChange: 'filter'})
        // Applique le changement "will-change" pour le clip-path sur l'autre div
        .set(this.DOM.top, {willChange: 'clip-path'})
        // Anime le clip-path de l'autre div
        .fromTo(this.DOM.top, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        }, 0)
        // Anime le filtre sur l'un des divs
        .fromTo(this.DOM.bottom, {
            filter: 'brightness(400%) saturate(200%) hue-rotate(190deg)',
        }, {
            filter: 'brightness(100%) saturate(100%) hue-rotate(0deg)',
        }, 0)

    }
    mouseleave() {
        // Supprimer le timeout "mouseenter" s'il existe
        if ( this.enterTimeout ) {
            this.enterTimeout.kill();
        }

        // Définir une nouvelle animation pour "mouseleave"
        this.leaveTimeout = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: 'power3.inOut',
            },
        })
        // Appliquer le changement "will-change" pour le filtre sur l'un des divs
        .set(this.DOM.bottom, {willChange: 'filter'})
       // Appliquer le changement "will-change" pour le clip-path sur l'autre div
       .set(this.DOM.top, {willChange: 'clip-path'})
       // Animer le clip-path de l'autre div
       .to(this.DOM.top, {
           clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
       }, 0)
       // Animer le filtre sur l'un des divs
       .to(this.DOM.bottom, {
           filter: 'brightness(400%) saturate(200%) hue-rotate(190deg)',
       }, 0)

   }
}