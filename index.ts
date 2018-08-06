let winT = <HTMLTitleElement>document.getElementById("win")
let looseT = <HTMLTitleElement>document.getElementById("loose")

let numbers: Array<Array<number>>
let mines: number
let size: Array<number>



let m_canvas = <HTMLCanvasElement>document.createElement('canvas');
m_canvas.width = 19;
m_canvas.height = 19;
let m_context = <CanvasRenderingContext2D>m_canvas.getContext('2d');
m_context.fillStyle = "red"
m_context.fillRect(0, 0, 19, 19)

let w_canvas = <HTMLCanvasElement>document.createElement('canvas');
w_canvas.width = 19;
w_canvas.height = 19;
let w_context = <CanvasRenderingContext2D>w_canvas.getContext('2d');
w_context.fillStyle = "white"
w_context.fillRect(0, 0, 19, 19)

let g_canvas = <HTMLCanvasElement>document.createElement('canvas');
g_canvas.width = 19;
g_canvas.height = 19;
let g_context = <CanvasRenderingContext2D>g_canvas.getContext('2d');
g_context.fillStyle = "grey"
g_context.fillRect(0, 0, 19, 19)

let f_canvas = <HTMLCanvasElement>document.createElement('canvas');
f_canvas.width = 19;
f_canvas.height = 19;
let f_context = <CanvasRenderingContext2D>f_canvas.getContext('2d');
f_context.fillStyle = "green"
f_context.fillRect(0, 0, 19, 19)

size = [20, 20]
let scale = 20


let canvas = <HTMLCanvasElement>document.getElementById("cv")
let context = <CanvasRenderingContext2D>canvas.getContext('2d')

function calibrate() {


    canvas.width = size[0] * scale
    canvas.height = size[1] * scale


}

calibrate()

let scene = 1


let clicks = 0

mines = 50
let compteur = <HTMLParagraphElement>document.getElementById("clicks")

let g = new Grid(size[0], size[1], mines)

function render() {

    console.log('rendering ...')
    g.verify()
    g.show()
    compteur.innerHTML = clicks.toString()

}




render()





