Vue.component('box', {
    props: ['y', 'x'],
    data: () => {
        return {
            status: 2
        }
    },
    template: `
        <div class="col border p-2">
            <i v-if="status === 0" class="fas fa-carrot fa-5x"></i>
            <i v-else-if="status === 1" class="fas fa-cookie fa-5x"></i>
            <i v-else class="far fa-question-circle fa-5x"></i>
        </div>
    `
})

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
            [0, 1, 0],
            [0, 0, 0]
        ]
    },
    methods: {
        getStatus(y, x) {
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                return this.Status[y][x];
            }
            return "error";
        },
        setStatus(y, x) {
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                this.Status[y][x] = 1;
            }
            console.log("HERE");
        }
    },

});