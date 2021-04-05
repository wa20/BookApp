$(document).ready(function() {

  function toggleSidebar() {
    $(".burgerBtn").toggleClass("active");
    $(".mainBody").toggleClass("move-to-left");
    $(".sidebar-item").toggleClass("active");
    $(".sidebar").toggleClass("side-visible");
    $(".sidebar").toggleClass("side-hidden");
    // add another row to show the side-bar
  }

  $(".burgerBtn").on("click tap", function() {
    toggleSidebar();
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

});