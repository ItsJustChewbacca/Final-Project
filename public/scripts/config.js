$(function() {
  function begToDiffer(gameFrom, gameTo) {
    const reverseMap = Object.keys(gameFrom).reduce((map, key) => {
      return Object.assign({}, map, {[gameFrom[key]]: key});
    }, {});
    const diff = Object.keys(gameTo).reduce((map, key) => {
      const to = gameTo[key];
      const from = reverseMap[to];
      // console.log("MAP", map);
      if(from && from !== key){
        return [...map, [from, key]];
      }
      return map;
    }, []);
    console.log('diff', diff);
    for (var binding of diff) {
      var [from_side, to_side] = binding;
      console.log(` ${from_side} ~> map to ~> ${to_side}`);
    }
    return diff;
  }

  function leftOutOfTheShuffle(diff){
    const leftOutA = diff
      .map(([a]) => a)
      .filter(a => !diff.some(([x, b]) => a == b));

    const leftOutB = diff
      .map(([a, b]) => b)
      .filter(b => !diff.some(([a]) => a == b));
      console.log( `${leftOutB} ~> map to ~> ${leftOutA}`);
    return [leftOutA, leftOutB];

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
    leftOutOfTheShuffle(begToDiffer(gameFrom, gameTo));
  }

});









