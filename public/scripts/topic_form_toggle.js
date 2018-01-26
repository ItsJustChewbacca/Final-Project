$( document ).ready(function() {
  $("#show_form").hide();
  $("#add_topic").on('click', function(e){
    e.preventDefault();
    $("#show_form").toggle('slow');
  });

  function createtopic(data) {
    var $newitem = $("<div>").addclass("list-group-item");
    var $ul = $("<div>").addclass("list-group");
    $ul.append("$newitem");
  }
});

