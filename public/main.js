$(function () {
    // Initialize variables
    var $window = $(window);

    var $loginPage = $('.login.page'); // The login page
    var $chatPage = $('.chat.page'); // The chatroom page

    var $usernameInput = $('.usernameInput'); // Input for username

    var $levelsInput = $('#levels');
    var $dealButton = $('#deal');

    // Prompt for setting a username
    var username;
    var connected = false;
    var $currentInput = $usernameInput.focus();

    // Prompt for the game
    var levels;
    var cards = 4;

    var socket = io();

    // Sets the client's username
    const setUsername = () => {
        username = $usernameInput.val().trim();
        $usernameInput.val('');

        // If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            // $currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit('add user', username);
        }
    }

    const dealCards = () => {
        levels = parseInt($levelsInput.val());
        socket.emit('deal', levels);
    }

    // Keyboard events

    $window.keydown(event => {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if (!username) {
                setUsername();
            }
        }
    });

    // Click events

    // Focus input when clicking anywhere on login page
    $loginPage.click(() => {
        $currentInput.focus();
    });

    socket.on('disconnect', () => {
        alert('you have been disconnected');
    });

    socket.on('reconnect', () => {
        alert('you have been reconnected');
        if (username) {
            socket.emit('add user', username);
        }
    });

    socket.on('reconnect_error', () => {
        alert('attempt to reconnect has failed');
    });

    // Events
    $dealButton.on('click', dealCards);

});