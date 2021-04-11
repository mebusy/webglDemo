// main
const canvas_w_percent = 0.7;

const canvas = document.getElementById("maincanvas");

const scene = new THREE.Scene(); // scene.add scene.remove
// can be added to a scene, but it does not have to be part of the scene graph
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth * canvas_w_percent / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
const renderer = new THREE.WebGLRenderer( {
                 canvas: canvas,
                 antialias: true
} );
// clientWidth/clientHeight is the size the canvas is being displayed
renderer.setSize( canvas.clientWidth, canvas.clientHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry()
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var rot_speed = 0.01;

// show fps
const stats = new Stats();
document.body.appendChild( stats.domElement );

const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += rot_speed;
    cube.rotation.y += rot_speed;

    renderer.render( scene, camera );
    stats.update();
};

animate();

inspector.input(  {rot_speed},0, 0.1  );



// resize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    const w = window.innerWidth * canvas_w_percent ;
    const h = window.innerHeight ;
    // console.log( w,h, w/h );
    canvas.width = w ;
    canvas.height = h ;
    
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
    renderer.setSize( w,h );
}

