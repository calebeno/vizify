describe('vizify `to exist`', function () {
    it('should be defined globally', function () {
        expect(Vizify).toBeDefined();
    });
});

describe('vizify loadExt', function () {
    it('should load an external file', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        spyOn(Vizify, "loadExt");
        Vizify.init(options);
        expect(Vizify.loadExt).toHaveBeenCalled();
    });
});

describe('vizify load', function () {
    it('should create a set an interval', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        spyOn(window, "setInterval").and.callThrough();
        Vizify.loading = false;
        Vizify.load({});
        expect(window.setInterval).toHaveBeenCalled();
    });
});


describe('vizify loadExt', function () {
    it('should create a script element', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        var tmpScript = document.createElement("script");
        spyOn(document, "createElement").and.callFake(function () {
            return tmpScript;
        });
        Vizify.loadExt("", function () {
        });
        expect(document.createElement).toHaveBeenCalled();
    });
});

describe('vizify visualization', function () {
    it('should clear an interval', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        window["google"] = {load: function () {
        }};
        spyOn(window, "clearInterval");
        Vizify.loadVisualization({});
        expect(window.clearInterval).toHaveBeenCalled();
    });

});

describe('vizify load data', function () {
    it('should add columns and rows', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        window.google = {};
        window.google.visualization = {};
        window.google.visualization.Timeline = function (){};
        window.google.visualization.Timeline.prototype.draw = function() {};
        window.google.visualization.DataTable = function (){};
        window.google.visualization.DataTable.prototype.addColumn = function(a){};
        window.google.visualization.DataTable.prototype.addRows = function(a){};
        spyOn(window.google.visualization.Timeline.prototype , "draw");
        Vizify.loadData({columnName: "foo", rows: [1, 2, 3]});
        expect(window.google.visualization.Timeline.prototype.draw).toHaveBeenCalled();
    });
});