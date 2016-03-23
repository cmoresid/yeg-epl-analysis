var dc = require('dc');

module.exports = function(ndx, elementId, dateFormat) {
    var self = this;

    self.ndx = ndx;
    self.holdVolumeChart = dc.barChart('#weekly-volume-chart');

    self.moveWeeks = ndx.dimension(function (d) {
      return d.week;
    });

    self.holdsByWeekGroup = self.moveWeeks
      .group()
      .reduceSum(function (d) {
        return d.holds;
      });

    self.init = function() {
      self.holdVolumeChart
        .width(700)
        .height(40)
        .margins({top: 0, right: 0, bottom: 20, left: 65})
        .dimension(self.moveWeeks)
        .group(self.holdsByWeekGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.time.scale().domain([new Date(2015, 1, 1), new Date(2016, 4, 1)]))
        .round(d3.time.week.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.weeks)
        .filterPrinter(function (filters) {
              var filter = filters[0], s = '';
              s += '[' + dateFormat(filter[0]) + ' -> ' + dateFormat(filter[1]) + ']';
              return s;
          })
        .elasticX(true)
        .elasticY(true)
        .xAxis()
        .tickFormat(d3.time.format('%b %y'));
    }

    self.getChart = function() {
        return self.holdVolumeChart;
    }

    return {
        init: self.init,
        getChart: self.getChart
    };
}
