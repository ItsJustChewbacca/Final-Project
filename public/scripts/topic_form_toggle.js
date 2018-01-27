$(function() {

  // $("#addtopic").submit(function(event) {
  //   event.preventDefault();
  //   // Add Loading Thing to page
  //   var data = $(this).serialize();
  //   console.log('Data', data);
  //   $.ajax({
  //     url: "/forum/",
  //     method: "POST",
  //     data,
  //       success: (s) => {
  //         // remove the loading thing
  //         loadTopics()
  //         $('#addtopic').find('textarea').val("");
  //       }
  //   });
  // });

  function loadTopics() {
    $.ajax({
      method: 'GET',
      url: '/forum'
    })
    .done(renderTopics);
  }

  function renderTopics(topics) {
    // loops through topics
    topics.forEach(function(topic){

      var $newTopic = createTopic(topic);
      $('#new-topics').prepend($newTopic);
    });
  };



  $("#show_form").hide();
  $("#add_topic").on('click', function(e){
    e.preventDefault();
    $("#show_form").toggle('slow');
  });

  loadTopics();

});


function createTopic(topic) {
  let topic = `<div id="accordion">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                      <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ${topics.title}
                      </button>
                    </h5>
                  </div>

                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      <form method="POST">
                        <textarea name="text" id="comment_area" placeholder="Write your comment here"></textarea>
                        <input type="submit" value="Comment">
                      </form>
                    </div>
                  </div>
                </div>
              </div>`;
  return topic;
}

// function escape(str) {
//   var div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// }


