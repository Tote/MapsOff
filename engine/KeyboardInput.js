class KeyboardInput {
    constructor(){
        this.downActions = {}
        this.upActions = {}
        this.pressedKeys = {}

        document.addEventListener('keydown', (e => {
            if(e.repeat) return
            
            this.pressedKeys[e.key] = true

            if( !! this.downActions[e.key] ){
                this.downActions[e.key]
                    .forEach(action => action() )
            } 
        }))

        document.addEventListener('keyup', (e => {
            if(e.repeat) return

            this.pressedKeys[e.key] = false
            
            if( !! this.upActions[e.key] ){
                this.upActions[e.key]
                .forEach( action => action())
            } 
        }))
    }

    whenPressed(key, action){
        if(!this.downActions[key]){
            this.downActions[key] = []
        }
        this.downActions[key].push(action)
    }
    
    whenReleased(key, action){
        if(!this.upActions[key]){
            this.upActions[key] = []
        }
        this.upActions[key].push(action)
    }

    isHeld(key){
        return !! this.pressedKeys[key]
    }
}