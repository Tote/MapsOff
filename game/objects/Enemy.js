class Enemy{
    constructor(){
        
        this.position = {x:75, y:75}
        this.size = {w:16, h:16}
        this.speed = 0.5 + Math.random()*0.5
        this.normalAnimation = new Transition({
            duration: 2,
            start   : this.size.w,
            end     : this.size.w * 1.5,
            update  : value => this.size.w = value,
            repeat  : true,
            boomerang: true
        })
        this.activeAnimation = new Transition({
            duration: 0.5,
            start   : this.size.w*0.3,
            end     : this.size.w*1.5 ,
            update  : value => this.size.w = value,
            repeat  : true,
            boomerang: true
        })
    }

    draw(graphics){
        let color = this.controls.isHeld(' ')
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.3)'
        graphics
            .save()
            .color(color)
            .shadow(0, 0, 3)
            .circle(
                this.position.x,
                this.position.y,
                this.size.w
            )
            .restore()
    }
    
    nextFrame(){
        if(this.controls.isHeld(' ')){
            if(this.position.x > this.target.position.x){
                this.position.x -= this.speed
            } else {
                this.position.x += this.speed
            }


            if(this.position.y > this.target.position.y){
                this.position.y -= this.speed
            } else {
                this.position.y += this.speed
            } 
            this.activeAnimation.nextFrame()
        } else {
            this.normalAnimation.nextFrame()
        }
    }

    controls(controls){
        controls.whenPressed(' ', () =>{
            this.frameSpeed = 5 
        })
        controls.whenReleased(' ', () =>{
            this.frameSpeed = 60  
        })
        this.controls = controls
    }

    target(target){
        this.target = target
    }
}