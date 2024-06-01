const results_voted = [];
// diagonal is initialized with 0 as well, does not matter for this app, can undo it in later analysis

const app = new Vue({
    el: '#app',
    data: {
        items: [],
        pairs: [],
    },
    methods: {
        addItem: function (value) {
            const newItem = new Item(value);
            for (const item of this.items) {
                this.pairs.push(new Pair(item, newItem));
            }
            this.items.push(newItem);
        },
        download_it: function () {
            let csvContent = results_voted.join(',');
            let blob = new Blob([csvContent], {type: 'text/csv'});

            // Create a temporary download link
            let downloadLink = document.createElement('a');
            downloadLink.download = 'result.csv';
            downloadLink.href = window.URL.createObjectURL(blob);

            // Trigger the download
            downloadLink.click();
        }
    },
    computed: {
        notVotedPairs: function () {
            return this.pairs.filter(pair => !pair.voted);
        },
        nextNotVotedPair: function () {
            return this.notVotedPairs.length > 0 ? this.notVotedPairs[0] : null;
        },
        allPairsVoted: function () {
            return this.pairs.length > 0 && this.notVotedPairs.length == 0;
        }
    },
});

const filereader = document.querySelector('#filereader');
let images = [
               ["photos/Fuß1_SP_1.png", "photos/Fuß1_SP_2.png"],
               ["photos/Fuß1_SP_1.png", "photos/Fuß1_SP_3.png"],
               ["photos/Fuß1_SP_1.png", "photos/Fuß1_SP_4.png"],
               ["photos/Fuß1_SP_1.png", "photos/Fuß1_SP_5.png"]
             ];

filereader.onclick = function () {
    for (var i = 0; i <= 3; i++) { // TODO adjust as need for number of total pairs compared
        var obj_1 = new Object();
        var obj_2 = new Object();
        obj_1.url = images[i][0];
        obj_2.url = images[i][1];

        const newItem_1 = new Item(obj_1)
        const newItem_2 = new Item(obj_2);

        app.pairs.push(new Pair(newItem_1, newItem_2));

    }
};