class Level extends Element {
    constructor(width, height){
        super()
        this.directions = ['up', 'left', 'down', 'right']
        this.size = {width, height}
        this.cellSize = 32
        this.items = {
            exit : {x:1, y:1, dir:'up'},
            key  : {x:1, y:1},
        }

        this.opacity = 0
        this.keys = new KeyboardInput()
        
        this.showTransition = new Transition({
            duration: 0.5,
            start   : 0,
            end     : 1,
            update  : value => this.opacity = value
        })

        this.hideTransition = new Transition({
            duration: 0.5,
            start   : 1,
            end     : 0,
            update  : value => this.opacity = value
        })

        this.transition = null

        this.buildGrid()
    }

    nextFrame(){
        if( !! this.transition ){
            this.transition.nextFrame()
        }
    }

    draw(graphics){
        const drawCell = cell => {
                switch(cell.type){
                    case 'X': graphics.texture('wall'); break;
                    case '#': graphics.texture('wall'); break;
                    case 'D': graphics.texture('door'); break;
                    case 'E': graphics.texture('ladder'); break;
                    case 'K': graphics.texture('key'); break;
                    default : graphics.color('rgba(0, 0, 0, 0)'); break;
                }
            graphics
                .rect(
                    cell.x*this.cellSize,
                    cell.y*this.cellSize,
                    this.cellSize,
                    this.cellSize)
         }

        graphics.context.save()
        graphics.context.globalAlpha = this.opacity
        for(let y = 0; y < 2*this.size.height+1; y++){
            for(let x = 0; x < 2*this.size.width+1; x++){
                drawCell({x, y, type: this.grid[y][x]})
            }
        }
        graphics.context.restore()
    }

    buildGrid(){
        let width = this.size.width
        let height = this.size.height
        let grid = []

        grid.push(new Array(width*2 + 1).fill('X'))

        while(height--){
            let row = []

            let i = width
            row = []

            row.push('X')
            while(i-- > 1){
                row.push(' ')
                row.push('X')
            }
            row.push(' ')
            row.push('X')
            
            grid.push(row)

            row = new Array(2*width+1).fill('X')
            grid.push(row)
            
        }

        this.grid = grid
    }

    randomizeMaze(){
        const cellConnectedBy = wall => {
            switch (wall.dir) {
                case 'up'   : return {x: wall.x     , y: wall.y - 1 }
                case 'right': return {x: wall.x + 1 , y: wall.y     }
                case 'down' : return {x: wall.x     , y: wall.y + 1 } 
                case 'left' : return {x: wall.x - 1 , y: wall.y     }
            }
        }

        const isVisited = cell => cells.some(c => c.x == cell.x && c.y == cell.y)

        const oppositeDir = direction => {
            switch (direction) {
                case 'up'   : return 'down'
                case 'right': return 'left'
                case 'down' : return 'up'
                case 'left' : return 'right'
            }
        }

        const addCell = (cell, cellArray, wall) =>{
            this.wall(wall.x, wall.y, wall.dir, ' ')
            this.directions
                .filter( dir => dir != oppositeDir(wall.dir) )
                .forEach(dir => {
                    walls.push({x: cell.x, y: cell.y, dir: dir})
                })

            cellArray.push(cell)
        }

        const exit = this.items.exit
        const connectedCell = cellConnectedBy(exit)
        let size = this.size.width * this.size.height
        let walls = []
        let cells = []

        cells.push(connectedCell)
        cells.push({x: exit.x, y: exit.y})
        this.directions
            .forEach(dir => {
                if(dir != exit.dir){
                    walls.push({x: exit.x, y: exit.y, dir: dir})
                }
                if(dir != oppositeDir(exit.dir)){
                    walls.push({x: connectedCell.x, y: connectedCell.y, dir: dir})
                }
            })

        while(cells.length < size){
            let wallIndex = Math.floor(Math.random()*walls.length)
            let wall = walls[wallIndex]
            let cellA = {x: wall.x, y: wall.y}
            let cellB = cellConnectedBy(wall)
            if(
                cellB.x == 0
                || cellB.y == 0
                || cellB.x > this.size.width
                || cellB.y > this.size.height
                || this.wall(wall.x, wall.y, wall.dir) ==  '#') continue


            if(isVisited(cellA) && !isVisited(cellB) ){
                addCell(cellB, cells, wall)
            } else if(!isVisited(cellA) && isVisited(cellB) ){
                addCell(cellA, cells, wall)
            }
            walls.splice(wallIndex,1)
        }
    }

    cell(x, y, content){
        let cellx = 2*x - 1
        let celly = 2*y - 1

        if(!!content){
            this.grid[celly][cellx] = content
        }

        return this.grid[celly][cellx]
    }

    wall(x, y, direction, content){
        
        let wallx,wally 
        
        switch(direction){
            case 'up':
                wallx = 2*x-1
                wally = 2*y-2
                break;
            case 'right':
                wallx = 2*x
                wally = 2*y-1
                break;
            case 'down':
                wallx = 2*x-1
                wally = 2*y
                break;     
            case 'left':
                wallx = 2*x-2
                wally = 2*y-1
                break;       
        }

        if(!!content){
            this.grid[wally][wallx] = content
        }

        return this.grid[wally][wallx]

    }

    exit(x, y){
        this.cell(x, y, 'E')
        this.directions.forEach( dir => this.wall(x, y, dir,'#') )

        const validDirections = this.directions
            .filter( dir => !(x == 0 && dir == 'left') )
            .filter( dir => !(x == this.size.width && dir == 'right') )
            .filter( dir => !(y == 0 && dir == 'up') )
            .filter( dir => !(y == this.size.height && dir == 'down') )
           
        const door = validDirections[Math.floor(Math.random() * validDirections.length )]

        this.wall(x, y, door, 'D')
        this.items.exit = {x, y, dir:door}
    }

    randomKey(){
        let x = Math.floor(Math.random()*(this.size.width)) + 1
        let y = Math.floor(Math.random()*(this.size.height)) + 1

        while(this.cell(x, y) != ' '){
            x = Math.floor(Math.random()*(this.size.width)) + 1
            y = Math.floor(Math.random()*(this.size.height)) + 1
        }
        this.cell(x, y, 'K')
        this.items.key = {x, y}
    }

    randomExit(){
        const x = Math.floor(Math.random()*(this.size.width-2)) + 1
        const y = Math.floor(Math.random()*(this.size.height-2)) + 1

        this.exit(x, y)
    }

    collidesWith(other){
        const upCell = this.cellOfPixel(
            other.position.x,
            other.position.y-1
        ) 
        const rightCell = this.cellOfPixel(
            other.position.x+other.size.w,
            other.position.y
        ) 
        const downCell = this.cellOfPixel(
            other.position.x,
            other.position.y + other.size.h
        ) 
        const leftCell = this.cellOfPixel(
            other.position.x-1,
            other.position.y
        ) 

        let collisions = {
            up: 'X#D'.includes(this.grid[upCell.y][upCell.x]),
            right:  'X#D'.includes(this.grid[rightCell.y][rightCell.x]),
            down:  'X#D'.includes(this.grid[downCell.y][downCell.x]),
            left:  'X#D'.includes(this.grid[leftCell.y][leftCell.x]),
        }

        return collisions
    }

    cellOfPixel(px, py){
        let x = Math.floor(px / this.cellSize)
        let y = Math.floor(py / this.cellSize)
        return {x, y}
    }

    show(){
        this.showTransition.rewind()
        this.transition = this.showTransition
    }

    hide(){
        this.hideTransition.rewind()
        this.transition = this.hideTransition
    }
}  