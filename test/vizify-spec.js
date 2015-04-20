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

describe('vizify googleLoadedEvent', function () {
    it('should dispatch an event', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        spyOn(document, "dispatchEvent");
        Vizify.googleLoadedEvent();
        expect(document.dispatchEvent).toHaveBeenCalled();
    });
});

describe('vizify googleLoadedSubscribe', function () {
    it('should call googleLoadedSubscribe method', function () {
        var options = {
            library: "google",
            type: "timeline",
            hook: "someClass"
        };
        spyOn(Vizify, "loadVisualization");
        Vizify.googleLoadedSubscribe();
        expect(Vizify.loadVisualization).toHaveBeenCalled();

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

describe('vizify load', function () {
    it('should push to hooks and data array', function () {
        var options = {
            library: "google",
            type: "timeline"
        };
        spyOn(Vizify.data, "push");
        spyOn(Vizify.hooks, "push");
        Vizify.init(options);
        Vizify.load({data: {}, hooks: {}});
        expect(Vizify.data.push).toHaveBeenCalled();
        expect(Vizify.hooks.push).toHaveBeenCalled();
    });
});

describe('vizify loadVisualization', function () {
    it('should load google visualization', function () {
        var options = {
            library: "google",
            type: "timeline"
        };
        window.google = {};
        window.google.load = function () {
        }
        spyOn(window.google, "load");
        Vizify.init(options);
        Vizify.loadVisualization();
        expect(window.google.load).toHaveBeenCalled();
    });
});

describe('vizify loadData', function () {
    it('should call a function based on names', function () {
        var options = {
            library: "google",
            type: "timeline"
        };
        Vizify.init(options);
        Vizify.load({data: {}, hook: "#time"});
        spyOn(Vizify, "renderGoogleTimeline");
        Vizify.loadData();
        expect(Vizify.renderGoogleTimeline).toHaveBeenCalled();

    });
});


describe('vizify renderGoogleTimeline', function () {
    it('should call render a google timeline', function () {
        var options = {
            library: "google",
            type: "timeline"
        };
        Vizify.init(options);
        Vizify.load({data: {}, hook: "#time"});
        window.google = {};
        window.google.visualization = {};
        window.google.visualization.Timeline = function () {
        };
        window.google.visualization.Timeline.prototype.draw = function () {
        };
        window.google.visualization.DataTable = function () {
        };
        window.google.visualization.DataTable.prototype.addColumn = function (a) {
        };
        window.google.visualization.DataTable.prototype.addRows = function (a) {
        };
        spyOn(window.google.visualization.Timeline.prototype, "draw");
        Vizify.renderGoogleTimeline([{columnName: "test", rows: [1, 2, 3]}], ["#time"]);
        expect(window.google.visualization.Timeline.prototype.draw).toHaveBeenCalled();

    });
});