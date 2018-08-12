function addMod(location: string) {
    let script = document.createElement("script")
    script.src = location
    document.body.appendChild(script)


}