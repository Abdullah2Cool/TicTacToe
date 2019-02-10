let app = new Vue({
    el: "#app",
    data: {
        Grid: [
            ["top-left", "top-center", "top-right"],
            ["center-left", "center-center", "center-right"],
            ["bottom-left", "bottom-center", "bottom-right"]
        ],
        Status: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    }
});