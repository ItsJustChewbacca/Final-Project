$(function() {

  $( "body" ).on('click', '.fa-thumbs-o-up', function() {

    if (!$(this).hasClass('up')) {
      $(this).addClass('up');

      $('.fa-thumbs-o-down').removeClass('down');

      var likeCounter = $(this).siblings('.likecounter');
      var count = +likeCounter.text();
      console.log('count', count);
      var closestCard = $(this).closest('.like');
      console.log('closest card:', closestCard);
      var commentid = $(closestCard).data('id');
      var topicid = $(closestCard).data('tid');
      console.log(commentid);
      console.log(topicid);

      count++;
      likeCounter.text(count);
    }



    $.ajax({
      url: `/forum/topics/${topicid}/comments/${commentid}/likes`,
      method: 'POST',
      data: {"likes": count},
      success: (s) => {
        console.log("data added ");
      }
    });

  });

  $( "body" ).on('click', '.fa-thumbs-o-down', function() {
      if (!$(this).hasClass('down')) {

        $(this).addClass('down');

        $('.fa-thumbs-o-up').removeClass('up');


        var likeCounter = $(this).siblings('.likecounter');
        var count = +likeCounter.text();
        console.log('count', count);
        var closestCard = $(this).closest('.like');
        console.log('closest card:', closestCard);
        var commentid = $(closestCard).data('id');
        var topicid = $(closestCard).data('tid');
        console.log(commentid);
        console.log(topicid);

        count--;
        likeCounter.text(count);
      }

      $.ajax({
      url: `/forum/topics/${topicid}/comments/${commentid}/likes`,
      method: 'POST',
      data: {"likes": count},
      success: (s) => {
        console.log("data added ");
      }
    });
  });
});