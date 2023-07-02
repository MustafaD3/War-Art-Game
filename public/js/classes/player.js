import canvasC from "./canvas.js"
export default class playerC extends canvasC{
    constructor(name){
        super()
        this.player = {}
        this.player.name = name
        this.player.score = 0
        this.player.money = 500
        this.player.health = 20
        this.player.selectedGun = {image:document.querySelector("#selected-gun"),price:0,name:""}
    }
}