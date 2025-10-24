"use strict";

class Menu {
    /**
     * Stores the DOM object for the main container for the pop-up menu
     */
    static #menuMain;

    /**
     * Stores the DOM objects of the different pages as an object literal
     */
    static #pages = {};

    /**
     * The current page of the menu
     */
    static #currentMenuPage;

    
    /**
     * Retrieves the various HTML elements for the menu as DOM objects
     */
    static init() {
        this.#menuMain = document.getElementById("menu-main");
        
        Object.values(Constants.menuPages).forEach((value) => {
            this.#pages[value] = document.getElementById(value);
        });
    }


    /**
     * Makes the menu visible
     */
    static showMenu() {
        this.#menuMain.style.display = "block";
    }


    /**
     * Makes the menu invisible
     */
    static hideMenu() {
        this.#menuMain.style.display = "none";
    }


    /**
     * Sets the menu's page to the given menu ID
     * @param {string} menuPage 
     */
    static setMenu(menuPage) {
        if (typeof this.#currentMenuPage !== "undefined") {
            this.#currentMenuPage.style.display = "none";
        }

        this.#currentMenuPage = this.#pages[menuPage];
        this.#currentMenuPage.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => Menu.init());