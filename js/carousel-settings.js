$(document).ready(function(){
    //bikes ticker
    $('.bikes-ticker__carousel').owlCarousel({
      loop: true,
      autoplay: true,
      slideTransition: 'linear',
      autoplayTimeout: 2000,
      autoplaySpeed: 2000,
      autoplayHoverPause: true,
      nav: false,
      dots: false,
      items: 8,
      responsive:{
        0:{
          items: 2
        },
        500:{
          items: 3
        },
        768:{
          items: 4
        },
        1024:{
          items: 5,
        },
        1400:{
          items: 5,
        }
      }
    });

    //about carousel
    var aboutOwl = $('.about__carousel').owlCarousel({
        loop: true,
        autoplay: false,
        slideTransition: 'linear',
        autoplayTimeout: 2000,
        autoplaySpeed: 2000,
        nav: false,
        dots: false,
        items: 1,
    });

    $('.about__left-btn').click(function() {
        aboutOwl.trigger('prev.owl.carousel');
    })
    $('.about__right-btn').click(function() {
        aboutOwl.trigger('next.owl.carousel');
    })


    //bikes
    $('.bikes__carousel').owlCarousel({
        loop: true,
        autoplay: false,
        slideTransition: 'linear',
        autoplayTimeout: 2000,
        autoplaySpeed: 2000,
        nav: false,
        dots: false,
        items: 5,
        center: true,
        responsive:{
          0:{
            items: 3
          },
          1100:{
            items: 5,
          },
        }
    });

    const stylesChange = (i, item) => {
      if (window.innerWidth >= 1100){
        if (i === 0)
          item.addClass('setTransparentsy');
        if (i === 1)
          item.addClass('leftTransform');
        if (i === 3)
          item.addClass('rightTransform');
        if (i === 4)
          item.addClass('setTransparentsy');
      } else {
        if (i === 0){
          item.addClass('setTransparentsy');
          item.addClass('leftTransform');
        }
        if (i === 2){
          item.addClass('rightTransform');
          item.addClass('setTransparentsy');
        }
      }
    }

    $('.bikes__carousel').on('changed.owl.carousel', (e) => {
      setTimeout(() => {
        $('.bikes__carousel .owl-item.active').each(function(i){
          $( this ).removeClass('leftTransform');
          $( this ).removeClass('rightTransform');
          $( this ).removeClass('setTransparentsy');
  
          stylesChange(i, $( this ))
        })
      }, 10);
    });
    $(document).on('click', '.bikes__item', function() {
      $('.bikes__carousel').trigger('to.owl.carousel', $(this).data( 'position' ) ); 
    });

    $('.bikes__carousel .owl-item.active').each(function(i){
      stylesChange(i, $( this ))
    })

    //stages carousel
    startStagesCarousel();

    //roadmap carousel
    startRoadmapCarousel();

    //team carousel
    if ( $(window).width() > 1024 ) {
      startTeamCarousel();
      startDaoCarousel();
    } else {
      $('.team__list').addClass('off');
      $('.dao-list').addClass('off');
    }
});

$(window).resize(function() {
  if ( $(window).width() > 1024 ) {
    startTeamCarousel();
    startDaoCarousel();
  } else {
    stopCarousel('team__list');
    stopCarousel('dao-list');
  }
});

function startTeamCarousel(){
  const teamCarousel = $('.team__list').owlCarousel({
    loop: false,
    slideTransition: 'linear',
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    responsive:{
      0:{
        items: 5
      },
      1150:{
        items: 5
      },
      1400:{
        items: 6,
      },
      1600:{
        items: 6,
      },
      1800:{
        items: 7,
      },
      2200:{
        items: 8,
      },
    }
  });

  $('.team__controls .team__left-btn').click(function() {
    teamCarousel.trigger('prev.owl.carousel');
  });
  $('.team__controls .team__right-btn').click(function() {
    teamCarousel.trigger('next.owl.carousel');
  });
};

function startDaoCarousel(){
  const daoCarousel = $('.dao-list').owlCarousel({
    loop: false,
    slideTransition: 'linear',
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    nav: false,
    dots: false,
    responsive:{
      0:{
        items: 5
      },
      1150:{
        items: 5
      },
      1400:{
        items: 6,
      },
      1600:{
        items: 6,
      },
      1800:{
        items: 7,
      },
      2200:{
        items: 8,
      },
    }
  });

  $('.dao__controls .dao__left-btn').click(function() {
    daoCarousel.trigger('prev.owl.carousel');
  });
  $('.dao__controls .dao__right-btn').click(function() {
    daoCarousel.trigger('next.owl.carousel');
  });
};


function startStagesCarousel(){
  const webStagesCarousel = $('.groups__carousel').owlCarousel({
    loop: false,
    slideTransition: 'ease',
    nav: false,
    dots: false,
    items: 1,
  });
  const mobileStagesCarousel = $('.groups__mobile-carousel').owlCarousel({
    loop: false,
    slideTransition: 'ease',
    nav: false,
    dots: false,
    items: 1,
  });

  $('.groups__carousel-wrapper .groups__left-btn').click(function() {
    webStagesCarousel.trigger('prev.owl.carousel');
  });
  $('.groups__carousel-wrapper .groups__right-btn').click(function() {
    webStagesCarousel.trigger('next.owl.carousel');
  });

  $('.groups__controls .groups__left-btn').click(function() {
    if ($(window).width() > 1023)
      webStagesCarousel.trigger('prev.owl.carousel');
    else 
      mobileStagesCarousel.trigger('prev.owl.carousel');
  });
  $('.groups__controls .groups__right-btn').click(function() {
    if ($(window).width() > 1023)
      webStagesCarousel.trigger('next.owl.carousel');
    else 
      mobileStagesCarousel.trigger('next.owl.carousel');
  });
  
};

function startRoadmapCarousel(){
  const roadmapCarousel = $('.roadmap__owl-carousel').owlCarousel({
    loop: false,
    slideTransition: 'ease',
    nav: false,
    dots: false,
    responsive:{
      0:{
        items: 1,
        stagePadding: 50
      },
      425:{
        items: 1,
        stagePadding: 50
      },
      600:{
        items: 2,
      },
      1100:{
        items: 3,
      },
      1300:{
        items: 3,
        stagePadding: 50
      },
      1440:{
        items: 3,
        stagePadding: 100
      },
    }
  });

  $('.roadmap__controls .roadmap__left-btn').click(function() {
    roadmapCarousel.trigger('prev.owl.carousel');
  });
  $('.roadmap__controls .roadmap__right-btn').click(function() {
    roadmapCarousel.trigger('next.owl.carousel');
  });
};

function stopCarousel(className) {
    const owl = $(`.${className}`);
    owl.trigger('destroy.owl.carousel');
    owl.addClass('off');
  }