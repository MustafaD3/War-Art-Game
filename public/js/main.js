import canvasC from "./classes/canvas.js";
import mapC from "./classes/map.js";
import monsterC from "./classes/monster.js";
import shopC from "./classes/shop.js";
const startButton = document.querySelector("#start-or-continue")
//Monster Images 
const monstersEl = document.querySelectorAll(".monster")
//Monsters
const monsters = []
//FPS 
const FPS = 60
//Map
const map = new mapC()
//Level
let level = 1
//Monster Icon
let monster = 1
//Monster Health
let health = 100
//Money Increase
let moneyIncrease = 30
//Monster Count
let monsterCount = 25
//Game Loop
let interval = null
//Canvas
let canvas = null
//Player Name
let name = ""
//Game Shop
let shop = null
startButton.addEventListener("click",main)
//Window Load Event
window.addEventListener("DOMContentLoaded",()=>{
    canvas = new canvasC()
    new mapC()
    setTimeout(()=>{
        name = prompt("Takma Adınız")
        shop = new shopC(name,monsters) 
    },200)
})
//Window Move Event
window.addEventListener("mousemove",(e)=>{
        const selectedGun = document.querySelector("#selected-gun")
        const remainderX = e.clientX % 70
        const remainderY = e.clientY % 70
        let state = false
        if(!selectedGun.getAttribute("data")){
            selectedGun.style.display = "none"
            return
        }
        
        if(e.clientY < map.block * 7 && (e.clientX > map.block && e.clientX < map.block * 2) ){
            state = false
       }
        else if((e.clientY < map.block * 7 && e.clientY > map.block * 6) && (e.clientX > map.block && e.clientX < map.block * 7) ){
            state = false
        }
        else if((e.clientY < map.block * 5 && e.clientY > map.block * 4) && (e.clientX > map.block * 6 && e.clientX < map.block * 7) ){
            state = false
        }
        else if((e.clientY < map.block * 4 && e.clientY > map.block * 3) && (e.clientX > map.block * 6 && e.clientX < map.block * 15) ){
            state = false
        }
        else if((e.clientY < map.block * 9 && e.clientY > map.block * 4) && (e.clientX > map.block * 14 && e.clientX < map.block * 15) ){
            state = false
        }
        else if((e.clientY < map.block * 9 && e.clientY > map.block * 8) && (e.clientX > map.block * 3 && e.clientX < map.block * 14) ){
            state = false
        }
        else if((e.clientY < map.block * 11 && e.clientY > map.block * 9) && (e.clientX > map.block * 3 && e.clientX < map.block * 4) ){
            state = false
        }
        else if((e.clientY < map.block * 11 && e.clientY > map.block * 10) && (e.clientX > map.block * 3 && e.clientX < map.block * 24) ){
            state = false
        }
        else if((e.clientY < map.block * 11 && e.clientY > map.block * 0) && (e.clientX > map.block * 23 && e.clientX < map.block * 24) ){
            state = false
        }
       else{
            state = true
       }
       if(state){
        selectedGun.style.background = "blue"
        selectedGun.setAttribute("state","true")
       }
       else{
        selectedGun.style.background = "red"
        selectedGun.setAttribute("state","false")
       }
        selectedGun.style.display = "block"
        selectedGun.style.top = e.clientY - remainderY
        selectedGun.style.left = e.clientX - remainderX
        window.imageY = e.clientY - remainderY
        window.imageX = e.clientX - remainderX
    
})
//Main Function
function main(){
    startButton.style.pointerEvents = "none"
    monsterCreate()
    gameLoop()
   
}
//Monster Create
function monsterCreate(){
    for(let i = 0;i<monsterCount;i++){
        setTimeout(()=>{
            monsters.push(new monsterC(document.querySelector("#monster-"+monster),health))
        },i * 400)
    }
}
//Interval Start
function gameLoop(){
    shop.bullets
    interval = setInterval(()=>{
        new mapC()
        shop.updateGun()
        
        if(monsters.length === 0){
          stop()
        }
        //Bullet Detection
        for(const x of shop.bullets){
            if(x.x > canvas.canvas.width || x.y > canvas.canvas.height ||x.x < 0 || x.y < 0){
                shop.bullets.splice(shop.bullets.indexOf(x),1)
                continue
            }
            for(const m of monsters){
                if((x.x > m.x && x.x < m.x + m.monsterWidth) && (x.y > m.y && x.y < m.y + m.monsterHeight)){
                    shop.bullets.splice(shop.bullets.indexOf(x),1)
                    m.health -= x.power
                    if(m.health <= 0){
                        monsters.splice(monsters.indexOf(m),1)
                        shop.player.score+=10
                        shop.player.money+=moneyIncrease
                    }
                   
                }
            }
            x.update()
        }
        //Monster Detection
        for(const x of monsters){
            if(x.x === 1610 && x.y === 0 - x.monsterHeight){
                shop.player.health -= 1
                monsters.splice(monsters.indexOf(x), 1)
                return
            }
            x.moveUpdate()
            x.update()
            
        }
        //End Game
        if(shop.player.health <= 0){
            shop.updateGun()
            setTimeout(()=>{
                alert("Game Over")
                clearInterval(interval)
                window.location.reload()
            },100)
            
        }
    },FPS/1000)
}
function stop(){
    clearInterval(interval)
    monster < monstersEl.length ? monster+=1:null
    moneyIncrease += 10
    monsterCount += 5
    health += 20
    startButton.style.pointerEvents = "auto"
    shop.bullets = []
    setTimeout(()=>{
        new mapC()
        shop.updateGun()
    },150)
}