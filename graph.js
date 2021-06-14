
//window.onload = function() {draw()}
var pointSize = 3, zeros = [], poles = [], canvas = document.getElementById('oy');
var centerX,
  radius,
  centerY;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var dragok = false;
var startX;
var startY;

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;
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

  if (Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) <= Math.pow(radius, 2)) {
    // flag = del(x, y);
    // if (!flag)
    drawCoordinates(x, y, document.getElementById('zero').checked);

  }
}

function drawCoordinates(x, y, flag) {
  var ctx = canvas.getContext("2d");


  ctx.beginPath();
  if (flag) {
    zeros.push({ x, y, isDragging: false });
    ctx.fillStyle = "#ffffff"; // Red color

    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();
  }
  else {
    poles.push({ x, y, isDragging: false });
    ctx.moveTo(x - 5, y - 5);
    ctx.lineTo(x + 5, y + 5);

    ctx.moveTo(x + 5, y - 5);
    ctx.lineTo(x - 5, y + 5);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }
  ctx.closePath();
}

var inRange = function (num, start, end) {

  // If no end number, use start as end
  if (!end) {
    end = start;
    start = 0;
  }

  return num >= start && num <= end;

};

function del(x, y) {
  var flag = false
  for (i = 0; i < zeros.length; i++) {
    xmax = zeros[i].x + 5
    xmin = zeros[i].x - 5
    ymax = zeros[i].y + 5
    ymin = zeros[i].y - 5
    if (inRange(x, xmin, xmax)) {
      if (inRange(y, ymin, ymax)) {
        zeros.splice(i, 1)
        flag = true

      }
    }
  }

  for (i = 0; i < poles.length; i++) {
    xmax = poles[i].x + 5
    xmin = poles[i].x - 5
    ymax = poles[i].y + 5
    ymin = poles[i].y - 5
    if (inRange(x, xmin, xmax)) {
      if (inRange(y, ymin, ymax)) {
        poles.splice(i, 1)
        flag = true

      }
    }
  }

  if (flag) {
    draw();
    for (let i = 0; i < poles.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(poles[i].x - 5, poles[i].y - 5);
      ctx.lineTo(poles[i].x + 5, poles[i].y + 5);

      ctx.moveTo(poles[i].x + 5, poles[i].y - 5);
      ctx.lineTo(poles[i].x - 5, poles[i].y + 5);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
    }

    for (let i = 0; i < zeros.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = "#ffffff"; // Red color

      ctx.arc(zeros[i].x, zeros[i].y, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    }
  }
  return flag
}

function clearCanvas(toClear) {
  // console.log('toClear')
  draw();
  if (toClear === 'zeros') {
    for (let i = 0; i < poles.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(poles[i].x - 5, poles[i].y - 5);
      ctx.lineTo(poles[i].x + 5, poles[i].y + 5);

      ctx.moveTo(poles[i].x + 5, poles[i].y - 5);
      ctx.lineTo(poles[i].x - 5, poles[i].y + 5);
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

      ctx.arc(zeros[i].x, zeros[i].y, pointSize, 0, Math.PI * 2, true);
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

function myDown(e) {
  // console.log(1);
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  // test each shape to see if mouse is inside
  dragok = false;
  for (var i = 0; i < zeros.length; i++) {
    // test if the mouse is inside this circle
    xmax = zeros[i].x + 1
    xmin = zeros[i].x - 1
    ymax = zeros[i].y + 1
    ymin = zeros[i].y - 1
    if (inRange(x, xmin, xmax)) {
      if (inRange(y, ymin, ymax)) {
        dragok = true;
        zeros[i].isDragging = true;
      }

    }
    // save the current mouse position
    startX = x;
    startY = y;
  }
}

// handle mouseup events
function myUp(e) {
  // console.log(2);
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for (var i = 0; i < zeros.length; i++) {
    zeros[i].isDragging = false;
  }
}


// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {
    console.log(3);

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var rect = canvas.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;

    // calculate the distance the mouse has moved
    // since the last mousemove
    var dx = mx - startX;
    var dy = my - startY;

    // move each rect that isDragging 
    // by the distance the mouse has moved
    // since the last mousemove
    for (var i = 0; i < zeros.length; i++) {
      var s = zeros[i];
      if (s.isDragging) {
        s.x += dx;
        s.y += dy;
      }
    }

    // redraw the scene with the new rect positions
    draw();
    for (let i = 0; i < poles.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(poles[i].x - 5, poles[i].y - 5);
      ctx.lineTo(poles[i].x + 5, poles[i].y + 5);

      ctx.moveTo(poles[i].x + 5, poles[i].y - 5);
      ctx.lineTo(poles[i].x - 5, poles[i].y + 5);
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
    }

    for (let i = 0; i < zeros.length; i += 1) {
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = "#ffffff"; // Red color

      ctx.arc(zeros[i].x, zeros[i].y, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    }

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;

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

