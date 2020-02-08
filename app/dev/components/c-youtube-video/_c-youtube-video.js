'use strict';

// =============================================================================
// 1 - подключение плеера
// =============================================================================

// добавить в html
// <div id="player_id1"></div>

// =============================================================================
// 2 - асинхронная загрузка скрипта с API
// =============================================================================

const tag = document.createElement('script');
// переменная внутри которой элемент <script>
tag.src = 'https://www.youtube.com/iframe_api';
// добавить внутрь <script> атрибут src со ссылкой на iframe API
const firstScriptTag = document.getElementsByTagName('script')[0];
// находит на странице уже существующий элемент <script> первый по счету
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// выйти на родителя уже существующего тега <script>, т.е. <body>
// и добавить внутрь него в самое начало еще один тег <script>

// =============================================================================
// 3 - создание объекта с настройками плеера
// =============================================================================

let player;
// переменная с плеером

// === функция, которая будет выполнена сразу после загрузки API
function onYouTubeIframeAPIReady() {
  // === запись в переменную нового объекта,
  // который создается через конструктор из API
  player = new YT.Player('player_id1', {
    height: '360',
    width: '640',
    videoId: 'U58G0dEmXKo',
    // === параметры проигрывателя
    playerVars: {
      // autoplay: 1,
      // автоматическое воспроизведение
      // mute: 1,
      // отключить звук
      // start: 80,
      // время с которого запустится видео
      // end: 84,
      // время на котором плеер уйдет в режим стоп
      // loop: 1,
      //  зацикленное воспроизведение всего плейлиста
      // playlist: 'U58G0dEmXKo',
      // плейлист из одного видео, остальные можно добавить через запятую
      controls: 0,
      // скрыть панель управления (внизу - play, volume, progress, settings)
      iv_load_policy: 3,
      // скрыть все нотации (всплывающие окна и ссылки)
      rel: 0,
      // отключить предложение похожих видео на стопе и на паузе
      disablekb: 1,
      // отключить управление с клавиатуры
    },
    // === события
    events: {
      onReady: onPlayerReady,
      // // плеер готов
      onStateChange: onPlayerStateChange,
      // // дальнейшее отслеживание изменений
    },
  });
}

// =============================================================================
// 4 - действия после загрузки плеера на странице
// =============================================================================

let thisIframeId;
// id этого плеера
let $thisPlayerOverlay;
// оверлей над видео с названием и кнопкой play

// === функция запускаемая в ответ на событие onReady
function onPlayerReady(event) {
  const thisPlayerAPI = event.target;
  thisIframeId = thisPlayerAPI.getIframe().getAttribute('id');
  const $thisPlayerDom = document.getElementById(thisIframeId);
  $thisPlayerDom.classList.add('embed-responsive-item');

  $thisPlayerOverlay = $thisPlayerDom.parentElement.querySelector(
    '.youtube-video__overlay'
  );

  // === событие клик по оверлею с названием и кнопкой play
  $thisPlayerOverlay.addEventListener('click', function(event) {
    thisPlayerAPI.playVideo();
    // воспроизведение видеопотока

    this.style.display = 'none';
    // скрыть оверлей с названием и кнопкой play
    this.classList.add('youtube-video__overlay_hide-bg-and-text');
    // скрытие фона оверлея и названия видео
    // в дальнейшем этот класс убираться не будет
    // таким образом на паузе будет появляться только кнопка play
  });
}

// =============================================================================
// 5 - действия в ответ на какие-то изменения в плеере
// =============================================================================

// === функция запускаемая в ответ на событие onStateChange
function onPlayerStateChange(event) {
  if (
    event.data == YT.PlayerState.PAUSED ||
    event.data == YT.PlayerState.ENDED
  ) {
    $thisPlayerOverlay.style.display = 'block';
    // вернуть кнопку play
  }
}
