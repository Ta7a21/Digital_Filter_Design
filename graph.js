
//window.onload = function() {draw()}
var pointSize = 3;
var canvas,
  context,
  centerX,
  radius,
  centerY;
function draw() {
  canvas = document.getElementById('oy');
  var ctx = canvas.getContext('2d');
  radius = 200;
  var startAngle = 0;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  var endAngle = 2 * (Math.PI);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.moveTo(radius + 30, 5);
  ctx.lineTo(radius + 30, 2 * radius + 5);
  ctx.moveTo(30, radius + 5);
  ctx.lineTo(30 + radius * 2, radius + 5);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#8a2f50";
  ctx.stroke();
  ctx.closePath();
}

$("#oy").click(function (e) {
  getPosition(e);
});

function getPosition(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  if (Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) <= Math.pow(radius, 2))
    drawCoordinates(x, y);
}

function drawCoordinates(x, y) {
  var ctx = document.getElementById("oy").getContext("2d");


  ctx.beginPath();
  ctx.fillStyle = "#ffffff"; // Red color

  ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
  ctx.fill();

  // ctx.moveTo(x - 5, y - 5);
  // ctx.lineTo(x + 5, y + 5);

  // ctx.moveTo(x + 5, y - 5);
  // ctx.lineTo(x - 5, y + 5);
  // ctx.strokeStyle = "#ffffff";
  // ctx.stroke();
}

WebFontConfig = {
  google: { families: ['Open+Sans+Condensed:300:latin'] }
};
(function () {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

