$(function () {
  $("#openImp").click(function () {
    $("#impressum").fadeIn(1000);
  });
  $("#closeImp").click(function () {
    $("#impressum").fadeOut(1000);
  });
});

window.onload = function () {
  let spinner = document.getElementById("preload");
  spinner.classList.add("loaded");
};
