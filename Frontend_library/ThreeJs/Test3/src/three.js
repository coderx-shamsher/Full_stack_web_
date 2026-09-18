import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

// Get the canvas element
const canvas = document.getElementById('canvas');

// Create renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Create scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(
  60, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(1, 1, 3);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load HDRI environment map
// we can use any hdri we want to use. 
let loader = new HDRLoader();

  // .setPath('https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/')
  // loader.setPath('https://dl.polyhaven.com/file/ph-assets/HDRIs/hdr/1k/')
loader.load('https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/hdri/venice_sunset_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture; // set the background to the hdri
  });


  // rendering the cutom 3d model
let loader3dModel = new GLTFLoader() 

loader3dModel.load('free_1975_porsche_911_930_turbo (1).glb', function (gltf) {
  scene.add(gltf.scene);
  scene.position.y = -0.5;
});


// Example geometry to show lighting
// const geometry = new THREE.SphereGeometry(0.5, 32, 32);
// const material = new THREE.MeshStandardMaterial({ metalness: 0.8, roughness: 0.2 });
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

// Handle resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio); // Optimize for device
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();