import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as lil from "lil-gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  100,
);
scene.add(camera);

// create texture loader
let textureloader = new THREE.TextureLoader();

// create color
let color = textureloader.load("../texture/paper_0025_color_2k.jpg");

// create roughness
let roughness = textureloader.load("../texture/paper_0025_roughness_2k.jpg");

// create normal
let normal = textureloader.load("../texture/paper_0025_normal_directx_2k.png");

const geometry = new THREE.BoxGeometry(4, 2, 2);
// materials ->
//  ham bina light k standard material object nhi dekh skte
// const material = new THREE.MeshStandardMaterial( { color: "lightblue", antialias : true , roughness : 0.8, metalness : 0.5 } );
// const material = new THREE.MeshStandardMaterial( { map : color, antialias : true , roughness : 0.8, metalness : 0.5 } );

// with cutom texture ->
const material = new THREE.MeshStandardMaterial({
  map: color,
  roughness: roughness,
  normalMap: normal,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 0.8;

let canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// studio lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5); // High intensity
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight); 

const pointLight = new THREE.PointLight(0xffaa44, 6.0, 15); // Warm color, high intensity, 15-unit range
// pointLight.position.set(-4, 3, -2);
pointLight.position.set(0, 3, 0);
// pointLight.castShadow = true;
scene.add(pointLight);

// for resize optimizations
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// light helpers
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2); // Size 1, Green color
scene.add(dirLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 5); // Size 0.5, Red color
scene.add(pointLightHelper);

// for orbits controls
const controls = new OrbitControls(camera, renderer.domElement);
// for smooth movements
controls.enableDamping = true;



// creating gui
const guiParameters = {
    roughness: 1.0, // Default multiplier
    metalness: 1.0
};

const gui = new lil.GUI();

const materialSetting = gui.addFolder('Material')

// Control the helper object, then update the actual material inside onChange()
materialSetting.add(guiParameters, 'roughness', 0, 1)
    .name("RoughNess")
    .onChange((value) => {
        material.roughness = value; 
    });

materialSetting.add(guiParameters, 'metalness', 0, 1)
    .name("MetalNess")
    .onChange((value) => {
        material.metalness = value;
    });

materialSetting.addColor(material, "color").name("Color");

// material settings
// const materialSetting = gui.addFolder('Material');
// materialSetting.add(material, "roughness", 0, 1).name("Roughness");
// materialSetting.add(material, "metalness", 0, 1).name("Metalness");
// materialSetting.open();

// material settings
const meshSetting = gui.addFolder('Mesh');
meshSetting.add(cube.scale, "x", 0.1, 5).name("Scale X");
meshSetting.add(cube.scale, "y", 0.1, 5).name("Scale Y");
meshSetting.add(cube.scale, "z", 0.1, 5).name("Scale Z");
meshSetting.add(cube.position, "x", -10, 10).name("Position X");
meshSetting.add(cube.position, "y", -10, 10).name("Position Y");
meshSetting.add(cube.position, "z", -10, 10).name("Position Z");
meshSetting.open();


// ---------------------------------------------
// FOLDER: Directional Light
// ---------------------------------------------
const dirFolder = gui.addFolder('Directional Light');

dirFolder.add(directionalLight, 'intensity', 0, 5, 0.1).name('Intensity');
dirFolder.addColor(directionalLight, 'color').name('Color');

// Position controls (Important: Helpers must be updated when light moves!)
dirFolder.add(directionalLight.position, 'x', -10, 10).name('Pos X').onChange(() => dirLightHelper.update());
dirFolder.add(directionalLight.position, 'y', -10, 10).name('Pos Y').onChange(() => dirLightHelper.update());
dirFolder.add(directionalLight.position, 'z', -10, 10).name('Pos Z').onChange(() => dirLightHelper.update());

// Helper Visibility Checkbox
dirFolder.add(dirLightHelper, 'visible').name('Show Helper');
dirFolder.open();

// ---------------------------------------------
// FOLDER: Point Light
// ---------------------------------------------
const pointFolder = gui.addFolder('Point Light');

pointFolder.add(pointLight, 'intensity', 0, 10, 0.1).name('Intensity');
pointFolder.add(pointLight, 'distance', 0, 30, 0.5).name('Distance');
pointFolder.addColor(pointLight, 'color').name('Color');

// Position controls
pointFolder.add(pointLight.position, 'x', -10, 10).name('Pos X').onChange(() => pointLightHelper.update());
pointFolder.add(pointLight.position, 'y', -10, 10).name('Pos Y').onChange(() => pointLightHelper.update());
pointFolder.add(pointLight.position, 'z', -10, 10).name('Pos Z').onChange(() => pointLightHelper.update());

// Helper Visibility Checkbox
pointFolder.add(pointLightHelper, 'visible').name('Show Helper');

// ---------------------------------------------
// FOLDER: Ambient Light
// ---------------------------------------------
const ambientFolder = gui.addFolder('Ambient Light');
ambientFolder.add(ambientLight, 'intensity', 0, 2, 0.01).name('Intensity');
ambientFolder.addColor(ambientLight, 'color').name('Color');
ambientFolder.close(); // Keep it closed by default to save space

function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);

  //   cube.rotation.x += 0.02
  // cube.rotation.z += 0.02
  controls.update();
}

animate();
