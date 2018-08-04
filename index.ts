
let grid: Array<Array<boolean>>
let numbers: Array<Array<number>>
let mines: number
let size: Array<number>



let b_canvas = <HTMLCanvasElement>document.createElement('canvas');
b_canvas.width = 20;
b_canvas.height = 20;
let b_context = <CanvasRenderingContext2D>b_canvas.getContext('2d');
b_context.fillStyle = "black"
b_context.fillRect(0,0,19,19)

let w_canvas = <HTMLCanvasElement>document.createElement('canvas');
w_canvas.width = 20;
w_canvas.height = 20;
let w_context = <CanvasRenderingContext2D>w_canvas.getContext('2d');
w_context.fillStyle = "white"
w_context.fillRect(0,0,19,19)



size = [20, 20]

let canvas = <HTMLCanvasElement>document.getElementById("cv")
canvas.width = size[0]*20
canvas.height = size[1]*20
let context= <CanvasRenderingContext2D>canvas.getContext('2d')


context.drawImage(w_canvas,0,0)
context.drawImage(b_canvas,20,20)




mines = 10

function setup() {
    for (let x = 0; x < size[0]; x++) {
        for (let y = 0; y < size[1]; y++) {
            grid[x][y]=false
        }
    }
    for (let m = mines; m > 0; m--) {
        let x = Math.floor(Math.random() * size[0])
        let y = Math.floor(Math.random() * size[1])
        if(!grid[x][y]){
            grid[x][y] = true
        }
    }
}






function update() {
    for (let x = 0; x < size[0]; x++) {
        for (let y = 0; y < size[1]; y++) {
            
        }
    }


}

