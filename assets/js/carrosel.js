var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

$(".list-nav-glossario").slick({
  slidesToShow: 26,
  slidesToScroll: 1,
  asNavFor: ".for-glossario-conteudo",
  dots: false,
  focusOnSelect: true,
  infinite: false,
  centerMode: false,
  arrows: true,
  waitForAnimate: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 16,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 10,
        centerMode: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 6,
        centerMode: false,
      },
    },
    {
      breakpoint: 475,
      settings: {
        slidesToShow: 4,
        centerMode: false,
      },
    },
  ],
});

$(".for-glossario-conteudo").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
  infinite: false,
  fade: true,
  asNavFor: ".list-nav-glossario",
  waitForAnimate: false,
});

$(".carousel-timeline-content").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  focusOnSelect: true,

  arrows: false,
  asNavFor: ".carousel-timeline-nav",
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 475,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
