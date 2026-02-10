window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function () { return false; };
  image.oncontextmenu = function () { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  // Configure carousel for results: show 2 items per view on wide screens, 1 on small screens.
  var slidesToShow = window.innerWidth < 768 ? 1 : 2;
  var slidesToScroll = slidesToShow;
  var options = {
    slidesToScroll: slidesToScroll,
    slidesToShow: slidesToShow,
    // Disable pagination creation (no slider-pagination elements will be generated)
    pagination: false,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize only the results carousel so other carousels (if any) keep default behavior.
  var resultsEl = document.querySelector('#results-carousel');
  if (resultsEl) {
    var resultsCarousel = bulmaCarousel.attach('#results-carousel', options);
    // resultsCarousel may be an array (depending on library version). Normalize.
    if (Array.isArray(resultsCarousel)) {
      resultsCarousel.forEach(function (c) {
        c.on('before:show', state => { console.log('results-carousel', state); });
      });
    } else if (resultsCarousel && resultsCarousel.on) {
      resultsCarousel.on('before:show', state => { console.log('results-carousel', state); });
    }
  }

  /*var player = document.getElementById('interpolation-video');
  player.addEventListener('loadedmetadata', function() {
    $('#interpolation-slider').on('input', function(event) {
      console.log(this.value, player.duration);
      player.currentTime = player.duration / 100 * this.value;
    })
  }, false);*/
  preloadInterpolationImages();

  $('#interpolation-slider').on('input', function (event) {
    setInterpolationImage(this.value);
  });
  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  bulmaSlider.attach();

})
