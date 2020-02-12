'use strict';

console.log('index.js is run');

baguetteBox.run('.gallery', {
  animation: 'fadeIn',
  // затухающая анимация
  noScrollbars: true,
  // убирает полосу прокрутки основной страницы

  async: true,
  // === добавляет подпись внизу из атрибута alt
  captions: function(element) {
    return element.getElementsByTagName('img')[0].alt;
  },
});

$(window).scroll(function(){
  if ($(this).scrollTop() > 300) {
    $('.jump-to-top').fadeIn();
  } else {
    $('.jump-to-top').fadeOut();
  }
});

$('.jump-to-top').click(function(){
  $('html, body').animate({scrollTop : 0},800);
  return false;
});
