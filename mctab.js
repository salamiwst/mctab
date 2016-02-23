$(function () {
  $('#tab-input').on('paste', function (e) {
    e.preventDefault();
    var clipboardText = e.originalEvent.clipboardData.getData("Text");
    if (clipboardText) {
      var longestLineWidth = $('#dummy').html(longestLine(clipboardText)).width();
      console.log(longestLineWidth);
      $('#tab-content').css('-moz-column-width', longestLineWidth);
      clipboardText = clipboardText.replace(/\n/g, "<br />");
      $('#tab-content').html(clipboardText);
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
