import canvas from "./canvas.js"
export default class monster extends canvas{
    constructor(monster,health){
        super()
        this.goWay = 0
        this.x = 70
        this.y = 0
        this.health = health
        this.goDirectionCount = 0
        this.monsterIcon = monster
        this.way = [
            420,420,210,980,560,210,700,1610,-70
        ]
        this.way
        this.direction = "y"
        this.draw()
    }
    draw = ()=>{
        this.ctx.drawImage(this.monsterIcon,this.x,this.y,this.monsterWidth,this.monsterHeight)
    }
    healthDraw = ()=>{
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.x,this.y + this.monsterHeight + 3,this.health / 1.5,7)
    }
    update = ()=>{
        this.ctx.drawImage(this.monsterIcon,this.x,this.y,this.monsterWidth,this.monsterHeight)
        this.healthDraw()
    }
    moveUpdate(){
        if(this.goDirectionCount >= this.way.length)return
        if(this.direction === "y"){
            if(this.y < this.way[this.goDirectionCount]){
                this.y+=1
                this.goWay+=1
                
                return
            }
            else if(this.y == this.way[this.goDirectionCount]){
                this.direction = "x"
            }
            else {
                this.y-=1
                this.goWay+=1
                return
            }
        }
        else{
            if(this.x < this.way[this.goDirectionCount]){
                this.x+=1
                this.goWay+=1
                return
            }
            else if(this.x == this.way[this.goDirectionCount]){
                this.direction = "y"
            }
            else {
                this.x-=1
                this.goWay+=1
                return
            }
        }
        if(this.goDirectionCount < this.way.length)this.goDirectionCount += 1
        
    }
}