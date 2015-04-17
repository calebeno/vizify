Vizify.init({library: "google", type: "timeline", hook: "#timeline"});
Vizify.load({
    columnName: "President",
    rows: [
        ['Washington', new Date(1789, 3, 29), new Date(1797, 2, 3)],
        ['Adams', new Date(1797, 2, 3), new Date(1801, 2, 3)],
        ['Jefferson', new Date(1801, 2, 3), new Date(1809, 2, 3)]
    ]
});