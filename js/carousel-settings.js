$(document).ready(function(){
    var placesOwl = $('.places-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        slideTransition: 'linear',
        autoplayTimeout: 2000,
        autoplaySpeed: 2000,
        nav: false,
        dots: false,
        items: 3,
        center: true,
        responsive:{
          0: {
            items: 1.1,
            center: false
          },
          376: {
            items: 1.15,
            center: false
          },
          768: {
            items: 2,
            center: false
          },
          1140: {
            items: 3,
          },
        }
    });

    const stylesChange = (i, item) => {
      if (window.innerWidth > 1140) {
        if (i === 0)
          item.addClass('left');
        if (i === 2)
          item.addClass('right');
      } else {
        if (i === 0)
          item.addClass('left');
        if (i === 1)
          item.addClass('right');
      }
    }

    $('.places-carousel').on('changed.owl.carousel', (e) => {
      setTimeout(() => {
        $('.places-carousel .owl-item.active').each(function(i) {
          $( this ).removeClass('left');
          $( this ).removeClass('right');
  
          stylesChange(i, $( this ))
        })
      }, 10);
    });

    $('.places-carousel .owl-item.active').each(function(i) {
      stylesChange(i, $( this ))
    })

    $('.places .controls__item.left').click(function() {
      placesOwl.trigger('prev.owl.carousel');
    })
    $('.places .controls__item.right').click(function() {
      placesOwl.trigger('next.owl.carousel');
    })
});

//live modal
$(document).ready(function(){
  var liveOwl = $('.live-modal__carousel').owlCarousel({
      loop: false,
      autoplay: false,
      slideTransition: 'linear',
      autoplayTimeout: 2000,
      autoplaySpeed: 2000,
      nav: false,
      dots: false,
      items: 1,
  });

  $('.live-modal .controls__item.left').click(function() {
    liveOwl.trigger('prev.owl.carousel');
  })
  $('.live-modal .controls__item.right').click(function() {
    liveOwl.trigger('next.owl.carousel');
  })
});