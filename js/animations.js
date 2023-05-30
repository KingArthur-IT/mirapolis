var scrollYVal = 0

window.addEventListener("load", () => {
    //baner start animations
    document.querySelector('.baner__title').classList.add('shown')
    document.querySelector('.baner__label').classList.add('shown')
    document.querySelector('.header').classList.add('shown')
    document.querySelector('.baner__hero').classList.add('shown')
    document.querySelector('.parallax').classList.add('shown')
    document.querySelector('.parallax__live').classList.add('shown')

    var animItems = document.querySelectorAll('.anim-item');
    setTimeout(() => {
        animItems = document.querySelectorAll('.anim-item');
    }, 3000);

    let lastScrollValue = 0
    let isDownScrollDirection = true

    window.addEventListener('scroll', () => {
        isDownScrollDirection = window.pageYOffset - lastScrollValue > 0
        lastScrollValue = window.pageYOffset

        fullScreenAnimation()
        afterFullAnimation(isDownScrollDirection)
        animOnScroll(animItems)
    }, { passive: true })

    document.querySelector('body').addEventListener('wheel', wheelEvent, { passive: false })
});

function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top, left: rect.left + scrollLeft } 
    // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function noScroll(ms) {
    document.querySelector('body').classList.add('overflow-hidden')
    setTimeout(() => {
        document.querySelector('body').classList.remove('overflow-hidden')
    }, ms);
}

function fullScreenAnimation() {
    const parallaxSection = document.querySelector('.parallax');
    const parallaxWrapper = parallaxSection.querySelector('.parallax__img-wrapper');

    if (window.innerWidth < 768) return
  
        const animItemHeight = parallaxSection.offsetHeight;
        const animItemOffsetTop = offset(parallaxSection).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        //building anim
        if (window.pageYOffset < animItemPoint) {
            parallaxSection.querySelector('.parallax__building').style.marginTop = `${window.pageYOffset}px`
        }
        //fullscreen img animation
        const hasFullClass = parallaxWrapper.classList.contains('full')
        if (window.pageYOffset > animItemOffsetTop - animItemPoint && window.pageYOffset > 60) { //&& (window.pageYOffset < animItemOffsetTop + animItemHeight)
            if (!hasFullClass) {
                document.querySelector('body').classList.add('overflow-hidden')
                parallaxWrapper.classList.add('full')
                parallaxSection.querySelector('.parallax__live').classList.add('hide')
                parallaxSection.querySelector('.parallax__building').classList.add('hide')
                parallaxWrapper.style.transform = `translateY(-${animItemOffsetTop - scrollYVal + window.pageYOffset}px)`
                document.querySelector('.baner__hero').classList.remove('shown')
                setTimeout(() => {
                    document.querySelector('body').classList.remove('overflow-hidden')
                    parallaxWrapper.classList.add('passed')
                }, 1000);
            }
        }
        else if (hasFullClass) {
            parallaxWrapper.classList.remove('full')
            parallaxSection.querySelector('.parallax__live').classList.remove('hide')
            parallaxSection.querySelector('.parallax__building').classList.remove('hide')
            parallaxWrapper.style.transform = `translateY(0px)`
            parallaxWrapper.classList.remove('passed')
            document.querySelector('.parallax').classList.remove('moved')
            document.querySelector('.baner__hero').classList.add('shown')
        }
}

function afterFullAnimation(isDownScrollDirection) {
    const aboutSection = document.querySelector('.about')
    const animItemOffsetTop = offset(aboutSection).top;
    const height = 200
    const isParallaxPasses = document.querySelector('.parallax__img-wrapper').classList.contains('passed')
    const isMovingPasses = document.querySelector('.parallax').classList.contains('moved')

    const offsetVal = animItemOffsetTop - window.innerHeight + height
    if (offsetVal < 0 && isDownScrollDirection && isParallaxPasses && !isMovingPasses) {
        noScroll(1000)
        document.querySelector('.parallax').classList.add('moved')
        document.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
    } 
    if (offsetVal > -100 && !isDownScrollDirection && isParallaxPasses && isMovingPasses) {
        noScroll(1000)
        document.querySelector('.parallax').classList.remove('moved')
        document.querySelectorAll('.about__title').forEach(el => el.classList.remove('shown'))
    }
    if (window.innerWidth < 768 && offsetVal < height) {
        document.querySelectorAll('.about__title').forEach(el => el.classList.add('shown'))
    }
}

function animOnScroll(animItems) {
    for (let index = 0; index < animItems.length; index++) {
        const item = animItems[index];
        const animItemHeight = item.offsetHeight;
        const animItemOffsetTop = offset(item).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - 300 //animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        
        if (animItemOffsetTop < animItemPoint)
            item.classList.add('anim-active');
        else item.classList.remove('anim-active');
    }
}

function wheelEvent(e) {
    const isMouseWheel = !Number.isInteger(e.deltaY)

    if (isMouseWheel) {
        // Предотвращаем дальнейшую обработку события прокрутки
        e.preventDefault();
        
        if (!document.querySelector('body').classList.contains('overflow-hidden')) {
            // Получаем величину прокрутки колесика мыши
            const scrollAmount = e.deltaY;
        
            // Ограничиваем величину прокрутки до максимального значения
            const maxScrollAmount = 100;
            const limitedScrollAmount = Math.min(Math.abs(scrollAmount), maxScrollAmount) * Math.sign(scrollAmount);
        
            // Изменяем прокрутку на ограниченное значение
            window.scrollBy(0, limitedScrollAmount);
            scrollYVal = window.scrollY + limitedScrollAmount
        }
    } else scrollYVal = window.scrollY + e.deltaY

    const aboutSection = document.querySelector('.about')
    const animItemOffsetTop = offset(aboutSection).top - scrollYVal + window.pageYOffset;

    const transformStep = isMouseWheel ? 50 : 10
    const maxTransform = document.querySelector('.about__slider').offsetHeight - document.querySelector('.about__slider-wrapper').offsetHeight + transformStep

    if (animItemOffsetTop <= 10 && animItemOffsetTop > -50) {
        document.querySelector('body').classList.add('overflow-hidden')
        setTimeout(() => {
            document.querySelector('body').setAttribute('data-active-section', 'about')
        }, 1000);
    }

    if (document.querySelector('body').classList.contains('overflow-hidden') && document.querySelector('body').getAttribute('data-active-section') === 'about') {
        const scrollVal = Math.abs(e.deltaY)
        const scrollDirection = Math.sign(e.deltaY)

        if (scrollVal > 0) {
            const currTransformValue = Number(document.querySelector('.about__slider').style.transform.replace(/[^-\d]/g, ''))
            const newTransformValue = currTransformValue - scrollDirection * transformStep

            if (-newTransformValue < maxTransform && scrollDirection > 0 || newTransformValue <= 0 && scrollDirection < 0) {
                document.querySelector('.about__slider').style.transform = `translateY(${newTransformValue}px)`
            } else {
                document.querySelector('body').classList.remove('overflow-hidden')
                document.querySelector('body').removeAttribute('data-active-section')
            }
        }
    }
}