import * as THREE from 'three';


// this for orbit controls 
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import { Wireframe } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.add(camera)

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const geometry = new THREE.CylinderGeometry( 5, 5, 10, 5);
// const geometry = new THREE.CylinderGeometry( 5, 5, 10, 10, 10 , true);
const geometry = new THREE.CylinderGeometry( 5, 5, 10, 10, 10 , true);

// materials ->  
const material = new THREE.MeshBasicMaterial( { color: "lightblue", antialias : true , wireframe : true  } );
// const material = new THREE.MeshBasicMaterial( { color: "lightblue", antialias : true , wireframe : true , side : THREE.DoubleSide } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 1; 
// camera.position.z = 5; 
// camera.position.x = 2; 
// camera.position.y = 1; 

let canvas = document.querySelector(".canvas")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );


// for resize optimizations 
window.addEventListener("resize",()=>{
   renderer.setSize(window.innerWidth,window.innerHeight)
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()

   // every time we update camera values update the projectionmartix !! 
})



// for orbits controls 
const controls = new OrbitControls(camera, renderer.domElement)
// for smooth movements 
controls.enableDamping= true
controls.dampingFactor = 0.10 // the less move smooth spin stop !! 

// we can auto rotate with controls
// controls.autoRotate = true
// for speed -> 
// controls.autoRotateSpeed = 30.0

// controls.enableZoom = false

function animate() {
  
  window.requestAnimationFrame(animate) 
  renderer.render( scene, camera );
  
  // cube.rotation.x += 0.02
  // cube.rotation.z += 0.02
  // cube.rotation.y += 0.12;
  // cube.rotation.y += 0.12;
  
  // for controling objects 
  controls.update() 
  // now we can control objects with mosuse moves
}

animate()