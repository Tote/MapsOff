const mainScene = new Scene()
game.scene('main', mainScene)

let character = new Character()
character.controls(game.controls)
character.position = {x:50, y:50}

const level = new Level(6 , 6)
level.randomExit()
level.randomKey()
level.randomizeMaze()
character.collisionTarget = level

mainScene.add(level)
mainScene.add(character)

this.enemies = []
mainScene.when(
    () => {
        let cell = level.cellOfPixel(character.position.x, character.position.y)
        let content = level.grid[cell.y][cell.x]

        return content == 'E'
    },
    () => {
        level.show()
        level.hide()

        level.buildGrid()
        level.randomExit()
        level.randomKey()
        level.randomizeMaze()

        let enemy = new Enemy()
        enemy.controls(game.controls)
        enemy.position = {x:Math.random()*416, y:Math.random()*416}
        enemy.target(character)
        enemies.push(enemy)
        mainScene.add(enemy)
 
        document.querySelector('#levelValue').innerHTML = levelNumber++ 
    }
    
)

mainScene.when(
    () => {
        let cell = level.cellOfPixel(character.position.x, character.position.y)
        let content = level.grid[cell.y][cell.x]

        return content == 'K'
    }, 
    () => {
        let exit = level.items.exit
        level.wall(exit.x, exit.y, exit.dir, ' ')

        let cell = level.cellOfPixel(character.position.x, character.position.y)
        level.grid[cell.y][cell.x] =  ' '
    }
)

mainScene.when(
    () => enemies.some(
        enemy => CollisionEngine.collide(enemy,character)
    ),
    () => {
        game.changeScene('gameover')
    } 
)

game.controls.whenPressed(' ', () =>  {
    level.show() 
})
game.controls.whenReleased(' ', () => {
    level.hide() 
})

let enemy = new Enemy()
enemy.position  = {x: 250, y: 250}
enemy.controls  = game.controls
enemy.target    = character
enemies.push(enemy)
mainScene.add(enemy)

