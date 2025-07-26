"use strict";

class Constants {
    static columns = 20;
    static rows = 15;
    static menuPage;
}

document.addEventListener("DOMContentLoaded", () => {
    Constants.menuPage = {
        gameMode: document.getElementById("game-mode-menu"),
        gameOver: document.getElementById("game-over-menu")
    }
});