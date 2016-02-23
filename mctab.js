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
    var longestLineWidth = $('#dummy').html(longestLine(currentText)).width();
    $('#dummy').html('');
    console.log(longestLineWidth);
    $('#tab-content').css('-moz-column-width', longestLineWidth);
    outputText = currentText;
    outputText = '<div class="paragraph">\n' + outputText + '\n</div>';
    outputText = outputText.replace(/^\s*[\r\n]/gm, '</div>\n<div class=\"paragraph\">\n');
    outputText = outputText.replace(/\n/g, '<br />');
    $('#tab-content').html(outputText);
    //$('#tab-input').remove();
  }

  function longestLine(text) {
    var i = 0;
    var longestLineWidth = 0;
    var longestLine = "";
    var line = "";
    while (i < text.length) {
      if (text.charAt(i) === '\n') {
        var lineWidth = $('#dummy').html(line).width();
        //console.log(lineWidth);
        if (lineWidth > longestLineWidth) {
          longestLineWidth = lineWidth;
          longestLine = line;
        }
        line = "";
      } else {
        line = line.concat(text.charAt(i));
      }
      i++;
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
