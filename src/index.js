var Thing = require('./thing'),
    $ = require('jquery'),
    Spinner = require('spin.js');

require('magnific-popup');

$(function() {
    $('#content').text(Thing('hello'));
    $('button').magnificPopup({
      items: {
          src: '<div class="spin"></div>',
          type: 'inline'
      }
    });

    $('button').on('mfpOpen', function(e) {
      var spinner = new Spinner().spin();
      $('.spin').append(spinner.el);
    });
});