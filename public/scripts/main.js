require(["jquery", "prettify", "events"], function($, p, events) {
  $(document).ready(function(e) {
    prettyPrint();
    events.bind();
  });
});