$(document).ready(function(){
    var placesOwl = $('.places-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        slideTransition: 'ease-in-out',
        smartSpeed: 1000, // duration of change of 1 slide
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
      loop: true,
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

  $('.live-modal__carousel').on('changed.owl.carousel', (e) => {
    const index = e.item.index % 2 === 0 ? 1 : 2
    document.querySelector('.controls__label').innerHTML = 'Камера ' + index
  });


  //planning
  var planningOwl = $('.plannings__cards').owlCarousel({
    loop: false,
    autoplay: false,
    slideTransition: 'ease-in-out',
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    items: 5.3,
    responsive: {
      0: {
        items: 1.3
      },
      360: {
        items: 1.5
      },
      460: {
        items: 1.5
      },
      660: {
        items: 2.2
      },
      820: {
        items: 2.7
      },
      900: {
        items: 3
      },
      1240: {
        items: 4
      },
      1440: {
        items: 4.5
      },
      1600: {
        items: 5.3
      },
    }
  });

  $('.plannings__slider-btns .controls__item.left').click(function() {
    planningOwl.trigger('prev.owl.carousel');
  })
  $('.plannings__slider-btns .controls__item.right').click(function() {
    planningOwl.trigger('next.owl.carousel');
  })

  //gallery
  var galleryOwl = $('.gallery-carousel').owlCarousel({
    loop: true,
    autoplay: false,
    slideTransition: 'ease-in-out',
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    items: 4,
    center: false,
    onInitialized: function(event) {
      $(event.target).find(".owl-item.active").eq(1).addClass("center");
      $(event.target).find(".owl-item.active").eq(3).addClass("right");
    },
    responsive: {
      0: {
        items: 1.15,
      },
      425: {
        items: 1.5,
      },
      600: {
        items: 2.2,
      },
      768: {
        items: 2.65,
      },
      1024: {
        items: 3.5,
      },
      1440: {
        items: 4,
      },
    }
  });

  $('.gallery-carousel').on('changed.owl.carousel', (e) => {
    setTimeout(() => {
      $('.gallery-carousel .owl-item.active').each(function(i) {
        $( this ).removeClass('center')
        $( this ).removeClass('right')

        if (i === 0)
          $( this ).addClass('left')
        if (i === 1)
          $( this ).addClass('center')
        if (i === 3)
          $( this ).addClass('right')
      })
    }, 10);
  });

  $('.gallery-carousel__wrapper .controls__item.left').click(function() {
    galleryOwl.trigger('next.owl.carousel');
  })
  $('.gallery-carousel__wrapper .controls__item.right').click(function() {
    galleryOwl.trigger('prev.owl.carousel');
  })


  setTimeout(() => {
    //appartments 
    var appartmentsOwl1 = $('.app-1 .appartments__carousel').owlCarousel({
      loop: true,
      autoplay: false,
      slideTransition: 'ease-in-out',
      smartSpeed: 1000,
      autoplayTimeout: 2000,
      autoplaySpeed: 2000,
      nav: false,
      dots: false,
      items: 1.5,
      center: false,
    });
  
    $('.app-1.appartments__carousel-wrapper .controls__item.left').click(function() {
      appartmentsOwl1.trigger('next.owl.carousel');
    })
    $('.app-1.appartments__carousel-wrapper .controls__item.right').click(function() {
      appartmentsOwl1.trigger('prev.owl.carousel');
    })
  
  
    var appartmentsOwl2 = $('.app-2 .appartments__carousel').owlCarousel({
      loop: true,
      autoplay: false,
      slideTransition: 'ease-in-out',
      smartSpeed: 1000,
      autoplayTimeout: 2000,
      autoplaySpeed: 2000,
      nav: false,
      dots: false,
      items: 1.5,
      center: false,
    });
  
    $('.app-2.appartments__carousel-wrapper .controls__item.left').click(function() {
      appartmentsOwl2.trigger('next.owl.carousel');
    })
    $('.app-2.appartments__carousel-wrapper .controls__item.right').click(function() {
      appartmentsOwl2.trigger('prev.owl.carousel');
    })
  }, 1000);


  //advantages
  $('.advantages__carousel').owlCarousel({
    loop: true,
    autoplay: false,
    slideTransition: 'ease-in-out',
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    items: 1.5,
    center: false,
  });

  //gallery-modal
  var galleryModal = $('.gallery-modal__carousel').owlCarousel({
    loop: true,
    autoplay: false,
    slideTransition: 'ease-in-out',
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    items: 1,
    center: false,
  });

  $('.gallery-modal .controls__item.left').click(function() {
    galleryModal.trigger('next.owl.carousel');
  })
  $('.gallery-modal .controls__item.right').click(function() {
    galleryModal.trigger('prev.owl.carousel');
  })


  //range slider
  $(".cost-range-slider").ionRangeSlider({
    skin: 'round',
    type: "double",
    min: 5.2,
    max: 300,
    from: 5.2,
    to: 96,
    hideMinMax: true, // Hide min and max labels
    hideFromTo: true, // Hide "From" and "To" labels
    onChange: function (data) {
      document.querySelectorAll('.max-app-price').forEach(el => el.innerHTML = data.to)
      document.querySelectorAll('.min-app-price').forEach(el => el.innerHTML = data.from)
    },
  });
  $(".square-range-slider").ionRangeSlider({
    skin: 'round',
    type: "double",
    min: 18.4,
    max: 300,
    from: 18.4,
    to: 96,
    hideMinMax: true, // Hide min and max labels
    hideFromTo: true, // Hide "From" and "To" labels
    onChange: function (data) {
      document.querySelectorAll('.max-app-square').forEach(el => el.innerHTML = data.to)
      document.querySelectorAll('.min-app-square').forEach(el => el.innerHTML = data.from)
    },
  });
  $(".stage-range-slider").ionRangeSlider({
    skin: 'round',
    type: "double",
    min: 1,
    max: 30,
    from: 1,
    to: 14,
    hideMinMax: true, // Hide min and max labels
    hideFromTo: true, // Hide "From" and "To" labels
    onChange: function (data) {
      document.querySelectorAll('.max-app-stage').forEach(el => el.innerHTML = data.to)
      document.querySelectorAll('.min-app-stage').forEach(el => el.innerHTML = data.from)
    },
  });
});