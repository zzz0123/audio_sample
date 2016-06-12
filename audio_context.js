var context;
var src = 'sample.mp3'

window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

var getAudioBuffer = function(source, fn) {
  var req = new XMLHttpRequest();
  req.responseType = 'arraybuffer';

  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 0 || req.status === 200) {
        context.decodeAudioData(req.response, function(buffer) {
          fn(buffer);
        });
      }
    }
  };
  req.open('GET', source, true);
  req.send('');
};

var playSound = function(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

window.onload = function() {
  getAudioBuffer(src, function(buffer) {
    var btn = document.getElementById('btn');
    btn.onclick = function() {
      playSound(buffer);
    };
  });
};
