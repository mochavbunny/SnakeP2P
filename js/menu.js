"use strict"

class Menu {
    static #menuMain = document.getElementById("menu-main");
    static #currentMenuPage;
    static #pages;

    
    static init() {
        this.#pages = {
            [Constants.menuPages.gameMode]: document.getElementById(Constants.menuPages.gameMode),
            [Constants.menuPages.gameOver]: document.getElementById(Constants.menuPages.gameOver)
        }
    }


    static showMenu() {
        this.#menuMain.style.display = "block";
    }


    static hideMenu() {
        this.#menuMain.style.display = "none";
    }


    static setMenu(menuPage) {
        if (typeof this.#currentMenuPage !== "undefined") {
            this.#currentMenuPage.style.display = "none";
        }

        this.#currentMenuPage = this.#pages[menuPage];
        this.#currentMenuPage.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => Menu.init());