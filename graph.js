
//window.onload = function() {draw()}
var pointSize = 3, zeros = [], poles = [], canvas = document.getElementById('oy');
var context,
  centerX,
  radius,
  centerY;
function draw() {
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
    drawCoordinates(x, y, document.getElementById('zero').checked);
}

function drawCoordinates(x, y, flag) {
  var ctx = canvas.getContext("2d");


  ctx.beginPath();
  if (flag) {
    zeros.push([x, y]);
    ctx.fillStyle = "#ffffff"; // Red color

    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();
  }
  else {
    poles.push([x, y]);
    ctx.moveTo(x - 5, y - 5);
    ctx.lineTo(x + 5, y + 5);

    ctx.moveTo(x + 5, y - 5);
    ctx.lineTo(x - 5, y + 5);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }
  ctx.closePath();
}

function clearCanvas(toClear) {
  // console.log('toClear')
  draw();
  if (toClear === 'zeros') {
    for (let i = 0; i < poles.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(poles[i][0] - 5, poles[i][1] - 5);
      ctx.lineTo(poles[i][0] + 5, poles[i][1] + 5);

      ctx.moveTo(poles[i][0] + 5, poles[i][1] - 5);
      ctx.lineTo(poles[i][0] - 5, poles[i][1] + 5);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
    }
    zeros = []
  }
  else if (toClear === 'poles') {

    for (let i = 0; i < zeros.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = "#ffffff"; // Red color

      ctx.arc(zeros[i][0], zeros[i][1], pointSize, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    }
    poles = []
  }
  else {
    zeros = []
    poles = []
  }
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

