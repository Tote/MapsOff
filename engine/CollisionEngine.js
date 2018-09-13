class CollisionEngine {

}

CollisionEngine.collide = (o1, o2) => {
        let collision =  
                o1.position.x < o2.position.x + o2.size.w
            &&  o2.position.x < o1.position.x + o1.size.w
            &&  o1.position.y < o2.position.y + o2.size.h
            &&  o2.position.y < o1.position.y + o1.size.h

        return collision 
    }