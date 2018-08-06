"use strict";
class Case {
    constructor(mine) {
        this.mine = mine;
        this.state = 0;
        this.number = 0;
    }
    render() {
        switch (this.state) {
            case 2: {
                return f_canvas;
                break;
            }
            case 1: {
                if (this.mine) {
                    return m_canvas;
                }
                else {
                    let numberC = document.createElement('canvas');
                    numberC.width = 19;
                    numberC.height = 19;
                    let numberCt = numberC.getContext('2d');
                    numberCt.fillStyle = "white";
                    numberCt.fillRect(0, 0, 19, 19);
                    if (this.number > 0) {
                        numberCt.font = "15px Arial";
                        numberCt.fillStyle = "blue";
                        numberCt.fillText(this.number.toString(), 5, 15);
                    }
                    return numberC;
                }
                break;
            }
            default: {
                return g_canvas;
                break;
            }
        }
    }
}
class Grid {
    constructor(width, height, mines) {
        clicks = 0;
        scene = 1;
        winT.style.display = "none";
        looseT.style.display = "none";
        console.log("setting up ...");
        this.grid = [];
        let line = [];
        this.mines = mines;
        this.width = width;
        this.height = height;
        console.log("generating ...");
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                line.push(new Case(false));
            }
            this.grid.push(line);
            line = [];
        }
        let m = mines;
        while (m > 0) {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            if (!this.grid[x][y].mine) {
                this.grid[x][y].mine = true;
                m -= 1;
            }
        }
        console.log("calculating ...");
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.grid[x][y].number = this.neighbours(x, y);
            }
        }
    }
    neighbours(x, y) {
        let sum = 0;
        if (x !== 0) {
            if (this.grid[x - 1][y].mine)
                sum += 1;
            if (y !== this.height - 1) {
                if (this.grid[x - 1][y + 1].mine)
                    sum += 1;
            }
        }
        if (y !== 0) {
            if (this.grid[x][y - 1].mine)
                sum += 1;
            if (x !== 0) {
                if (this.grid[x - 1][y - 1].mine)
                    sum += 1;
            }
            if (x !== this.width - 1) {
                if (this.grid[x + 1][y - 1].mine)
                    sum += 1;
            }
        }
        if (x !== this.width - 1) {
            if (this.grid[x + 1][y].mine)
                sum += 1;
        }
        if (y !== this.height - 1) {
            if (this.grid[x][y + 1].mine)
                sum += 1;
            if (x !== this.width - 1) {
                if (this.grid[x + 1][y + 1].mine)
                    sum += 1;
            }
        }
        return sum;
    }
    show() {
        for (let x = 0; x < size[0]; x++) {
            for (let y = 0; y < size[1]; y++) {
                context.drawImage(this.grid[x][y].render(), x * 20, y * 20);
            }
        }
    }
    verify() {
        let sum = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[x][y].state !== 1)
                    sum += 1;
            }
        }
        if (sum === this.mines) {
            scene = 2;
            winT.style.display = "block";
            winT.style.color = "green";
            this.show();
        }
    }
    check(x, y) {
        if (this.grid[x][y].state !== 1) {
            this.grid[x][y].state = 1;
            if (this.grid[x][y].mine) {
                console.log("game over !");
                scene = 2;
                looseT.style.display = "block";
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        if (this.grid[x][y].mine) {
                            this.grid[x][y].state = 1;
                        }
                    }
                }
                render();
            }
            else if (this.grid[x][y].number === 0) {
                if (x !== 0) {
                    this.check(x - 1, y);
                    if (y !== this.height - 1) {
                        this.check(x - 1, y + 1);
                    }
                }
                if (y !== 0) {
                    this.check(x, y - 1);
                    if (x !== 0) {
                        this.check(x - 1, y - 1);
                    }
                    if (x !== this.width - 1) {
                        this.check(x + 1, y - 1);
                    }
                }
                if (x !== this.width - 1) {
                    this.check(x + 1, y);
                }
                if (y !== this.height - 1) {
                    this.check(x, y + 1);
                    if (x !== this.width - 1) {
                        this.check(x + 1, y + 1);
                    }
                }
            }
        }
    }
}
let winT = document.getElementById("win");
let looseT = document.getElementById("loose");
let numbers;
let mines;
let size;
let m_canvas = document.createElement('canvas');
m_canvas.width = 19;
m_canvas.height = 19;
let m_context = m_canvas.getContext('2d');
m_context.fillStyle = "red";
m_context.fillRect(0, 0, 19, 19);
let w_canvas = document.createElement('canvas');
w_canvas.width = 19;
w_canvas.height = 19;
let w_context = w_canvas.getContext('2d');
w_context.fillStyle = "white";
w_context.fillRect(0, 0, 19, 19);
let g_canvas = document.createElement('canvas');
g_canvas.width = 19;
g_canvas.height = 19;
let g_context = g_canvas.getContext('2d');
g_context.fillStyle = "grey";
g_context.fillRect(0, 0, 19, 19);
let f_canvas = document.createElement('canvas');
f_canvas.width = 19;
f_canvas.height = 19;
let f_context = f_canvas.getContext('2d');
f_context.fillStyle = "green";
f_context.fillRect(0, 0, 19, 19);
size = [20, 20];
let scale = 20;
let canvas = document.getElementById("cv");
let context = canvas.getContext('2d');
function calibrate() {
    canvas.width = size[0] * scale;
    canvas.height = size[1] * scale;
}
calibrate();
let scene = 1;
let clicks = 0;
mines = 50;
let compteur = document.getElementById("clicks");
let g = new Grid(size[0], size[1], mines);
function render() {
    console.log('rendering ...');
    g.verify();
    g.show();
    compteur.innerHTML = clicks.toString();
}
render();
let minesValue = document.getElementById("mines");
let widthValue = document.getElementById("sizeX");
let heightValue = document.getElementById("sizeY");
//let scaleValue = <HTMLInputElement>document.getElementById("scale")
heightValue.value = size[1].toString();
minesValue.value = mines.toString();
widthValue.value = size[0].toString();
//scaleValue.value = scale.toString()
heightValue.onchange = validateOptions;
minesValue.onchange = validateOptions;
widthValue.onchange = validateOptions;
//scaleValue.onchange = validateOptions
function validateOptions() {
    mines = parseInt(minesValue.value);
    size[0] = parseInt(widthValue.value);
    size[1] = parseInt(heightValue.value);
    // scale = parseInt(scaleValue.value)
}
function restart() {
    validateOptions();
    calibrate();
    g = new Grid(size[0], size[1], mines);
    render();
}
addEventListener("keypress", function (e) {
    if (e.key === ' ') {
        restart();
    }
});
canvas.addEventListener("mousedown", function (e) {
    if (scene === 1) {
        let x = Math.floor((e.pageX - this.offsetLeft - 1) / 20);
        let y = Math.floor((e.pageY - this.offsetTop - 1) / 20);
        if (g.grid[x][y].state !== 2 && g.grid[x][y].state !== 1) {
            g.grid[x][y].state = 2;
        }
        else if (g.grid[x][y].state !== 1) {
            g.grid[x][y].state = 0;
        }
        render();
    }
});
canvas.addEventListener("dblclick", function (e) {
    if (scene === 1) {
        clicks += 1;
        let x = Math.floor((e.pageX - this.offsetLeft - 1) / 20);
        let y = Math.floor((e.pageY - this.offsetTop - 1) / 20);
        g.check(x, y);
        render();
    }
});
