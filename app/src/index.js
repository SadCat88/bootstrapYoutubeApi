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
