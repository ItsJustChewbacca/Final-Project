$(function() {
  function begToDiffer(gameFrom, gameTo) {
    console.log(gameFrom, gameTo);
  }

  $('[data-type="mapping-selection"] [data-type="control"]').on('click', function () {
    // change the displayed mapping to this mapping

    var $control = $(this);

    var $mappingSelection = $control.closest('[data-type="mapping-selection"]');

    var $selectedMapping = $mappingSelection.find('[data-type="selected-mapping"]');

    var $game = $control.closest('[data-type="game"]');

    var controlTitle = $control.data('title');

    var gameTitle = $game.data('title');
    var buttonText = `${gameTitle} ${controlTitle}`;
    $selectedMapping.text(buttonText);
    // call begToDiffer function with arguments in proper order
    var controlMapping = $control.data('mapping');

    $mappingSelection.data('mapping', controlMapping);
    easyPee();
  });

  function easyPee() {
    var gameFrom = $('[data-direction="game-from"]').data('mapping');
    var gameTo = $('[data-direction="game-to"]').data('mapping');
    if (!gameFrom || !gameTo) {
      return;
    }
    begToDiffer(gameFrom, gameTo);
  }

});









