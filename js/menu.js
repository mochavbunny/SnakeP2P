"use strict"

class Menu {
    static #menuMain = document.getElementById("menu-main");
    static #currentMenuPage;

    
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

        this.#currentMenuPage = menuPage;
        this.#currentMenuPage.style.display = "block";
    }
}