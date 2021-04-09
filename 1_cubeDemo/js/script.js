
// main
const canvas = document.getElementById("maincanvas");

const scene = new THREE.Scene(); // scene.add scene.remove
// can be added to a scene, but it does not have to be part of the scene graph
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer( {
                 canvas: canvas,
                 antialias: true
} );
renderer.setSize( canvas.clientWidth, canvas.clientHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


// show fps
const stats = new Stats();
document.body.appendChild( stats.domElement );


const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
    stats.update();
};

animate();

