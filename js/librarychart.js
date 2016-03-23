var dc = require('dc');

module.exports = function(ndx, elementId) {
    var self = this;

    self.ndx = ndx;
    self.libraryHoldChart = dc.rowChart(elementId);

    self.libraryDimension = ndx.dimension(function (d) {
      return d['BRANCH_NAME'];
    });

    self.libraryHoldGroup = self.libraryDimension
      .group()
      .reduceSum(function (d) {
        return d.holds;
      });

    self.init = function() {
        self.libraryHoldChart
            .width(700)
            .height(500)
            .margins({top: 0, right: 0, bottom: 20, left: 40})
            .group(self.libraryHoldGroup)
            .dimension(self.libraryDimension)
            .elasticX(true)
            .ordering(function (d) {
              return -d.value;
            });
    }

    self.getChart = function() {
        return self.libraryHoldChart;
    }

    return {
        init: self.init,
        getChart: self.getChart
    };
}
