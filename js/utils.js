"use strict";

class Utils {
    static #windowMain = document.getElementById("window-main");
    static #windowPages = {
        "game-mode": document.getElementById("game-mode-window"),
        "game-over": document.getElementById("game-over-window")
    }
    static #currentWindowPage;

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


    static showWindow() {
        this.#windowMain.style.display = "block";
    }


    static hideWindow() {
        this.#windowMain.style.display = "none";
    }


    static setWindow(windowPage) {
        if (typeof this.#currentWindowPage !== "undefined") {
            this.#currentWindowPage.style.display = "none";
        }

        this.#currentWindowPage = this.#windowPages[windowPage];
        this.#currentWindowPage.style.display = "block";
    }
}