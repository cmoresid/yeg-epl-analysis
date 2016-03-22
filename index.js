require('!style!css!dc/web/css/dc.min.css');
require('!style!css!dc/web/css/bootstrap.min.css');

var dc = require('dc');
var d3 = require('d3');
var crossfilter = require('crossfilter');


var libraryHoldChart = dc.rowChart('#library-hold-chart');
var holdVolumeChart = dc.barChart('#weekly-volume-chart');
var titleHoldVolumeChart = dc.rowChart('#title-hold-chart');

function parseTitle(title) {
  title_components = title.split('/');

  var res = (title_components.length > 1) ?
    title_components[0] : title.substring(0, Math.min(title.length, 15)) + "...";

  return res;
}

d3.csv('data/popular_books_epl.csv', function(data) {
  var dateFormat = d3.time.format('%B %d %Y');

  data.forEach(function (d) {
    d.dd = dateFormat.parse(d.DATE);
    d.week = d3.time.monday(d.dd);
    d.holds = +d.NUMBER_OF_HOLDS;
    d.title = parseTitle(d["TITLE"]).toUpperCase();
  })

  var ndx = crossfilter(data);
  var all = ndx.groupAll();

  var bookTitleDimension = ndx.dimension(function (d) {
    return d.title;
  });

  var holdsByTitle = bookTitleDimension
    .group()
    .reduceSum(function (d) {
      return d.holds;
    });

  var libraryDimension = ndx.dimension(function (d) {
    return d['BRANCH_NAME'];
  });

  var libraryHoldGroup = libraryDimension
    .group()
    .reduceSum(function (d) {
      return d.holds;
    });

  var moveWeeks = ndx.dimension(function (d) {
    return d.week;
  });

  var holdsByWeekGroup = moveWeeks
    .group()
    .reduceSum(function (d) {
      return d.holds;
    });

  libraryHoldChart
    .width(700)
    .height(500)
    .group(libraryHoldGroup)
    .dimension(libraryDimension)
    .elasticX(true)
    .ordering(function (d) {
      return -d.value;
    })

    titleHoldVolumeChart
      .width(600)
      .height(500)
      .group(holdsByTitle)
      .dimension(bookTitleDimension)
      .elasticX(true)
      .rowsCap(11)
      .ordering(function (d) {
        return -d.value;
      });

    holdVolumeChart
      .width(700)
      .height(40)
      .margins({top: 0, right: 50, bottom: 20, left: 40})
      .dimension(moveWeeks)
      .group(holdsByWeekGroup)
      .centerBar(true)
      .gap(1)
      .x(d3.time.scale().domain([new Date(2015, 1, 1), new Date(2016, 4, 1)]))
      .round(d3.time.week.round)
      .alwaysUseRounding(true)
      .xUnits(d3.time.weeks)
      .elasticX(true)
      .elasticY(true);

    holdVolumeChart
          .xAxis()
          .tickFormat(d3.time.format('%b %y'));

    dc.renderAll();
});
