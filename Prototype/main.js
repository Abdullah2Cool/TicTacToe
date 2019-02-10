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
            -1, -1, -1,
            -1, -1, -1,
            -1, -1, -1
        ]
    },
    methods: {
        getStatus(y, x) {
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                return this.Status[y * 3 + x];
            }
            return "error";
        },
        setStatus(y, x) {
            if (y > -1 && y < 3 && x > -1 && x < 3) {
                let index = y * 3 + x;
                this.$set(this.Status, index, this.Status[index] + 1);
            }
        }
    },

});