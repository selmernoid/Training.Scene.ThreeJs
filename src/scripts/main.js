// import * as THREE from '../node_modules/three/build/three.min.js';
// import { square } from 'controller'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var ctrl = new Controller(scene);
ctrl.init();

camera.position.z = 15;
window.addEventListener( 'wheel', onMouseWheel, false );


var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );


var animate = function () {
    ctrl.updateTick();
    requestAnimationFrame( animate );

    cube.rotation.z += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

function onMouseWheel( ev ) {
    var amount = ev.deltaY;
    if ( amount === 0 ) return;
    var dir = amount / Math.abs( amount );
    camera.position.z += dir;
}

animate();