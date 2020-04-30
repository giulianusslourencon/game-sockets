// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var Deck = require('./utils/deck');

app.use(express.static(path.join(__dirname, 'public')));

var numUsers = 0;
var usersSockets = [];

var inGame = false;
var deckNumbers = 1;

io.on('connection', (socket) => {
    console.log('User connected')
    var addedUser = false;

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;
        console.log(username + ' just logged in')

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        usersSockets.push(socket);
    });

    socket.on('deal', (levels) => {
        if (!inGame) {
            deckNumbers = Math.ceil((numUsers * 4 + (levels + 1) * levels / 2) / 52);
            // console.log('Using %d decks for %d users and %d levels', deckNumbers, numUsers, levels);
            var deck = Deck.decks(deckNumbers);
            // console.log(deck);
            var piramide = Deck.buildPiramide(deck, levels);
            // console.log(piramide);
            // console.log(deck);
            usersSockets.forEach(user => {
                var userCards = Deck.singleDeal(deck, 4);
                console.log(user.username, userCards);
                user.emit('deal', {
                    piramide: piramide,
                    cards: userCards
                });
            })
        }
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            console.log(socket.username + ' just logged out');
            --numUsers;
            usersSockets.splice(usersSockets.indexOf(socket), 1);
        }
    });
});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});