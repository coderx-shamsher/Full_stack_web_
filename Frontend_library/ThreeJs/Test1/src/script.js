// scene -> everything in the world (in virtual world also) a scene 

// step  1 
const scene = new THREE.Scene();

// camera -> jo sab kuch shot krega 
// step2 
const camera = new THREE.PerspectiveCamera(
  75, // field of view 
  window.innerWidth / window.innerHeight,
  0.1, // jo 0.1 se jada pass hogi ham nhi dekhegi 
  1000, // jo 1000 points se far hogi hame nhi dekhegi !
);

// step3 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "lightblue" });


// step4
// mesh with created with geometry and material 
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const canvas = document.querySelector("#Canvas")
// in renderer mein hamara canvas set kr rahe hain.. in webglrenderer 
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);


function animate(time) {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  cube.rotation.x = time / 2000;
  cube.rotation. y = time / 1000;
}

animate()
