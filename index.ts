
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
f_context.fillStyle = "grey"
f_context.fillRect(0, 0, 19, 19)

size = [20, 20]

let canvas = <HTMLCanvasElement>document.getElementById("cv")
canvas.width = size[0] * 20
canvas.height = size[1] * 20
let context = <CanvasRenderingContext2D>canvas.getContext('2d')






mines = 10



class Case {
    mine: boolean
    state: number
    number: number
    constructor(mine: boolean) {
        this.mine = mine
        this.state = 0
        this.number = 0
    }


    render() {
        switch (this.state) {
            case 2: {
                return f_canvas
                break
            }
            case 1: {
                if (this.mine) {
                    return m_canvas
                } else {
                    let numberC = <HTMLCanvasElement>document.createElement('canvas');
                    numberC.width = 19;
                    numberC.height = 19;
                    let numberCt = <CanvasRenderingContext2D>numberC.getContext('2d');
                    numberCt.fillStyle = "white"
                    numberCt.fillRect(0, 0, 19, 19)
                    numberCt.font = "15px Arial"
                    numberCt.fillStyle = "blue"
                    numberCt.fillText(this.number.toString(), 5, 15 )
                    return numberC
                }
                break
            }
            default: {
                return g_canvas
                break
            }
        }
    }


}



class Grid {
    grid: Array<Array<Case>>
    height: number
    width: number
    mines: number

    constructor(width: number, height: number, mines: number) {
        console.log("setting up ...")
        this.grid = []
        let line = []
        this.mines = mines
        this.width = width
        this.height = height
        console.log("generating ...")
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                line.push(new Case(false))

            }
            this.grid.push(line)
            line = []
        }
        let m = mines
        while (m > 0) {
            let x = Math.floor(Math.random() * width)
            let y = Math.floor(Math.random() * height)
            if (!this.grid[x][y].mine) {
                this.grid[x][y].mine = true
                m -= 1
            }

        }
        console.log("calculating ...")

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.grid[x][y].number = this.neighbours(x, y)

            }
        }




    }
    neighbours(x: number, y: number): number {
        let sum = 0
        if (x !== 0) {
            if (this.grid[x - 1][y].mine) sum += 1
            if (y !== this.height - 1) {
                if (this.grid[x - 1][y + 1].mine) sum += 1
            }
        }
        if (y !== 0) {
            if (this.grid[x][y - 1].mine) sum += 1
            if (x !== 0) {
                if (this.grid[x - 1][y - 1].mine) sum += 1
            }
            if (x !== this.width - 1) {
                if (this.grid[x + 1][y - 1].mine) sum += 1
            }
        }
        if (x !== this.width - 1) {
            if (this.grid[x + 1][y].mine) sum += 1
        }
        if (y !== this.height - 1) {
            if (this.grid[x][y + 1].mine) sum += 1
            if (x !== this.width - 1) {
                if (this.grid[x + 1][y + 1].mine) sum += 1
            }
        }
        return sum
    }
    show() {

        for (let x = 0; x < size[0]; x++) {
            for (let y = 0; y < size[1]; y++) {
                context.drawImage(this.grid[x][y].render(), x * 20, y * 20)
            }
        }

    }
}

let g = new Grid(size[0], size[1], mines)

function render() {
    console.log('rendering ...')
    g.show()




}


canvas.addEventListener("contextmenu", function (e) {

    let x = Math.floor((e.pageX - this.offsetLeft)/20)
    let y = Math.floor((e.pageY - this.offsetTop)/20)
    if(g.grid[x][y].state !== 2 && g.grid[x][y].state !== 1 ) {
        g.grid[x][y].state = 2
    } else if (g.grid[x][y].state !== 1) {
        g.grid[x][y].state = 0
    }
    render()
})

canvas.addEventListener("click", function (e) {

    let x = Math.floor((e.pageX - this.offsetLeft)/20)
    let y = Math.floor((e.pageY - this.offsetTop)/20)
    if(g.grid[x][y].state !== 1) {
        g.grid[x][y].state = 1
    }
    render()

})






render()





