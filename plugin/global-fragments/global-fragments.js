/**
 * A plugin which gives ability to use fragments outside slides section
 * Usage:
 * 1) Add <span class="fragment" data-global-fragment="#example-fragment"> into desired slide
 * 2) Add <div id="example-fragment"> anywhere on page
 *
 * or you can use it with whole section
 *
 * 1) <section data-global-fragment="#example-fragment">

 *
 * @author https://github.com/bunopus
 */
let RevealGlobalFragments = window.RevealGlobalFragments || (() => {
    const dataAttrName = "data-global-fragment";

    Reveal.addEventListener('ready', hideAllShowCurrent);

    Reveal.addEventListener('slidechanged', hideAllShowCurrent);

    function hideAllShowCurrent(event) {
        hideFragments();
        if(! Reveal.isOverview()) {
            changeFragmentVisibility(event.currentSlide, true);
        }
    }

    Reveal.addEventListener('fragmentshown', (event) => {
        changeFragmentVisibility(event.fragment, true);
    });

    Reveal.addEventListener('fragmenthidden', (event) => {
        changeFragmentVisibility(event.fragment, false);
    });

    // hide fragments when navigating through the slides
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
            hideFragments();
        }
    }, false);

    function hideFragments() {
        $(`[${dataAttrName}]`).each((i, el) => {
            changeFragmentVisibility(el, false);
        })
    }

    function changeFragmentVisibility(element, show){
        let selector = $(element).attr('data-global-fragment');
        if (selector) {
            let globalFragment = $(selector);
            globalFragment.toggle(show);
        }
    }
})();
