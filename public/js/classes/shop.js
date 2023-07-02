import bullet from "./bullet.js"
import playerC from "./player.js"
export default class shopC extends playerC{
    constructor(name,monsters){
        super(name)
        this.guns = [{
            name:"Düşük Seviye Kuleler",
            guns:[
                {name:"Tower 1",image:"tower-1.png",price:250,power:50,range:200},
                {name:"Tower 2",image:"tower-2.png",price:450,power:100,range:250},
                
            ]
        }
        ,
        {
            name:"Orta Seviye Kuleler",
            guns:[{name:"Tower 3",image:"tower-3.gif",price:850,power:150,range:350}]
        }
        ]
        this.buyGuns = []
        this.bullets = []
        this.intervals = []
        this.monsters = monsters
        this.shopWindow()
        this.gunBuyEvent()
    }
    //Window Create
    shopWindow = ()=>{
        const container = document.createElement("div")
        //Player
        const player = document.createElement("h1")
        player.innerHTML = "Oyuncu:"+this.player.name
        player.id = "user"
        //Player
        this.healthElement = document.createElement("h1")
        this.healthElement.innerHTML = "Can:"+this.player.health
        this.healthElement.id = "health"
        //Money
        this.moneyElement = document.createElement("h1")
        this.moneyElement.innerHTML = "Para:"+this.player.money
        this.moneyElement.id = "id"
        //Close And Open Icon
        const closeAndOpenIcon = document.createElement("i")
        closeAndOpenIcon.classList.add("fa-window-close","fas","icon")
        closeAndOpenIcon.style.color = "white"
        //Close And Open Icon Event
        closeAndOpenIcon.addEventListener("click",()=>{
            if(container.classList.contains("close")){
                container.classList.remove("close")
                closeAndOpenIcon.classList.add("fa-window-close","fas")
                closeAndOpenIcon.classList.remove("fa-solid","fa-bars")
                
            }
            else{
                container.classList.add("close")
                closeAndOpenIcon.classList.remove("fa-window-close","fas")
                closeAndOpenIcon.classList.add("fa-solid","fa-bars")
            }
        })
        container.id = "shop-window"
        container.append(player,this.healthElement,this.moneyElement,this.gunUI(),closeAndOpenIcon)
        document.body.append(container)
    }
    //Guns UI
    gunUI = ()=>{
        //All Gun Container Element
        const gunsContainer = document.createElement("div")
        gunsContainer.classList.add("guns")
        for(const x of this.guns){
            //Gun Category Container Element
            const gunCategoryContainer = document.createElement("div")
            gunCategoryContainer.classList.add("gun-category")
            for(const [key,value] of Object.entries(x.guns)){
                if(Object.keys(value).length > 0){
                    //Gun Container Element
                    const gunContainer = document.createElement("div")
                    gunContainer.classList.add("gun")
                    gunContainer.addEventListener("click",this.gunEvent)
                    //Gun Element
                    const gun = document.createElement("img")
                    gun.src = "/public/image/"+value.image
                    //Gun Name Element
                    const gunName = document.createElement("span")
                    gunName.innerHTML = value.name
                    //Gun Price Element
                    const gunPrice = document.createElement("span")
                    gunPrice.innerHTML = "Fiyat:"+value.price
                    gunPrice.setAttribute("price",value.price)
                    //Gun Power Element
                    const gunPower = document.createElement("span")
                    gunPower.innerHTML = "Güç:"+value.power
                    gunPower.setAttribute("power",value.power)
                     //Gun Power Element
                     const gunRange = document.createElement("span")
                     gunRange.innerHTML = "Alan:"+value.range
                     gunRange.setAttribute("range",value.range)
                    //Append Gun container
                    gunContainer.append(gun,gunName,gunPrice,gunPower,gunRange)
                    //Append Guns container
                    gunCategoryContainer.append(gunContainer)
                }
            }
            const title = document.createElement("h3")
            title.classList.add("title")
            title.innerHTML = x.name
            gunsContainer.append(title,gunCategoryContainer)
        }
        return gunsContainer
    }
    //Gun Select Event
    gunEvent = (event)=>{
        if(this.player.selectedGun.name === event.target.children[1].innerHTML){
            this.player.selectedGun.image.src = ""
            this.player.selectedGun.image.style.display = "none"
            this.player.selectedGun.image.setAttribute("data","")
            this.player.selectedGun.name = ""
            this.player.selectedGun.price = 0
            return
        }
        this.player.selectedGun.image.src = event.target.children[0].getAttribute("src")
        this.player.selectedGun.image.setAttribute("data","gun")
        this.player.selectedGun.name = event.target.children[1].innerHTML
        this.player.selectedGun.price = Number(event.target.children[2].getAttribute("price"))
        this.player.selectedGun.power = Number(event.target.children[3].getAttribute("power"))
        this.player.selectedGun.range = Number(event.target.children[4].getAttribute("range"))
    }
    //Gun Buy Event
    gunBuyEvent = ()=>{
        this.canvas.addEventListener("click",(e)=>{
            if(this.player.selectedGun.image.getAttribute("data") && this.player.selectedGun.image.getAttribute("state") == "true"  && this.player.selectedGun.price <= this.player.money){
                this.gunBuy(window.imageX,window.imageY)
            }
        })
    }
    //Gun Buy
    gunBuy = (x,y)=>{
        this.ctx.drawImage(this.player.selectedGun.image,x,y,this.gunWidth,this.gunHeight)
        this.buyGuns.push({image:this.player.selectedGun.image.getAttribute("src"),x,y,width:this.gunWidth,height:this.gunHeight,angle:180,bullet:"bullet",range:this.player.selectedGun.range})
        this.player.money -= this.player.selectedGun.price
        this.bullet(x,y,this.player.selectedGun.power,this.player.selectedGun.range)
        this.updateArcGun({x:x,y:y,width:this.gunWidth,height:this.gunHeight,range:this.player.selectedGun.range})
        this.updateMoney()
    }
    //Update All Gun
    updateGun = ()=>{
        for(const x of this.buyGuns){
            const gunImage = document.createElement("img")
            gunImage.src = x.image
            this.ctx.save()
            this.ctx.translate(x.x + x.width / 2 ,x.y + x.height / 2)
            this.ctx.drawImage(gunImage,0 - x.width / 2,0 - x.height / 2,x.width,x.height)
            this.ctx.restore()
            this.updateArcGun(x)
        }
        this.updateMoney()
        this.updateHealth()
    }
    //Update Gun Range
    updateArcGun =(x)=>{

        this.ctx.beginPath()
        this.ctx.strokeStyle = "#C2DEDC"
        this.ctx.lineWidth  = 2
        this.ctx.arc(x.x+x.width/2 ,x.y + x.height / 2,x.range -19,0,2*Math.PI)
        this.ctx.stroke()
        this.ctx.closePath()
    }
    updateMoney = ()=>{
        this.moneyElement.innerHTML = "Para:" + this.player.money 
    }
    updateHealth = ()=>{
        this.healthElement.innerHTML = "Can:" + this.player.health 
    }
    bullet = (x,y,power,range)=>{
            const interval = setInterval(()=>{
                for(const m of this.monsters){
                    if((m.x > x - range && m.x < x + this.gunWidth + range) && (m.y > y - range && m.y < y + this.gunHeight + range) ){
                        this.bullets.push(new bullet("bullet",x+this.gunWidth/2,y+this.gunHeight/2,power,this.monsters[0]))
                    }
                }
            },600)
            this.intervals.push(interval)
        
    }
}