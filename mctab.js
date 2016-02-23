$(function () {
  var currentText = '';

  $('#font-size-dec').button().click(function () {
    changeFontSize(-1);
    updateText();
  });

  $('#font-size-inc').button().click(function () {
    changeFontSize(1);
    updateText();
  });

  $('#change-text-size').buttonset();

  $('#tab-input').on('paste', function (e) {
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
    var longestLineWidth = calcLineWidth(longestLine(currentText));
    console.log(longestLineWidth);
    $('#tab-content').css('-moz-column-width', longestLineWidth);
    outputText = currentText;
    outputText = '<div class="paragraph">\n' + outputText + '\n</div>';
    outputText = outputText.replace(/^\s*[\r\n]/gm, '</div>\n<div class=\"paragraph\">\n');
    outputText = outputText.replace(/\n/g, '<br />');
    $('#tab-content').html(outputText);
    //$('#tab-input').remove();
  }

  function calcLineWidth(line) {
    var lineWidth = $('#dummy').html(line).width();
    $('#dummy').html('');
    return lineWidth;
  }

  function longestLine(text) {
    var lines = text.split('\n');
    var longestLineWidth = 0;
    var longestLine = "";
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var lineWidth = calcLineWidth(line);
      if (lineWidth > longestLineWidth) {
        longestLineWidth = lineWidth;
        longestLine = line;
      }
    }
    return longestLine;
  }

  function changeFontSize(d) {
    var fontSize = parseInt($("#tab-content").css("font-size"));
    fontSize = fontSize + d + "px";
    $("#tab-content").css({'font-size': fontSize});
    console.log(fontSize);
  }

});
