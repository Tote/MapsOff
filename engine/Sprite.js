class Sprite extends Element {
    constructor(spriteUrl, speed, frames) {
        super()
        this.speed = speed
        this.frames = frames

        let image = new Image()
        image.src = spriteUrl
        this.image = image

        this.currentFrame = 0
        this.currentTime = 0
        this.isPlaying = false
        this.angle = 0

    }

    draw(draw) {
        draw.rotatedImage(
            this.image,
            {
                position: { x: 32 * this.currentFrame, y: 0 },
                size: this.size
            },
            {
                position: this.position,
                size: this.size
            },
            this.angle
        )
    }

    nextFrame() {
        if (this.isPlaying) {
            this.currentFrame =
                Math.floor(this.currentTime / this.speed) % this.frames
            this.currentTime = (this.currentTime + 1) % (this.frames * this.speed)
        }
    }

    play() {
        this.isPlaying = true
    }

    pause() {
        this.isPlaying = false
    }

    rotate(angle) {
        this.angle = angle
    }
}