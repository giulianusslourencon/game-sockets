function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

module.exports = class Deck {
    static baseDeck = [{
            number: "A",
            suit: "Spades"
        },
        {
            number: "2",
            suit: "Spades"
        },
        {
            number: "3",
            suit: "Spades"
        },
        {
            number: "4",
            suit: "Spades"
        },
        {
            number: "5",
            suit: "Spades"
        },
        {
            number: "6",
            suit: "Spades"
        },
        {
            number: "7",
            suit: "Spades"
        },
        {
            number: "8",
            suit: "Spades"
        },
        {
            number: "9",
            suit: "Spades"
        },
        {
            number: "10",
            suit: "Spades"
        },
        {
            number: "J",
            suit: "Spades"
        },
        {
            number: "Q",
            suit: "Spades"
        },
        {
            number: "K",
            suit: "Spades"
        },
        {
            number: "A",
            suit: "Hearts"
        },
        {
            number: "2",
            suit: "Hearts"
        },
        {
            number: "3",
            suit: "Hearts"
        },
        {
            number: "4",
            suit: "Hearts"
        },
        {
            number: "5",
            suit: "Hearts"
        },
        {
            number: "6",
            suit: "Hearts"
        },
        {
            number: "7",
            suit: "Hearts"
        },
        {
            number: "8",
            suit: "Hearts"
        },
        {
            number: "9",
            suit: "Hearts"
        },
        {
            number: "10",
            suit: "Hearts"
        },
        {
            number: "J",
            suit: "Hearts"
        },
        {
            number: "Q",
            suit: "Hearts"
        },
        {
            number: "K",
            suit: "Hearts"
        }, {
            number: "A",
            suit: "Diamonds"
        }, {
            number: "2",
            suit: "Diamonds"
        }, {
            number: "3",
            suit: "Diamonds"
        }, {
            number: "4",
            suit: "Diamonds"
        }, {
            number: "5",
            suit: "Diamonds"
        }, {
            number: "6",
            suit: "Diamonds"
        }, {
            number: "7",
            suit: "Diamonds"
        }, {
            number: "8",
            suit: "Diamonds"
        }, {
            number: "9",
            suit: "Diamonds"
        }, {
            number: "10",
            suit: "Diamonds"
        }, {
            number: "J",
            suit: "Diamonds"
        }, {
            number: "Q",
            suit: "Diamonds"
        }, {
            number: "K",
            suit: "Diamonds"
        },
        {
            number: "A",
            suit: "Clubs"
        }, {
            number: "2",
            suit: "Clubs"
        }, {
            number: "3",
            suit: "Clubs"
        }, {
            number: "4",
            suit: "Clubs"
        }, {
            number: "5",
            suit: "Clubs"
        }, {
            number: "6",
            suit: "Clubs"
        }, {
            number: "7",
            suit: "Clubs"
        }, {
            number: "8",
            suit: "Clubs"
        }, {
            number: "9",
            suit: "Clubs"
        }, {
            number: "10",
            suit: "Clubs"
        }, {
            number: "J",
            suit: "Clubs"
        }, {
            number: "Q",
            suit: "Clubs"
        }, {
            number: "K",
            suit: "Clubs"
        },
    ];
    static decks = number => {
        var arr = [];
        while (number--)
            arr = arr.concat(this.baseDeck);
        return shuffle(arr);
    };
    static buildPiramide = (deck, levels) => {
        var piramide = [];
        for (let i = 1; i <= levels; i++) {
            var piramideLevel = [];
            for (let j = 0; j < i; j++)
                piramideLevel.push(deck.pop());
            piramide.push(piramideLevel);
        }
        return piramide;
    };
    static singleDeal = (deck, n) => {
        var cards = [];
        for (let i = 0; i < n; i++)
            cards.push(deck.pop());
        return cards;
    }
}