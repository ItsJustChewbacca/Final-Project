$(function() {
  $("#show_form").hide();
  $("#add_topic").on('click', function(e){
    e.preventDefault();
    $("#show_form").slideToggle('fast');
  });
});






