window.addEventListener("load", () => {
    //baner start animations
    document.querySelector('.baner__title').classList.add('shown')
    document.querySelector('.baner__label').classList.add('shown')
    document.querySelector('.header').classList.add('shown')
    document.querySelector('.baner__hero').classList.add('shown')
    document.querySelector('.parallax').classList.add('shown')

    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');
    window.addEventListener('scroll', (e) => {
        e.preventDefault()
        const animItemHeight = parallaxSection.offsetHeight;
        const animItemOffsetTop = offset(parallaxSection).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        const hasFullClass = parallaxWrapper.classList.contains('full')
        if ((window.pageYOffset > animItemOffsetTop - animItemPoint) && (window.pageYOffset < animItemOffsetTop + animItemHeight)) {
            if (!hasFullClass) {
                parallaxWrapper.classList.add('full')
                parallaxWrapper.style.transform = `translateY(-${animItemOffsetTop}px)`
                document.querySelector('body').classList.add('overflow-hidden')
                setTimeout(() => {
                    document.querySelector('body').classList.remove('overflow-hidden')
                }, 1000);
            }
        }
        else if (hasFullClass) {
            parallaxWrapper.classList.remove('full')
            parallaxWrapper.style.transform = `translateY(0px)`
        }
    })
});

function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top, left: rect.left + scrollLeft }
    // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}//function offset(el)