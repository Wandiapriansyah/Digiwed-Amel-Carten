// story slider
var storySlider = function () {
  var options = {
    speed: 500,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnFocus: false,
    pauseOnHover: false,
    touchThreshold: 5000,
    swipeToSlide: true,
    arrows: false,
    dots: true,
    adaptiveHeight: false,
    fade: true,
  };

  // slick options
  var storyPreviewOptions = {
    ...options,
    ...{
      appendDots: "#story__slider-dots",
      asNavFor: "#story__slider-caption",
    },
  };

  var storyCaptionOptions = {
    ...options,
    ...{
      dots: false,
      adaptiveHeight: false,
      asNavFor: "#story__slider-preview",
    },
  };

  // init slick
  $("#story__slider-preview").slick(storyPreviewOptions);

  $("#story__slider-caption").slick(storyCaptionOptions);
};

// Photo Options Nav
var photo_nav_options = {
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  arrows: false,
  adaptiveHeight: false,
  variableWidth: false,
  infinite: true,
  useTransform: true,
  speed: 500,
  cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
  asNavFor: $(".photo-slider"),
};

// Photo Options Slider
var photo_slider_options = {
  centerMode: true,
  swipeToSlide: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: false,
  arrows: true,
  adaptiveHeight: false,
  variableWidth: true,
  infinite: true,
  useTransform: true,
  speed: 500,
  cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
  prevArrow: $(".photo-arrow.prev"),
  nextArrow: $(".photo-arrow.next"),
  asNavFor: $(".photo-nav"),
};

// Resize Photo Nav
var resize_photo_nav = function () {
  var $nav = $(".photo-nav");

  var width = $nav.find(".photo-item").width();

  $nav.find(".photo-img-wrap").each((i, o) => {
    $(o).css("height", width + "px");
  });
};

// Resize Event Content
var resizeEventContent = function () {
  $(".event-content").each(function (i, content) {
    // Content Children
    var activityHeight =
      parseInt($(content).find(".activity-wrap").height()) || 0;
    var eventDetailsHeight =
      parseInt($(content).find(".event-details").height()) || 0;
    var dresscodeHeight =
      parseInt($(content).find(".dress-wrapper").height()) || 0;
    var childrenHeight = activityHeight + eventDetailsHeight + dresscodeHeight;

    // resize to its content first, it is the same as children height
    $(content).css({ minHeight: childrenHeight });

    // get its dimensions
    var width = parseInt($(content).width()) || 0;
    var height = parseInt($(content).height()) || 0;
    var pillarHeight = 0;

    // Change border radius
    $(content).css({ borderRadius: width });

    // pillar ornaments
    var $pillar = $(content).find(".orn-pillar");

    if ($pillar.length) {
      var topHeight = $pillar.find(".pillar-top").height();
      var centerHeight = $pillar.find(".pillar-center").height();
      var bottomHeight = $pillar.find(".pillar-bottom").height();

      pillarHeight =
        (parseInt(topHeight) || 0) +
        (parseInt(centerHeight) || 0) +
        (parseInt(bottomHeight) || 0);
    }

    // set as pillar height
    if (childrenHeight < pillarHeight) {
      return $(content).css({ minHeight: pillarHeight - 0 });
    }

    // set as children height
    return $(content).css({ minHeight: childrenHeight });
  });
};

// Resizing
var resizingElements = function () {
  resizeEventContent();
};

// SLick Kado
var init_gifts_slick = function () {
  var gifts_wrap = $(".hadiah-wrap");

  if (gifts_wrap.length) {
    var sliderOptions = {
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      prevArrow: false,
      nextArrow: false,
    };

    gifts_wrap
      .on("init", function () {
        $(".gifts__slider-nav__item__manual").eq(0).addClass("is-active");
      })
      .slick(sliderOptions);
  }
  //   console.log(gifts_wrap);
};

$(".wedding-gift__next").on('click', () => {
  $('.wedding-gift-details').css({
    opacity: 0,
  });
  $('.wedding-gift-picture').css({
    opacity: 1,
  });
  document.getElementById("gift-orn-1").style.opacity = "0";
  document.getElementById("gift-orn-2").style.opacity = "0";
});

$(".wedding-gift__prev").on('click', () => {
  $('.wedding-gift-details').css({
    opacity: 1,
  });
  $('.wedding-gift-picture').css({
    opacity: 0,
  });
  document.getElementById("gift-orn-1").style.opacity = "1";
  document.getElementById("gift-orn-2").style.opacity = "1";
});

// Window on Resize
$(window).on("resize", function () {
  resizingElements();
});

// On Ready
$(document).ready(function () {
  storySlider();

  var kadoWrapper = $(".kado-wrapper");
  if (kadoWrapper) {
    var intervalId = setInterval(function () {
      var $gifts_wrap = $(".hadiah-wrap");

      // Memeriksa apakah data sudah ada
      if ($gifts_wrap.length && $gifts_wrap.children().length > 0) {
        // Data sudah ada, inisialisasi slider
        init_gifts_slick();

        // Hentikan interval
        clearInterval(intervalId);
      }
    }, 500); // Periksa setiap 500 milidetik (0,5 detik)
  }

  resizingElements();

  resize_photo_nav();

  if ($(".photo-nav").children().length > 0) {
    // Slick
    $(".photo-nav").slick(photo_nav_options);
  }

  if ($(".photo-slider").children().length > 0) {
    // Slick
    $(".photo-slider").slick(photo_slider_options);
  }
});
