class Scene{
    constructor(){
        this.rules = []
        this.elements = []
    }

    when(check, action){
        this.rules.push({check, action})
    }

    add( element ){
        this.elements.push(element)
    }
}