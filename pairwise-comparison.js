class Item {

    constructor(value, score) {
        this.value = value;
    }
}

class Pair {

    constructor(item1, item2) {
        this.item1 = item1;
        this.item2 = item2;
        this.winner = null;
    }

    get voted() {
        return this.winner != null;
    }

    _voteFor(item) {
        if (!this.voted) {
            this.winner = item;
            /*let numbers_1 = this.item1.value.filename.match(/\d+/g);
            let concatenatedNumbers_1 = numbers_1.join("");
            let parsedInteger_1 = parseInt(concatenatedNumbers_1, 10);

            let numbers_2 = this.item2.value.filename.match(/\d+/g);
            let concatenatedNumbers_2 = numbers_2.join("");
            let parsedInteger_2 = parseInt(concatenatedNumbers_2, 10);*/

            if (this.isItem1Winner()) {
                results_voted.push(1); // first item is winner so push 1 else 0 (first item -> first element of the pair)
            } else {
                results_voted.push(0)
            }
        }
    }

    voteForItem1() {
        this._voteFor(this.item1);
    }

    voteForItem2() {
        this._voteFor(this.item2);
    }

    isItem1Winner() {
        return this.winner == this.item1;
    }

    isItem2Winner() {
        return this.winner == this.item2;
    }
}