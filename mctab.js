$(function () {
  var currentText = '';
  var preserveSpacing = false;

  $('#font-size-dec').button().click(function () {
    changeFontSize(-1);
    updateText();
  });

  $('#font-size-inc').button().click(function () {
    changeFontSize(1);
    updateText();
  });

  $('#change-text-size').buttonset();

  $(document).on('paste', function (e) {
    e.preventDefault();
    var clipboardText = e.originalEvent.clipboardData.getData("Text");
    if (clipboardText) {
      currentText = clipboardText.trim();
      updateText();
    } else {
      console.log('Nothing to paste!');
    }
  });

  function updateText() {
    $('#dummy').css('font-size', $('#tab-content').css('font-size'));
    var longestLineWidth = calcLongestLineWidth(currentText);
    console.log(longestLineWidth);
    $('#tab-content').css('column-width', longestLineWidth);
    outputText = currentText;
    outputText = outputText.replace(/ /g, '&nbsp;');
    outputText = '<p class="paragraph">\n' + outputText + '\n</p>';
    if (!preserveSpacing) {
      outputText = outputText.replace(/^\s*[\r\n]/gm, '</p><p class=\"paragraph\">');
    }
    outputText = outputText.replace(/\n/g, '<br />');
    $('#tab-content').html(outputText);
  }

  function calcLineWidth(line) {
    var lineWidth = $('#dummy').html(line).width();
    $('#dummy').html('');
    return lineWidth;
  }

  function calcLongestLineWidth(text) {
    var lines = text.split('\n');
    var longestLineWidth = 0;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var lineWidth = calcLineWidth(line);
      if (lineWidth > longestLineWidth) {
        longestLineWidth = lineWidth;
      }
    }
    return longestLineWidth;
  }

  function changeFontSize(d) {
    var fontSize = parseInt($("#tab-content").css("font-size"));
    fontSize = fontSize + d + "px";
    $("#tab-content").css({'font-size': fontSize});
    console.log(fontSize);
  }

});
