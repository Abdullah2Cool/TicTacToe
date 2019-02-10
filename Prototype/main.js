Vue.component('box', {
    props: ['y', 'x', 'status'],
    data: () => {
        return {
        }
    },
    computed: {
    },
    template: `
        <div class="col border p-2" v-on:click = "$emit('set-status', y, x)">
            <div>
                <i v-if="status === 0" class="fas fa-carrot fa-3x p-5" style="color: crimson"></i>
                <i v-else-if="status === 1" class="fas fa-cookie fa-3x p-5" style="color: blue"></i>
                <i v-else class="far fa-question-circle fa-3x p-5" style="color: white"></i>
            </div>
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
        Board: [
            -1, -1, -1,
            -1, -1, -1,
            -1, -1, -1
        ],
        turn: 0,
        p1Color: "crimson",
        p2Color: "white"
    },
    methods: {
        changeTurn() {
            if (this.turn === 0) {
                this.p1Color = "white";
                this.p2Color = "blue";
                this.turn = 1;
            } else {
                this.p1Color = "crimson";
                this.p2Color = "white"
                this.turn = 0;
            }
        },
        getStatus(y, x) {
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                return this.Board[y * 3 + x];
            }
            return "error";
        },
        setStatus(y, x) {
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                let index = y * 3 + x;
                if (this.Board[index] == -1) {
                    this.$set(this.Board, index, this.turn);
                    this.changeTurn();
                }
            }
        },
        resetGrid() {
            for (let i = 0; i < 9; i++) {
                this.$set(this.Board, i, -1);
            }
        }
    },

});