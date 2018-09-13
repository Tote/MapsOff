class DrawingEngine {
    constructor(width, height, id){
        if(id){
            this.canvas = document.querySelector(id)
        } else {
            this.canvas = document.createElement('canvas')
            document.body.appendChild(this.canvas)
        }
        
        this.size(width, height)
        this.context = this.canvas.getContext('2d')
        this.textures = {}
    }

    size(width, height){
        this.canvas.width = width
        this.canvas.height = height
    }

    color(color){
        this.context.fillStyle = color
        this.context.strokeStyle = color
        return this
    }

    texture(name){
        this.context.fillStyle = this.textures[name]
        return this
    }

    font(font){
        this.context.font = font
        return this
    }

    rect(x, y, w, h){
        this.context.fillRect(x, y, w, h)
        return this
    }
    circle(x, y, r){
        this.context.beginPath()
        this.context.arc(x, y, r, 0, Math.PI*2)
        this.context.fill()
        return this
    }
    circleBorder(x, y, r){
        this.context.beginPath()
        this.context.arc(x, y, r, 0, Math.PI*2)
        this.context.stroke()
        return this
    }
    square(x, y, size){
        this.rect(x, y, size, size)
        return this
    }

    image(image, from, to){
        this.context.drawImage(
            image,
            from.position.x,
            from.position.y,
            from.size.w,
            from.size.h,
            to.position.x,
            to.position.y,
            to.size.w,
            to.size.h
        )
    }

    rotatedImage(image, from, to, angle){
        let rotationCenter = {
            x: to.position.x + to.size.w/2,
            y: to.position.y + to.size.h/2
        }

        let rotatedOrigin = {
            x: -to.size.w/2,
            y: -to.size.h/2
        }

        this.context.save()
        this.context.translate(rotationCenter.x, rotationCenter.y)
        this.context.rotate(angle)
        this.image(image, from, {
            position: rotatedOrigin,
            size: to.size
        })
        this.context.restore()
    }
    
    shadow(x, y, blur){
        this.context.shadowColor = 'black'
        this.context.shadowOffsetX = x;
        this.context.shadowOffsetY = y;
        this.context.shadowBlur = blur;
        
        return this
    }

    registerTexture(name, url){
        return new Promise( resolve => {
            const image   = new Image()
            image.src     = url 
            image.onload = () => {
                const texture = this.context.createPattern(image, 'repeat')
                this.textures[name] = texture
                resolve(texture)
            }
        })
    }

    clear(){
        this.context.clearRect(
            0, 0,
            this.canvas.width,
            this.canvas.height,
        )
    }

    save(){
        this.context.save()
        return this
    }
    restore(){
        this.context.restore()
        return this
    }
}