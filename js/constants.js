"use strict";

class Constants {
    static columns = 20;
    static rows = 15;
    
    static menuPages = {
        gameMode: "game-mode-menu",
        gameOver: "game-over-menu"
    };

    static gameModes = {
        single: 0,
        multiOnline: 1,
        multiLocal: 2
    };

    static dir = {
        none: 0,
        up: 1,
        down: 2,
        left: 3,
        right: 4
    };

    static collisionFlag = {
        none: 0,
        collision: 1,
        apple: 2
    };
}