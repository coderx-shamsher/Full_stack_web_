import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

scene.add(camera)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const geometry = new THREE.CylinderGeometry( 5, 5, 10, 5);
// const geometry = new THREE.CylinderGeometry( 5, 5, 10, 10, 10 , true);
// const geometry = new THREE.CylinderGeometry( 5, 5, 10, 10, 10 , true);

// materials ->  
// const material = new THREE.MeshBasicMaterial( { color: "lightblue", antialias : true , wireframe : true  } );

//  ham bina light k standard material object nhi dekh skte 
const material = new THREE.MeshStandardMaterial( { color: "lightblue", antialias : true , roughness : 1, metalness : 2 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); 

camera.position.z = 1; 


let canvas = document.querySelector(".canvas")
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );


// ----->>> Studio lighting 
const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5); // High intensity
directionalLight.position.set(5, 10, 7); // directional light kisi diraction se a rahi hoti hai 
scene.add(directionalLight);
// directionalLight.castShadow = true;

// Optimize shadow resolution for high intensity
// directionalLight.shadow.mapSize.width = 2048;
// directionalLight.shadow.mapSize.height = 2048;


// all natural light around all the object sab taraf se ane vali light !! 
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // more bright 
scene.add(ambientLight); // make sure to add light into sence  !! 


const pointLight = new THREE.PointLight(0xffaa44, 6.0, 15); // Warm color, high intensity, 15-unit range
// pointLight.position.set(-4, 3, -2);
pointLight.position.set(1, 2, 0);
// pointLight.castShadow = true;
scene.add(pointLight);

// for resize optimizations 
window.addEventListener("resize",()=>{
   renderer.setSize(window.innerWidth,window.innerHeight)
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()

})


// light helpers

// Directional Light Helper (Displays a square grid showing origin and a line pointing to its target)
// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0x00ff00); // Size 1, Green color
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5); // Size 1, Green color
scene.add(dirLightHelper);

// Point Light Helper (Displays a wireframe sphere showing the exact source point location)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5, 0xff0000); // Size 0.5, Red color
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5); // Size 0.5, Red color
scene.add(pointLightHelper);


// for orbits controls 
const controls = new OrbitControls(camera, renderer.domElement)
// for smooth movements 
controls.enableDamping= true


function animate() {
  
  window.requestAnimationFrame(animate) 
  renderer.render( scene, camera );
  
  // cube.rotation.x += 0.02
  // cube.rotation.z += 0.02

  controls.update() 

}

animate()