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

  // Move navigator into sidebar
  var document_guide_title = $("#document-guide");
  var document_guide_list = document_guide_title.next("ol");  // ordered list
  var sidebar = $(".sidebar .sidebar-nav");

  var merge_dom = document_guide_title.add(document_guide_list);
  var sidebar_document_guide = $("<div id='document-guide-sidebar'>").html(merge_dom);
  sidebar.append(sidebar_document_guide);

  var sidebar_document_guide_css = $(""
    + "<style>"
    + ".sidebar-nav a {"
    + "  font-size: 15px;"
    + "}"
    + "#document-guide {"
    + "  color: #fff;"
    + "}"
    + "#document-guide-sidebar ol li a {"
    + "  font-size: 13px;"
    + "}"
    + "#document-guide-sidebar ol li {"
    + "  margin-top: -10px;"
    + "}"
    + ".sidebar p {"
    + "  font-size: 18px;"
    + "}"
    + "</style>"
  );
  sidebar.append(sidebar_document_guide_css);

  // Fix broken luiti anchor.
  var badgets_dom = $(".content p:first");
  badgets_dom.attr({"id": "luiti"});


  var content_dom = $("body .content");
  var luiti_logo = content_dom.find("h1:first");
  $(".sidebar-about h1:first a").html(luiti_logo);
  content_dom.find("p:first").html("");


});
