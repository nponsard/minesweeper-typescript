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
                    if (this.number > 0) {

                        numberCt.font = "15px Arial"
                        numberCt.fillStyle = "blue"
                        numberCt.fillText(this.number.toString(), 5, 15)

                    }
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
        clicks = 0
        scene = 1
        winT.style.display = "none"
        looseT.style.display = "none"

        console.log("setting up ...")
        this.grid = []
        let line = []
        this.mines = mines
        this.width = width
        this.height = height
        console.log("generating ...")
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
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

    verify() {
        let sum = 0
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[x][y].state !== 1) sum += 1
            }
        }


        if (sum === this.mines) {
            scene = 2
            winT.style.display = "block"
            winT.style.color = "green"
            this.show()




        }
    }
    check(x: number, y: number) {
        if (this.grid[x][y].state !== 1) {
            this.grid[x][y].state = 1
            if (this.grid[x][y].mine) {
                console.log("game over !")
                scene = 2
                looseT.style.display = "block"
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        if (this.grid[x][y].mine) {
                            this.grid[x][y].state = 1

                        }
                    }
                }
                render()
            } else if (this.grid[x][y].number === 0) {
                if (x !== 0) {
                    this.check(x - 1, y)
                    if (y !== this.height - 1) {
                        this.check(x - 1, y + 1)
                    }
                }
                if (y !== 0) {
                    this.check(x, y - 1)
                    if (x !== 0) {
                        this.check(x - 1, y - 1)
                    }
                    if (x !== this.width - 1) {
                        this.check(x + 1, y - 1)
                    }
                }
                if (x !== this.width - 1) {
                    this.check(x + 1, y)
                }
                if (y !== this.height - 1) {
                    this.check(x, y + 1)
                    if (x !== this.width - 1) {
                        this.check(x + 1, y + 1)
                    }
                }
            }
        }



    }
}
