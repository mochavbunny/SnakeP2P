"use strict";

class Display {
    constructor(
        width = 800,
        height = 600,
        columns = 20,
        rows = 15,
        squareMarginPercent = 5,
        backgroundColor = "#e0e0e0",
        blankSquareColor = "#c0c0c0",
        filledSquareColor = "#505050"
    ) {
        const canvas = document.getElementById("game-canvas");
        canvas.width = width;
        canvas.height = height;
        this.ctx = canvas.getContext("2d");

        this.width = width;
        this.height = height;

        // These values should be set by the Game class
        this.columns = columns;
        this.rows = rows;

        this.squareWidth = this.width / this.columns;
        this.squareHeight = this.height / this.rows;
        this.squareMarginX = this.squareWidth * (squareMarginPercent / 100);
        this.squareMarginY = this.squareHeight * (squareMarginPercent / 100);

        this.backgroundColor = backgroundColor;
        this.blankSquareColor = blankSquareColor;
        this.filledSquareColor = filledSquareColor;

        //========= FOR TESTING ==========
        let drawTest = document.getElementById("draw-test");
        drawTest.addEventListener("click", () => this.draw());
    }


    draw(e) {
        this.clear();
        this.drawField();
        //this.drawSnake(e.snake);
        //this.drawApple(e.apple);
    }


    drawField() {
        this.drawBackground();

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                this.drawSquare(col, row, this.blankSquareColor);
            }
        }
    }


    drawBackground() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }


    drawSquare(col, row, color) {
        let x = col * this.squareWidth + this.squareMarginX;
        let y = row * this.squareHeight + this.squareMarginY;
        let width = this.squareWidth - (this.squareMarginX * 2);
        let height = this.squareHeight - (this.squareMarginY * 2);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }


    drawSnake(snake) {

    }


    drawApple(apple) {

    }
    

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

new Display();