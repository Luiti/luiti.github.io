$(document).ready(function() {

  // Utils
  var highlights = $(".highlight");
  function select_highlight_block(match_string) {
    var selected = [];
    _.each(highlights, function(dom) {
      var _text = $(dom).text();
      if (_text.indexOf(match_string) > -1) {
        selected.unshift(dom);
      }
    });
    if (selected.length > 1) {
      throw "This \"" + match_string + "\" is not uniq!";
    }

    return $(selected[0]);
  };

  // Fix "The directory structure of a specific project." CSS
  var directory_structure_doc = select_highlight_block("project README");
  directory_structure_doc.css("width", "960px");
  directory_structure_doc.find("code").css("font-size", "12px");


});
