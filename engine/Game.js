class Game {
    constructor(width, height, id){
        this.graphics = new DrawingEngine(width, height, id)
        this.controls = new KeyboardInput()
        this.rules = []
        this.elements = []
    }

    when(check, action){
        this.rules.push({check, action})
    }

    run(){
        let t = 0
        setInterval( () => {
            this.graphics.clear()

            this.rules
                .filter( rule => rule.check() )
                .forEach( rule => rule.action() )
                
            this.elements.forEach(element =>{
                element.nextFrame()
                element.draw(this.graphics)
            })
        },
        1/60)
    }

    add( element ){
        this.elements.push(element)
    }

}

