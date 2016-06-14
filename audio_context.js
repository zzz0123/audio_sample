window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var reader = new FileReader;

reader.onload = function () {
  context.decodeAudioData(reader.result, function(buffer) { playSound(buffer) });
}

var playSound = function(buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

window.onload = function () {
  var f = document.getElementById('upload')
  f.addEventListener('change', function(e) { reader.readAsArrayBuffer(e.target.files[0]) });
}
