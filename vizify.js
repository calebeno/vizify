//     ICC Vizify 0.1.0
//     http://icctechnology.github.io
//     (c) 2015 Inform atation Control Corperation
//     Vizify may be freely distributed under the MIT license.
var Vizify = {

    loading: true,
    loadingInterval: null,
    chartType: null,
    libType: null,
    hook: null,

    init: function (options) {
        options = options || {};
        this.libType = options.library || "";
        this.chartType = options.type || "";
        this.hook = options.hook || "";
        var self = this;
        if (this.libType === "google") {
            this.loadExt("https://www.google.com/jsapi", function () {
                self.loading = false;
            });
        }
    },

    load: function (data) {
        var self = this;
        this.loadingInterval = setInterval(function () {
            if (!self.loading) {
                self.loadVisualization(data);
            }
        }, 10);
    },

    loadExt: function (url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = function () {
            callback();
        };
    },

    loadVisualization: function (data) {
        var self = this;
        clearInterval(this.loadingInterval);
        google.load("visualization", "1",
            {
                callback: function () {
                    self.loadData(data);
                }, packages: [self.chartType]
            });
    },

    loadData: function (data) {

        var self = this;
        var V = {
            google: {
                timeline: function (data) {
                    var container = document.querySelector(self.hook);
                    var chart = new google.visualization.Timeline(container);
                    var dataTable = new google.visualization.DataTable();
                    dataTable.addColumn({type: 'string', id: data.columnName});
                    dataTable.addColumn({type: 'date', id: 'Start'});
                    dataTable.addColumn({type: 'date', id: 'End'});
                    dataTable.addRows(data.rows);
                    chart.draw(dataTable);
                }
            }
        };
        V[this.libType][this.chartType](data);
    }
};
