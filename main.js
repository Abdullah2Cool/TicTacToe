Vue.component('box', {
    props: ['y', 'x', 'status'],
    data: () => {
        return {

        }
    },
    computed: {
    },
    template: `
        <div class="col border rounded p-2"" v-on:click = "$emit('set-status', y, x)">
            <div>
                <i v-if="status === 0" class="fas fa-carrot fa-3x p-3" style="color: crimson"></i>
                <i v-else-if="status === 1" class="fas fa-cookie fa-3x p-3" style="color: blue"></i>
                <i v-else class="far fa-question-circle fa-3x p-3" style="color: white"></i>
            </div>
        </div>
    `
})

let app = new Vue({
    el: "#app",
    data: {
        Board: [
            -1, -1, -1,
            -1, -1, -1,
            -1, -1, -1
        ],
        winPatterns: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        turn: 0,
        p1Color: "crimson",
        p2Color: "white",
        mode: 0,
        gameOver: false,
        winner: -1,
        AIturn: 0
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
        applyMove(y, x) {
            if (this.gameOver) return;
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                let index = y * 3 + x;
                if (this.Board[index] == -1) {
                    this.$set(this.Board, index, this.turn);
                    if (this.checkWin(this.turn)) {
                        console.log("WON: ", this.turn);
                        this.gameOver = true;
                        this.winner = this.turn;
                    } else if (this.checkDraw()) {
                        console.log("DRAW");
                        this.gameOver = true;
                        this.winner = 2;
                    } else {
                        this.changeTurn();
                        if (this.mode === 1 && this.turn === this.AIturn) {
                            this.AImove();
                        }
                    }
                }
            }
        },
        resetGrid() {
            for (let i = 0; i < 9; i++) {
                this.$set(this.Board, i, -1);
            }
        },
        resetGame(mode) {
            this.resetGrid();
            this.changeTurn();
            this.gameOver = false;
            this, winner = -1;
            this.mode = mode;
            if (this.mode === 1 && this.turn === this.AIturn) {
                console.log("HERE");
                this.AImove();
            }
        },
        checkWin(player) {
            let found = true;
            for (pattern of this.winPatterns) {
                found = true;
                for (index of pattern) {
                    if (this.Board[index] != player) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    return true;
                }
            }
            return false;
        },
        checkDraw() {
            for (let i = 0; i < 9; i++) {
                if (this.Board[i] === -1) {
                    return false;
                }
            }
            return true;
        },
        AImove() {
            availableMoves = [];
            for (let i = 0; i < 9; i++) {
                if (this.Board[i] === -1) {
                    availableMoves.push(i);
                }
            }
            let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            this.applyMove(Math.floor(move / 3), Math.floor(move % 3));
        }
    },

});