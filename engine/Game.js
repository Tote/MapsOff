class Game {
    constructor(width, height, id){
        this.graphics = new DrawingEngine(width, height, id)
        this.controls = new KeyboardInput()
        this.scenes = {}
        this.currentScene = {}
    }

    run(){
        this.graphics.clear()

        this.currentScene.rules
            .filter( rule => rule.check() )
            .forEach( rule => rule.action() )
            
        this.currentScene.elements.forEach(element =>{
            element.nextFrame()
            element.draw(this.graphics)
        })
        window.requestAnimationFrame(this.run.bind(this))
    }

    scene(id, scene){
        this.scenes[id] = scene
    }

    changeScene(id){
        this.currentScene = this.scenes[id]
    }
}

