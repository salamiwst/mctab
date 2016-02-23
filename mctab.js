$(function () {
  $('#tab-input').on('paste', function (e) {
    e.preventDefault();
    var clipboardText = e.originalEvent.clipboardData.getData("Text");
    if (clipboardText) {
      var longestLineWidth = $('#dummy').html(longestLine(clipboardText)).width();
      $('#dummy').html('');
      console.log(longestLineWidth);
      $('#tab-content').css('-moz-column-width', longestLineWidth);
      outputText = clipboardText;
      outputText = '<div class="paragraph">\n' + outputText + '\n</div>';
      outputText = outputText.replace(/^\s*[\r\n]/gm, '</div>\n<div class=\"paragraph\">\n');
      outputText = outputText.replace(/\n/g, '<br />');
      $('#tab-content').html(outputText);
      //$('#tab-input').remove();
    } else {
      alert('Nothing to paste!');
    }
  });

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

});
