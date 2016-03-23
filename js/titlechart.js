var dc = require('dc');

module.exports = function(ndx, elementId) {
    var self = this;

    self.ndx = ndx;
    self.titleHoldVolumeChart = dc.rowChart(elementId);

    self.bookTitleDimension = self.ndx.dimension(function(d) {
        return d.title;
    });

    self.holdsByTitle = self.bookTitleDimension
        .group()
        .reduceSum(function(d) {
            return d.holds;
        });

    self.init = function() {
        self.titleHoldVolumeChart
            .width(500)
            .height(500)
            .group(self.holdsByTitle)
            .dimension(self.bookTitleDimension)
            .elasticX(true)
            .rowsCap(11)
            .ordering(function(d) {
                return -d.value;
            });
    }

    self.getChart = function() {
        return self.titleHoldVolumeChart;
    }

    return {
        init: self.init,
        getChart: self.getChart
    };
}
