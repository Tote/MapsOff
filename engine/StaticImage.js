class StaticImage extends Element {
    constructor(url){
        super()
        let image = new Image()
        image.src = url
        this.image = image

        this.position   = {x: 0, y: 0}
        this.size       = {w: 0, h: 0}
    }

    draw(graphics) {
        graphics
            .shadow(0,0,0)
            .context
            .drawImage(
                this.image,
                this.position.x,
                this.position.y
            )
    }
}