import canvasC from "./canvas.js"
export default class bullet extends canvasC{
    constructor(image,x,y,power,monster){
        super()
        this.image = document.querySelector("#"+image)
        this.x = x
        this.y = y
        this.power = power
        this.angle = Math.atan2(
            monster.y - y,
            monster.x - x
        )
        this.velocity = {
            x:Math.cos(this.angle),
            y:Math.sin(this.angle)
        }
    }
    draw = ()=>{
        this.ctx.beginPath()
        this.ctx.drawImage(this.image,this.x - this.gunWidth / 2,this.y-this.gunHeight / 2,25,25)
        this.ctx.closePath()
    }
    update = ()=>{
        this.x += this.velocity.x * 4
        this.y += this.velocity.y * 4
        this.draw()
    }
}