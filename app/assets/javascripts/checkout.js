$(document).ready(function () {

  $('#checkout_loading').hide();

  $('#checkout').submit(function (e) {
    console.log('checkout submit');
    $('#payment_errors').hide();
    $('input, select, textarea').prop('disabled', true);

    $('#checkout_loading').show();

    var _this = this;

      e.preventDefault();

      Stripe.card.createToken({
        number:         $('#card_number').val().replace(/ /g, ''),
        exp_month:      $('#expires_month').val(),//.split('/')[0],
        exp_year:       $('#expires_year').val(),//.split('/')[1],
        cvc:            $('#cvv').val()
      }, function (status, response) {
        if (status == 200) {
          $('#stripe_token').val(response.id);
          console.log('stripe token created: ' + response.id);
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
