var d3 = require('d3');
var crossfilter = require('crossfilter');

module.exports = function(data) {
    var self = this;

    self.dateFormat = d3.time.format('%B %d %Y');
    self.data = data;
    self.ndx = null;

    self.transform = function() {
        self.data.forEach(function(d) {
            d.dd = self.dateFormat.parse(d.DATE);
            d.week = d3.time.monday(d.dd);
            d.holds = +d.NUMBER_OF_HOLDS;
            d.title = d["TITLE"].toUpperCase();
        })
    };

    self.getNdx = function() {
      if (self.ndx == null) {
        self.ndx = crossfilter(data);
      }

      return self.ndx;
    };

    self.init = function() {
      self.transform();
      self.ndx = crossfilter(data);
    };

    return {
        init: self.init,
        getNdx: self.getNdx,
        dateFormat: self.dateFormat
    };
};
