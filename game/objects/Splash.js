class Splash extends Element {
    constructor(text){
        super(text)
        this.text = text
        this.position = {x: 100, y:200}
        this.size = {w: 300, h: 100}
    }

    draw(graphics){
        graphics
        .font('100px Arial')
        .color('white')
        .context.strokeText(
            this.text,
            this.position.x + 10,
            this.position.y + this.size.h/2,
            this.size.w - 20
            )
    }
}