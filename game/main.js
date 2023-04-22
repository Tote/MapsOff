let levelNumber = 1
const game = new Game(416, 416,'#gameCanvas')
 
Promise.all([
    game.graphics.registerTexture('door', `./assets/door.png`),
    game.graphics.registerTexture('key', `./assets/key.png`),
    game.graphics.registerTexture('wall','./assets/wall.png'),
    game.graphics.registerTexture('ladder','./assets/ladder.png')
])
.then( () => {
    game.changeScene('main')
    game.run()
})