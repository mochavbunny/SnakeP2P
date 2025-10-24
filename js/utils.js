"use strict";

class Utils {
    /**
     * For each direction constant, stores the constant for the opposite direction
     */
    static #oppositeDirections = {
        [Constants.dir.right]: Constants.dir.left,
        [Constants.dir.left]:  Constants.dir.right,
        [Constants.dir.up]:    Constants.dir.down,
        [Constants.dir.down]:  Constants.dir.up
    }


    /**
     * Returns whether the given two directions are opposite
     * @param {string} d0 
     * @param {string} d1 
     * @returns {boolean}
     */
    static areOppositeDirections(d0, d1) {
        return this.#oppositeDirections[d0] === d1;
    }


    /**
     * Get a random integer between two given values.
     * Start and end point inclusive.
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    /**
     * Checks if two given coordinates are equal
     * @param {Array} c0 
     * @param {Array} c1 
     * @returns {boolean}
     */
    static coordsEqual(c0, c1) {
        return (c0[0] === c1[0] && c0[1] === c1[1]);
    }
}