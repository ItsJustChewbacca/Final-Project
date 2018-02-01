$(function() {

  $( "body" ).on('click', '.fa-thumbs-up', function() {

    if (!$(this).hasClass('up')) {
      $(this).addClass('up');
      $('.fa-thumbs-down').removeClass('down');

      var likeCounter = $(this).siblings('.likecounter');
      var count = +likeCounter.text();
      console.log('count', count);
      var closestCard = $(this).closest('.like');
      console.log('closest card:', closestCard);
      var topicid = $(closestCard).data('id');
      console.log(topicid);

      count++;
      likeCounter.text(count);
    }

    $.ajax({
      url: `/forum/topics/${topicid}/likes`,
      method: 'POST',
      data: {"likes": count},
      success: (s) => {
        console.log("data added ");
      }
    });

  });

  $( "body" ).on('click', '.fa-thumbs-down', function() {
    if (!$(this).hasClass('down')) {
      $(this).addClass('down');
      $('.fa-thumbs-up').removeClass('up');

      var likeCounter = $(this).siblings('.likecounter');
      var count = +likeCounter.text();
      console.log('count', count);
      var closestCard = $(this).closest('.like');
      console.log('closest card:', closestCard);
      var topicid = $(closestCard).data('id');
      console.log(topicid);

      count--;
      likeCounter.text(count);
    }

    $.ajax({
      url: `/forum/topics/${topicid}/likes`,
      method: 'POST',
      data: {"likes": count},
      success: (s) => {
        console.log("data added ");
      }
    });

  });
});