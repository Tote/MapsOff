 class Character extends Sprite{
    constructor(){
        super('./assets/hero.png', 15, 8)
        this.position = {x: 100, y: 100}
        this.size = {h: 32, w: 32}
    }

    nextFrame(){
        if(!!this.collisionTarget){
            this.collisions = this.collisionTarget.collidesWith(this)
        }

        if( this.controls.isHeld('ArrowDown') && !this.collisions.down){
            this.position.y += 1
        }

        if( this.controls.isHeld('ArrowLeft') && !this.collisions.left){
            this.position.x -= 1
        }

        if( this.controls.isHeld('ArrowRight') && !this.collisions.right){
            this.position.x += 1
        }

        if( this.controls.isHeld('ArrowUp') && !this.collisions.up){
            this.position.y -= 1
        }

        super.nextFrame()
    }

    controls(controls){
        controls.whenPressed('ArrowUp', () => {
            this.rotate(0)
            this.play()
        })

        controls.whenPressed('ArrowDown', () => {
            this.rotate(Math.PI)    
            this.play()
        })
        controls.whenPressed('ArrowRight', () => {
            this.rotate(Math.PI/2)    
            this.play()
        })
        controls.whenPressed('ArrowLeft', () => {
            this.rotate(3*Math.PI/2)    
            this.play()
        })
        controls.whenReleased('ArrowUp', () => this.pause())
        controls.whenReleased('ArrowDown', () => this.pause())
        controls.whenReleased('ArrowRight', () => this.pause())
        controls.whenReleased('ArrowLeft', () => this.pause())

        this.controls = controls
    }
}