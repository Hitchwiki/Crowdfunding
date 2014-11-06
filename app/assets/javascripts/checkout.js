$(document).ready(function () {

  $('#checkout_loading').hide();

  $('#checkout').submit(function (e) {
    $('#payment_errors').hide();
    $('#checkout_loading').show();

      var _this = this;
      e.preventDefault();

      var card_details = {
        number:         $('#card_number').val().replace(/ /g, ''),
        exp_month:      $('#expires_month').val(),//.split('/')[0],
        exp_year:       $('#expires_year').val(),//.split('/')[1],
        cvc:            $('#cvv').val(),
        name:           $('#name').val(),
        address_line1:    $('#address_line1').val(),
        address_line2:    $('#address_line2').val(),
        address_city:     $('#address_city').val(),
        address_state:    $('#address_state').val(),
        address_zip:      $('#address_zip').val(),
        address_country:  $('#address_country').val()
      }

      for (var i in card_details) {
        if (card_details[i] === null || card_details[i] === undefined || card_details[i] === '') {
          delete card_details[i];
        }
      }

      Stripe.card.createToken(card_details, function (status, response) {
        if (status == 200) {
          $('#stripe_token').val(response.id);
          _this.submit();
        }
        else {
          $('#checkout_loading').hide();
          $('input, select, textarea').prop('disabled', false);

          //error
          if (response && response.error && response.error.message) {
           $('#payment_errors_info').text(response.error.message);
          } else {
            $('#payment_errors_info').text('');
          }
          $('#payment_errors').show();
          return false;
        }
      });

  });
});
