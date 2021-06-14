
//window.onload = function() {draw()}
function draw(){
    console.log("a7a");
    var canvas = document.getElementById('oy');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
      var rect = canvas.getBoundingClientRect();
      var quadrant;
      var theta;
      var thetaDeg;
      var cosT;
      var sinT;
      var circlex;
      var circley;
      var mx;
      var my;
      var radius = 200;
      var startAngle = 0;
      var endAngle = 2*(Math.PI);
      $(document).on('mousemove', function(e) {
        ctx.clearRect(0,0,(2*radius)+150,(2*radius)+150);
        ctx.beginPath();
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.moveTo(radius,0);
        ctx.lineTo(radius,2*radius);
        ctx.moveTo(0,radius);
        ctx.lineTo(radius*2,radius);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#8a2f50";
        ctx.stroke();
        ctx.closePath();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
        var convertedx = mouseToPoint("x", radius, mx);
        var convertedy = mouseToPoint("y", radius, my);
        theta = findTheta(convertedx, convertedy);
        thetaDeg  =toDeg(theta, convertedx, convertedy);
        cosT = Math.round(circlex/radius*1000)/1000;
        sinT = Math.round(circley/radius*1000)/1000;
        $("#theta").html(Math.round(thetaDeg));
        $("#costheta").html(cosT);
        $("#sintheta").html(sinT);
        $("#thetaRad").html(Math.floor(1/180*thetaDeg*1000)/1000);
        circlex = findPoints(theta, radius, "x", convertedx);
        circley = findPoints(theta, radius, "y", convertedx);
        var circleMousex = pointToMouse("x", radius, circlex);
        var circleMousey = pointToMouse("y", radius, circley);
        ctx.beginPath();
        ctx.moveTo(radius,radius);
        ctx.lineTo(circleMousex,circleMousey);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(circleMousex,circleMousey);
        ctx.lineTo(circleMousex,radius);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(circleMousex,radius);
        ctx.lineTo(radius,radius);
        ctx.font = "18pt Open Sans Condensed";
        ctx.textBaseline = "bottom";
        ctx.fillStyle = 'blue';
        ctx.textAlign = "start";
        ctx.fillText(sinT, circleMousex, circley/2 + radius-circley);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.fillStyle = 'red';
        ctx.fillText(cosT, circlex/2+radius, radius);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.arc(radius, radius, 30, startAngle, 2*Math.PI-Math.PI/180*thetaDeg, true);
        ctx.stroke();
        ctx.closePath();
      });
    }
  }
  function findPoints(theta, radius, axis, convertedx){
    var p;
    if(axis == "x"){
      p = radius*Math.cos(theta);
      //H*cosƟ = A
    }
    if(axis == "y"){
      p = radius*Math.sin(theta);
      //H*sinƟ = O;
    }
    if(convertedx < 0){
      p=p*-1;
    }
    return p;
  }
  function findTheta(convertedmx, convertedmy){
    //assumes origin is at 0,0
    var t = Math.atan(convertedmy/convertedmx);
    //Ɵ = tan^-1(O/A)
    return t;
  }
  function mouseToPoint(axis, radius, point){
    var converted;
    //radius = max height and width of graph
    if(axis == "x"){
      converted = point - radius;
    }
    if(axis == "y"){
      converted = radius - point;
    }
    return converted;
  }
  function pointToMouse(axis, radius, point){
    var converted;
    if(axis == "x"){
      converted = point + radius;
    }
    if(axis == "y"){
      converted = -point + radius;
      //who knows why this works
    }
    return converted;
  }
  function toDeg(theta, convertedmx, convertedmy){
    theta = theta * 180/Math.PI;
    if(convertedmy< 0){
      if(convertedmx < 0){
        theta += 180;
      }
      else{
        theta += 360;
      }
    }
    else{
      if(convertedmx < 0){
        theta+=180;
      }
    }
    return theta;
  }
    WebFontConfig = {
      google: { families: [ 'Open+Sans+Condensed:300:latin' ] }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();

// Highcharts.chart('container', {
//     chart: {
//         animation: false
//     },
    
//     title: {
//         text: 'Highcharts draggable bubbles demo'
//     },

//     tooltip: {
//         valueDecimals: 2
//     },

//     series: [{
//         type: 'bubble',
//         cursor: 'move',
//         dragDrop: {
//             draggableX: true,
//             draggableY: true
//         },
//         data: [
//             [100, 240, 3],
//             [200, 130, 10],
//             [450, 290, 15]
//         ]
//     }],

//     yAxis: {
//         softMin: 0,
//         softMax: 350
//     }
// });

var renderer;

renderer = new Highcharts.Renderer(
    document.getElementById('container'),
    400,
    300
);
renderer.circle(100, 100, 50).attr({
    fill: 'red',
    stroke: 'black',
    'stroke-width': 1
}).add();
