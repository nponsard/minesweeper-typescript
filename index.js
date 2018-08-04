"use strict";
var grid;
var numbers;
var mines;
var size;
var b_canvas = document.createElement('canvas');
b_canvas.width = 20;
b_canvas.height = 20;
var b_context = b_canvas.getContext('2d');
b_context.fillStyle = "black";
b_context.fillRect(0, 0, 19, 19);
var w_canvas = document.createElement('canvas');
w_canvas.width = 20;
w_canvas.height = 20;
var w_context = w_canvas.getContext('2d');
w_context.fillStyle = "white";
w_context.fillRect(0, 0, 19, 19);
size = [20, 20];
var canvas = document.getElementById("cv");
canvas.width = size[0] * 20;
canvas.height = size[1] * 20;
var context = canvas.getContext('2d');
context.drawImage(w_canvas, 0, 0);
context.drawImage(b_canvas, 20, 20);
mines = 10;
function setup() {
    for (var x = 0; x < size[0]; x++) {
        for (var y = 0; y < size[1]; y++) {
            grid[x][y] = false;
        }
    }
    for (var m = mines; m > 0; m--) {
        var x = Math.floor(Math.random() * size[0]);
        var y = Math.floor(Math.random() * size[1]);
        if (!grid[x][y]) {
            grid[x][y] = true;
        }
    }
}
function update() {
    for (var x = 0; x < size[0]; x++) {
        for (var y = 0; y < size[1]; y++) {
        }
    }
}
