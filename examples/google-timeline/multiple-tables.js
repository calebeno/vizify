//var vizify = new Vizify();
Vizify.init({library: "google", type: "timeline"});
parse({selector: ".testTable", nameIndex: 0, startIndex: 1, endIndex: 2}, function (options) {
    Vizify.load(options)
});

function parse(options, callback) {
    document.addEventListener("DOMContentLoaded", function () { // ensure page loads so selectors have something
        var selector = options.selector;
        var nameIndex = options.nameIndex;
        var startIndex = options.startIndex;
        var endIndex = options.endIndex;
        var tables = document.querySelectorAll(selector);
        for (var t = 0; t < tables.length; t++) {
            var rows = [];
            var table = tables[t];
            var elt = document.createElement("div");
            elt.style.width = "500px";
            elt.style.height = "300px";
            elt.id = "vizDiv" + t;
            insertAfter(table,elt);
            var trs = table.querySelectorAll("tr");

            for (var i = 1; i < trs.length; i++) {
                var tds = trs[i].children;
                var title = tds[nameIndex].innerText;
                var startDate = tds[startIndex].innerText.split('\/');
                var endDate = tds[endIndex].innerText.split('\/');
                var row = [
                    title,
                    new Date(startDate[2], startDate[0], startDate[1]),
                    new Date(endDate[2], endDate[0], endDate[1])
                ];
                rows.push(row);
            }
            var data = {
                columnName: trs[0].children[0].innerText,
                rows: rows
            };

            callback({data: data, hook : "#vizDiv" + t});
        }
    });
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}