const my2DArray = Array.from(Array(4), () => new Array(4).fill(0));
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
            let csvContent = my2DArray.map(row => row.join(',')).join('\n');
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
let images = [];

filereader.onclick = function () {
    for (var i = 0; i <= 1; i++) { // TODO adjust as need for number of images
        var obj = new Object();
        obj.filename=`testimg_${i}`; // TODO adjust name
        obj.url = "photos/testimg_" + i + ".png"; // TODO adjust path, name + suffix
        app.addItem(obj);
    }
};