function showLogo() {
  $('.report-logo').fadeIn();
  $('.report-logo').css("display","initial");
}
function hideLogo() {
  $('.report-logo').fadeOut();
  $('.report-logo').css("display","none");
}

$(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 200) {
      $('.top').stop().animate({
        top: "-20px",
        height: "70px",
        fontSize: "20px",
      },200);
      hideLogo();
    } else {
      $('.top').stop().animate({
        top: "0",
        height: "100vh",
        fontSize: "50px",
      },200);
      showLogo();
    }
});