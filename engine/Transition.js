class Transition extends Element{
    constructor(config){
        super()
        this.start      = config.start,
        this.end        = config.end,
        this.duration   = config.duration,
        this.update     = config.update
        this.boomerang  = config.boomerang  || false,
        this.repeat     = config.repeat     || false
        this.type       = config.type       || 'value'
        
        this.fps        = 60
        this.nFrames    = this.duration * this.fps
        this.frames     = []
        this.isPlaying  = true
        this.currentFrame   = 0
        this.currentTime    = 0
        
        this.build()
    }

    rewind(){
        this.currentTime    = 0
        this.isPlaying      = true
        return this
    }

    reverse(){
        this.frames.reverse()
        return this
    }

    nextFrame(){
        if(this.isPlaying){
            this.currentTime++
            this.currentFrame = (this.currentFrame+1) % this.nFrames
            this.update( this.frames[this.currentFrame] )
            if(this.repeat == false && this.currentFrame == this.nFrames -1 ){
                this.isPlaying = false
            }
        }
    }

    build(){
        let length = this.boomerang? this.nFrames / 2 : this.nFrames
        for(let i = 0; i < length;  i++ ){
            let frame
            if(this.type == 'value'){
                frame = this.interpolate(i, this.start, this.end)
            } else if(this.type== 'color'){
                let color = this.interpolateColor(i, this.start, this.end)
                frame = `rgb(${color.r},${color.g},${color.b})`
            }
            this.frames.push(frame)
        }
        if(this.boomerang){
            let reverseFrames = [...this.frames].reverse()
            this.frames.push(... reverseFrames)
        }
    }

    interpolate(nFrame ,min, max){
        return  min + (max-min) * ((nFrame+1)/this.nFrames)
    }

    interpolateColor(nFrame, start, end){
        return {
            r: Math.round(this.interpolate(nFrame, start.r, end.r)),
            g: Math.round(this.interpolate(nFrame, start.g, end.g)),
            b: Math.round(this.interpolate(nFrame, start.b, end.b))
        }
    }
}