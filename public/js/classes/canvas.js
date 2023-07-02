export default class canvasC{
    constructor(){
        this.start()
    }
   start(){
            this.canvas = document.querySelector("#canvas")
            this.ctx = canvas.getContext("2d")
            this.dirt = document.querySelector("#dirt")
            this.gunWidth = 70
            this.gunHeight = 70
            this.monsterWidth = 70
            this.monsterHeight = 70
        }

}