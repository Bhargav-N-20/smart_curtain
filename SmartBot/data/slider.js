var connection = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
connection.onopen = function () {
  connection.send('Connect ' + new Date());
};
connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {
  console.log('Server: ', e.data);
};
connection.onclose = function () {
  console.log('WebSocket connection closed');
};

function sendRGB () {
  var r = document.getElementById('myRange').value** 2 / 1023;
  var g = document.getElementById('myRange').value** 2 / 1023;
  var b = document.getElementById('myRange').value** 2 / 1023;

  var rgb = r << 20 | g << 10 | b;
  var rgbstr = '#' + rgb.toString(16);
  console.log('RGB: ' + rgbstr);
  connection.send(rgbstr);
}



var slider = document.getElementById("myRange");
var output = document.getElementById("value");
var image = document.getElementById("curtain");

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

slider.addEventListener("mousemove", function () {
  var x = slider.value;
  var color =
    "linear-gradient(90deg,rgb(100,255,100)" +
    x +
    "%, rgb(214,214,214)" +
    x +
    "%)";
  slider.style.background = color;

  if (x > 40 && x < 70) {
    image.src = "Middle.PNG";
    document.getElementById("curtstatus").innerHTML = "Curtain is Half-Open";
  } else if (x > 70) {
    image.src = "End.PNG";
    document.getElementById("curtstatus").innerHTML = "Curtain is Opened";
  } else {
    image.src = "start.PNG";
    document.getElementById("curtstatus").innerHTML = "Curtain is Closed";
  }
});


