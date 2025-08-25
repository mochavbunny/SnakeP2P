"use strict";

class Utils {
    static #oppositeDirections = {
        [Constants.dir.right]: Constants.dir.left,
        [Constants.dir.left]:  Constants.dir.right,
        [Constants.dir.up]:    Constants.dir.down,
        [Constants.dir.down]:  Constants.dir.up
    }


    static areOppositeDirections(d0, d1) {
        return this.#oppositeDirections[d0] === d1;
    }


    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    static coordsEqual(c0, c1) {
        return (c0[0] === c1[0] && c0[1] === c1[1]);
    }
}