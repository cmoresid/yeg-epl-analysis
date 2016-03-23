require('!style!css!dc/web/css/dc.min.css');

var dc = require('dc');
var d3 = require('d3');
var crossfilter = require('crossfilter');

var DataTransformer = require('./data.transformer.js');

var TitleHoldVolumeChart = require('./titlechart.js');
var LibraryHoldChart = require('./librarychart.js');
var HoldVolumeChart = require('./holdvolumechart.js')

d3.csv('data/popular_books_epl.csv', function(data) {
    var transformer = new DataTransformer(data);
    transformer.init();

    var ndx = transformer.getNdx();

    var titleHoldVolumeChart = new TitleHoldVolumeChart(ndx, '#title-hold-chart');
    titleHoldVolumeChart.init();

    var libraryHoldChart = new LibraryHoldChart(ndx, '#library-hold-chart');
    libraryHoldChart.init();

    var holdVolumeChart = new HoldVolumeChart(ndx, '#weekly-volume-chart', transformer.dateFormat);
    holdVolumeChart.init();

    dc.renderAll();

    window.titleHoldVolumeChart = titleHoldVolumeChart.getChart();
    window.libraryHoldChart = libraryHoldChart.getChart();
    window.holdVolumeChart = holdVolumeChart.getChart();
});

window.dc = dc;
