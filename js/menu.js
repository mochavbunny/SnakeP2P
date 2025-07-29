"use strict"

class Menu {
    static #menuMain;
    static #currentMenuPage;
    static #pages = {};

    
    static init() {
        this.#menuMain = document.getElementById("menu-main");
        
        Object.values(Constants.menuPages).forEach((value) => {
            this.#pages[value] = document.getElementById(value);
        });
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