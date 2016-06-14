window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var reader = new FileReader;
var source;

reader.onload = function () {
  context.decodeAudioData(reader.result, function(buffer) { playSound(buffer) });
}

var playSound = function(buffer) {
  stopSound();
  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

var stopSound = function() {
  if (source) {
    source.stop();
  }
}

window.onload = function () {
  var f = document.getElementById('upload');
  f.addEventListener('change', function(e) { reader.readAsArrayBuffer(e.target.files[0]) });

  var s = document.getElementById('stop');
  s.onclick = function() { stopSound() };
}
