class Controller {
    constructor(scene) {
        this.scene = scene;
        this.baseItems = [];
        this.items = [];

        this.food = [];

        for (let i = 0; i < 6; i++) {
            this.baseItems.push({
                color: Object.keys(THREE.Color.NAMES)[i],
                position: {x: (i - 3) * 3 + 1.5, y: 0},
                shape: new THREE.BoxGeometry()
            });
        }

    }
    init(){
        if (this.items)        
            this.items.forEach((i) => this.scene.remove(i));            
        this.items = [];

        for (const item of this.baseItems) {
            // new THREE.BoxGeometry().setFromPoints(new THREE.Vector3(item.x, item.y, 0))
            let material = new THREE.MeshPhongMaterial( { color: item.color } );
            let mesh = new THREE.Mesh( item.shape, material );
            mesh.position.x = item.position.x;
            mesh.position.y = item.position.y;
            this.items.push( mesh );
        }
        this.items.forEach((i) => this.scene.add(i));
        this.food.push(new Food(this.scene, 2, 5));
        this.food.push(new Food(this.scene, -2, 2));
        setInterval(() => {
            const food = new Food(this.scene, getRandomInt(-10, 10), getRandomInt(1, 7));
            this.food.push(food);
            setTimeout(()=>{
                food.waiting();
                setTimeout(()=>{
                    this.food = this.food.filter(x => x != food);
                    food.kill();
                },getRandomInt(2000, 6000));
            },getRandomInt(3000, 6000));
        }, 2000);
    }

    updateTick(){
        this.food.forEach(x=> x.updateTick());
        this.items.forEach(x=> {x.rotation.y += 0.01;x.rotation.x += 0.001;});
        // console.log(Date.now())
        // let i = 0;
        // for (const item of this.baseItems) {
        //     item.position.x = 1 + 2*i++;
        // }
    }
}

class Food{    
    constructor(scene, x, y, color){        
        this.scene = scene;

        this.state = 0;

        var material = new THREE.MeshPhongMaterial( { color: color || 'red' , emissive: 0x072534, flatShading: true} );
        this.mesh = new THREE.Mesh( new THREE.ConeGeometry(.5, .7, 30), material);
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.scene.add( this.mesh );
    }

    updateTick(){
        if (this.state == 0){
            this.mesh.rotation.x += 0.03;
            this.mesh.rotation.y += 0.05;
        } else{
            this.mesh.rotation.x += 0.02;
            this.mesh.rotation.y += 0.01;
        }
    }

    getStatus() {
        return this.state;
    }

    waiting(){
        this.state = 1;
        this.mesh.material.color = new THREE.Color('yellow');
    }

    kill(){
        this.scene.remove( this.mesh );
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}