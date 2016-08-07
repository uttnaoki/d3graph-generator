var ButtonArea = 1000;
var margin = {
  top: 30,
  right: 40,
  bottom: 30 + ButtonArea,
  left: 40
};
var width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom + ButtonArea,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d;
    });

var svg = d3.select("body")
  .append("svg")
  .attr("width", width).attr("height", height)
  .append("g")
var fkey,ckey;

d3.csv("../../csv/circle_chart.csv", type, function(error, source) {
  if (error) throw error;
  var dkeys = d3.map(source[0]).keys();
  fkey = dkeys.shift();
  ckey = dkeys[0];
  // var data = source[ckey];
  var data=source.map(function(d){
    return d[ckey];
  });

  var g = svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  g.append("path")
    .attr("fill",function(d,i){
      return color(i);
    })
    .attr("d",arc)
    .each(function(d){
      this._current=d;
    })

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d,i) {
        var label = source.map(function(d){
          return d[fkey];
        });
        return label[i];
      });

  function update(){
    var duration_time = 800;

    data=source.map(function(d) {
            return d[ckey];
          });
    svg.selectAll("path")
    .data(pie(data))
    .transition()
    .duration(duration_time)
    .attrTween("d",function(d){
      var interpolate = d3.interpolate(this._current,d);
      this._current = interpolate(0);
      return function(t){
        return arc(interpolate(t));
      }
    })
    svg.selectAll("text")
      .data(pie(data))
      .transition()
      .duration(duration_time)
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
  }

  var button = svg.append("g")
  .attr({
    class: "button",
    transform: "translate(40,40)"
  })
  var button_padding=50;
  var button_width=50;
  button.selectAll(".button_rect")
      .data(dkeys)
      .enter().append("rect")
      .attr({
        class: "button_rect",
        y: function(d,i){
          return i*button_padding;
        },
        width: button_width,
        height: 30,
        fill: "rgb(0,200,80)",
        opacity: 0.5
      })
      .on("click",function(d){
        ckey=d;
        update();
      })
  button.selectAll(".button_text")
      .data(dkeys)
      .enter().append("text")
      .attr({
        class: "button_text",
        x: button_width/2,
        y:function(d,i){
          return i*button_padding;
        },
        "text-anchor": "middle",
        "font-size": 20,
        dy: 20
      })
      .text(function(d){
        return d;
      })
      .on("click",function(d){
        ckey=d;
      })
});

function type(d) {
  var dkeys = d3.map(d).keys();
  dkeys.shift();
  var dlen = dkeys.length;
  for (var i = 0; i < dlen; i++) d[dkeys[i]] = +d[dkeys[i]];
  return d;
}
