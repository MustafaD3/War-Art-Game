import canvasC from "./canvas.js"
export default class mapC extends canvasC{
    constructor(){
        super()
        this.background()
        this.block = 70
        this.mapX = [
            this.block * 1,this.block * 1,this.block * 1,this.block * 1,this.block * 1,
            this.block * 1,this.block * 1,this.block * 1,this.block * 2,this.block * 3,
            this.block * 4,this.block * 5,this.block * 6,this.block * 6,this.block * 6,
            this.block * 6,this.block * 7,this.block * 8,this.block * 9,this.block * 10,
            this.block * 11,this.block * 12,this.block * 13,this.block * 14,this.block * 14,
            this.block * 14,this.block * 14,this.block * 14,this.block * 14,this.block * 13,
            this.block * 12,this.block * 11,this.block * 10,this.block * 9,this.block * 8,
            this.block * 7,this.block * 6,this.block * 5,this.block * 4,this.block * 3,
            this.block * 3,this.block * 3,this.block * 4,this.block * 5,this.block * 6,
            this.block * 7,this.block * 8,this.block * 9,this.block * 10,this.block * 11,
            this.block * 12,this.block * 13,this.block * 14,this.block * 15,this.block * 16,
            this.block * 17,this.block * 18,this.block * 19,this.block * 20,this.block * 21,
            this.block * 22,this.block * 23,this.block * 23,this.block * 23,this.block * 23,
            this.block * 23,this.block * 23,this.block * 23,this.block * 23,this.block * 23,
            this.block * 23,this.block * 23

        ]
        this.mapY = [
            0,this.block * 1,this.block * 2,this.block * 3,this.block * 4,
            this.block * 5,this.block * 6,this.block * 6,this.block * 6,this.block * 6,
            this.block * 6,this.block * 6,this.block * 6,this.block * 5,this.block * 4,
            this.block * 3,this.block * 3,this.block * 3,this.block * 3,this.block * 3,
            this.block * 3,this.block * 3,this.block * 3,this.block * 3,this.block * 4,
            this.block * 5,this.block * 6,this.block * 7,this.block * 8,this.block * 8,
            this.block * 8,this.block * 8,this.block * 8,this.block * 8,this.block * 8,
            this.block * 8,this.block * 8,this.block * 8,this.block * 8,this.block * 8,
            this.block * 9,this.block * 10,this.block * 10,this.block * 10,this.block * 10,
            this.block * 10,this.block * 10,this.block * 10,this.block * 10,this.block * 10,
            this.block * 10,this.block * 10,this.block * 10,this.block * 10,this.block * 10,this.block * 10,
            this.block * 10,this.block * 10,this.block * 10,this.block * 10,this.block * 10,this.block * 10,
            this.block * 9,this.block * 8,this.block * 7,this.block * 6,this.block * 5,this.block * 4,this.block * 3,
            this.block * 2,this.block * 1,0
        ]
        this.way()
    }
    background = ()=>{
        const image = document.querySelector("#background")
        this.ctx.beginPath()
        this.ctx.drawImage(image,0,0,this.canvas.width,this.canvas.height)
    }
    way = ()=>{
        let x = this.block
        let y = 0
        let direction = "y"
        for(let i = 0;i< this.mapY.length;i++){
            this.ctx.beginPath()
            this.ctx.drawImage(this.dirt,this.mapX[i],this.mapY[i],this.block,this.block)
            this.dirtCount++
            this.ctx.closePath()
        }
        direction === "y" ? y+=this.block : x+=this.block
    }
}