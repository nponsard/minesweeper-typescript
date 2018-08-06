let minesValue = <HTMLInputElement>document.getElementById("mines")
let widthValue = <HTMLInputElement>document.getElementById("sizeX")
let heightValue = <HTMLInputElement>document.getElementById("sizeY")
//let scaleValue = <HTMLInputElement>document.getElementById("scale")


heightValue.value = size[1].toString()
minesValue.value = mines.toString()
widthValue.value = size[0].toString()
//scaleValue.value = scale.toString()


heightValue.onchange = validateOptions
minesValue.onchange = validateOptions
widthValue.onchange = validateOptions
//scaleValue.onchange = validateOptions

function validateOptions() {

    mines = parseInt(minesValue.value)
    size[0] = parseInt(widthValue.value)
    size[1] = parseInt(heightValue.value)
    // scale = parseInt(scaleValue.value)


}
function restart() {
    validateOptions()
    calibrate()
    g = new Grid(size[0], size[1], mines)
    render()



}












addEventListener("keypress", function (e) {
    if (e.key === ' ') {

        restart()

    }
})

canvas.addEventListener("mousedown", function (e) {
    if (scene === 1) {


        let x = Math.floor((e.pageX - this.offsetLeft - 1) / 20)
        let y = Math.floor((e.pageY - this.offsetTop - 1) / 20)

        if (g.grid[x][y].state !== 2 && g.grid[x][y].state !== 1) {
            g.grid[x][y].state = 2
        } else if (g.grid[x][y].state !== 1) {
            g.grid[x][y].state = 0
        }


        render()
    }
})

canvas.addEventListener("dblclick", function (e) {

    if (scene === 1) {
        clicks += 1
        let x = Math.floor((e.pageX - this.offsetLeft - 1) / 20)
        let y = Math.floor((e.pageY - this.offsetTop - 1) / 20)

        g.check(x, y)
        render()
    }

})
