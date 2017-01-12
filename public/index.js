var $screensaver = $('#screensaver');

// Fetch images from API
$.ajax('/api/pictures')
  .done(images => {
    // Add images to DOM
    $screensaver.html(images.map(image => {
      return `
        <div class='image' style='background-image: url("${image.url}")'></div>
      `;
    }));

    // Switch between images
    var $images = $screensaver.find('.image');
    $images.first().addClass('active');
    setInterval(() => {
      var $active = $('.active');
      var $next = $active.next();
      if ($next.length === 0) {
        $next = $images.first();
      }
      $next.addClass('active');
      $active.removeClass('active');
    }, 7500);
  });
