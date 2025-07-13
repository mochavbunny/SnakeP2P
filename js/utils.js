class Utils {
    static #oppositeDirections = {
        "right": "left",
        "left":  "right",
        "up":    "down",
        "down":  "up",
    }


    static areOppositeDirections(d0, d1) {
        return this.#oppositeDirections[d0] === d1;
    }


    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}