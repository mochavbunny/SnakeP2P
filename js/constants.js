"use strict";

class Constants {
    /**
     * The number of columns in the grid
     */
    static columns = 20;

    /**
     * The number of rows in the grid
     */
    static rows = 15;

    /**
     * The base number of milliseconds between game cycles
     */
    static updateRate = 250;
    
    /**
     * Enum for the pages of the pop-up menu
     */
    static menuPages = {
        gameMode: "game-mode-menu",
        gameOver: "game-over-menu"
    };

    /**
     * Enum for the various game modes.
     * There are two multiplayer modes, one is the default online mode
     * The other is a local version meant for testing having multiple snakes on the field and should be disabled on production builds. 
     */
    static gameModes = {
        single: 0,
        multiOnline: 1,
        multiLocal: 2
    };

    /**
     * Enum for direction of the snakes
     */
    static dir = {
        none: 0,
        up: 1,
        down: 2,
        left: 3,
        right: 4
    };

    /**
     * Used by check
     */
    static collisionFlag = {
        none: 0,
        collision: 1,
        apple: 2
    };
}