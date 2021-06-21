
//window.onload = function() {draw()}
var pointSize = 4, zeros = [], poles = [], canvas = document.getElementById('oy');
var centerX,
  radius,
  centerY;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var dragok = false;
var del = false;
var startX;
var startY;
var lineChart = 0;
var lineChart2 = 0;
var lineChart3 = 0;
var lambda = 0;

for (let i = -0.9; i <= 0.9; i += 0.1) {
  if (i.toFixed(1) != -0.0) {
    document.getElementById("checkBoxes").innerHTML += "<input onclick  = \"freqResponse(" + i.toFixed(1) + ")\"  type=\"checkbox\" id=" + i.toFixed(1) + ">" + i.toFixed(1) + "<br>"
  }
  else {
    document.getElementById("checkBoxes").innerHTML += "<input onclick  = \"freqResponse(" + 0 + ")\" type=\"checkbox\" id=" + 0 + ">" + 0 + " <br> "
  }
}



canvas.addEventListener("contextmenu", e => e.preventDefault());

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

$("#oy").click(function (e) {
  getPosition(e);
});

function getPosition(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  if (Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) <= Math.pow(radius, 2)) {
    drawCoordinates(x, y, document.getElementById('zero').checked);

  }
}

function iterate(arr, range, x, y) {
  for (i = 0; i < arr.length; i++) {
    xmax = arr[i].x + range
    xmin = arr[i].x - range
    ymax = arr[i].y + range
    ymin = arr[i].y - range
    if (inRange(x, xmin, xmax)) {
      if (inRange(y, ymin, ymax)) {
        return true
      }
    }
  }
}

function drawCoordinates(x, y, flag) {
  var ctx = canvas.getContext("2d");

  let exist = false

  if (iterate(zeros, pointSize * 2, x, y))
    exist = true
  if (iterate(poles, 10, x, y))
    exist = true
  ctx.beginPath();
  if (flag) {
    if (!exist) {
      zeros.push({ x, y, isDragging: false });
      ctx.fillStyle = "#ffffff"; // Red color

      ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
      ctx.arc(x, -y, pointSize, 0, Math.PI * 2, true);

      ctx.fill();
      if (document.getElementById('conj').checked) {
        y = 2 * centerY - y
        zeros.push({ x, y, isDragging: false });
        ctx.fillStyle = "#ffffff"; // Red color

        ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);

        ctx.fill();
      }
    }
  }
  else {
    if (!exist) {
      poles.push({ x, y, isDragging: false });
      ctx.moveTo(x - 5, y - 5);
      ctx.lineTo(x + 5, y + 5);

      ctx.moveTo(x + 5, y - 5);
      ctx.lineTo(x - 5, y + 5);

      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      if (document.getElementById('conj').checked) {
        y = 2 * centerY - y
        poles.push({ x, y, isDragging: false });

        ctx.moveTo(x - 5, y - 5);
        ctx.lineTo(x + 5, y + 5);
        ctx.moveTo(x + 5, y - 5);
        ctx.lineTo(x - 5, y + 5);
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
    }
  }

  ctx.closePath();
  freqResponse(5);
}

var inRange = function (num, start, end) {

  // If no end number, use start as end
  if (!end) {
    end = start;
    start = 0;
  }

  return num >= start && num <= end;

};

function clearCanvas(toClear) {
  if (toClear === 'zeros') {
    zeros = []
  }
  else if (toClear === 'poles') {
    poles = []
  }
  else {
    zeros = []
    poles = []
  }
  draw();
  freqResponse(5);
}

function myDown(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();
  // get the current mouse position
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  // test each shape to see if mouse is inside
  dragok = false;
  del = false;

  if (iterate(zeros, pointSize, x, y)) {
    if (e.button == 2) {
      del = true
      zeros.splice(i, 1)
    }
    else {
      dragok = true;
      zeros[i].isDragging = true;
    }
  }

  if (!dragok)
    if (iterate(poles, 5, x, y)) {
      if (e.button == 2) {
        del = true
        poles.splice(i, 1)
      }
      else {
        dragok = true;
        poles[i].isDragging = true;
      }
    }
  startX = x;
  startY = y;
}

// handle mouseup events
function myUp(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();
  // clear all the dragging flags
  if (!del) {
    dragok = false;
    for (var i = 0; i < zeros.length; i++) {
      zeros[i].isDragging = false;
    }
    for (var i = 0; i < poles.length; i++) {
      poles[i].isDragging = false;
    }
  }
  else {
    draw()
    freqResponse(5)
  }
}


// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {

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
      if (zeros[i].isDragging) {
        zeros[i].x += dx;
        zeros[i].y += dy;
      }
    }

    for (var i = 0; i < poles.length; i++) {
      if (poles[i].isDragging) {
        poles[i].x += dx;
        poles[i].y += dy;
      }
    }

    // redraw the scene with the new rect positions
    draw();
    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;

  }
}

var show = true;

function showCheckboxes() {
  var checkboxes =
    document.getElementById("checkBoxes");

  if (show) {
    checkboxes.style.display = "block";
    show = false;
  } else {
    checkboxes.style.display = "none";
    show = true;
  }
}

function addFilter() {
  let filter = document.getElementById("text").value
  document.getElementById("checkBoxes").innerHTML += "<input onclick  = \"freqResponse('" + filter + "')\"  type=\"checkbox\" id=\"" + filter + "\">" + filter + "<br>"
}

function freqResponse(lambda) {
  var zerosP = [], polesP = [];
  for (var i = 0; i < zeros.length; i++) {
    var xx = zeros[i].x - 230;
    var yy = 210 - zeros[i].y;
    xx /= 200.0;
    yy /= 200.0;
    zerosP.push([xx, yy])
  }
  for (var i = 0; i < poles.length; i++) {
    var xx = poles[i].x - 230;
    var yy = 210 - poles[i].y;
    xx /= 200.0;
    yy /= 200.0;
    polesP.push([xx, yy])
  }
  var flag = false;
  if (lambda != 5) {
    flag = document.getElementById(lambda).checked;  
  }
  console.log(flag)
  $.post("/postmethod", {
    zeros_data: JSON.stringify(zerosP),
    poles_data: JSON.stringify(polesP),
    lambdaP: JSON.stringify(lambda),
    flag: JSON.stringify(flag)

  },
    function (err, req, resp) {
      x = JSON.parse(resp["responseText"])
      if (lineChart != 0)
        lineChart.destroy();
      for (var i = 0;i<x.magnitudeX.length;i++){
        // x.magnitudeX[i] = (x.magnitudeX[i]/maxX).toFixed(2);
        x.magnitudeY[i] = x.magnitudeY[i].toFixed(2);
        x.angles[i] = x.angles[i].toFixed(2);
      }

      const chart = document.getElementById("chart")
      lineChart = new Chart(chart, {
        type: 'line',
        data: {
          labels: x.magnitudeX,
          datasets: [
            {
              label: "Magnitude Response",
              fill: false,
              // lineTension: 0.1,
              backgroundColor: "rgba(75, 192, 192, 0.4)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHitRadius: 10,
              data: x.magnitudeY,
              // borderColor: Utils.CHART_COLORS.red,
              // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            },
          ]
        }
      })
      if (lineChart2 != 0)
        lineChart2.destroy();

      const chart2 = document.getElementById("chart2")
      lineChart2 = new Chart(chart2, {
        type: 'line',
        data: {
          labels: x.magnitudeX,
          datasets: [
            {
              label: "Phase response",
              fill: false,
              // lineTension: 0.1,
              backgroundColor: "rgba(255,140,0,0.4)",
              borderColor: "rgba(255,140,0,0.7)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(255,140,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHitRadius: 10,
              data: x.angles3,
              // borderColor: Utils.CHART_COLORS.red,
              // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            },
          ]
        }
      })

      if (lineChart3 != 0)
        lineChart3.destroy();

      const chart3 = document.getElementById("chart3")
      lineChart3 = new Chart(chart3, {
        type: 'line',
        data: {
          labels: x.magnitudeX,
          datasets: [
            {
              label: "All-Pass Filters phase response",
              fill: false,
              // lineTension: 0.1,
              backgroundColor: "rgba(34,139,34,0.4)",
              borderColor: "rgba(34,139,34,0.7)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'bevel',
              pointBorderColor: "rgba(34,139,34,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHitRadius: 10,
              data: x.angles2,
              // borderColor: Utils.CHART_COLORS.red,
              // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
            },
          ]
        }
      })
      // window.location.href = "/results/"+resp["responseJSON"]["unique_id"];  
      // console.log(resp);
    });

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

