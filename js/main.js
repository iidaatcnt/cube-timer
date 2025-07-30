(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop  = document.getElementById('stop');
  var reset = document.getElementById('reset');
  

  var startTime;
  var elapsedTime = 0;
  var timerId;
  var isRunning = false;

  function formatTime(ms) {
    var h = Math.floor(ms / (60 * 60 * 1000));
    var m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    var s = Math.floor((ms % (60 * 1000)) / 1000);
    var cs = Math.floor((ms % 1000) / 10); // センチ秒

    return [
      h > 0 ? String(h).padStart(2, '0') + ':' : '',
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0')
    ].join(':') + '.' + String(cs).padStart(2, '0');
  }

  function updateTimer() {
    var t = Date.now() - startTime + elapsedTime;
    timer.textContent = formatTime(t);
    timerId = setTimeout(updateTimer, 10); // 10ミリ秒ごとに更新
  }

  start.addEventListener('click', function() {
    if (isRunning) {
      return;
    }
    isRunning = true;
    startTime = Date.now();
    updateTimer();
    start.textContent = 'Pause';
  });

  stop.addEventListener('click', function() {
    if (!isRunning) {
      return;
    }
    isRunning = false;
    clearTimeout(timerId);
    elapsedTime += Date.now() - startTime;
    start.textContent = 'Start';
  });

  reset.addEventListener('click', function() {
    isRunning = false;
    clearTimeout(timerId);
    elapsedTime = 0;
    timer.textContent = formatTime(0);
    start.textContent = 'Start';
  });

  

})();