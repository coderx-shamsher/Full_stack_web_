let scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
camera.position.z = 5;
// adding camera into scene
scene.add(camera)

let box = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "lightblue" });

const cube = new THREE.Mesh(box, material);
scene.add(cube);

// cube.position.x = 4 
// cube.position.y = -4 
// cube.position.z = 3
cube.position.z = 1

cube.rotation.x = 56
cube.rotation.y = 37
// cube.rotation.z = 58

// to rotate an element into 180deg we need to do 
// cube.rotation.y = Math.PI -> means 3.14 or 180degs 


// cube.scale.x = 5
// cube.scale.y = 3 
cube.scale.z = 1 

const canvas = document.querySelector("#Canvas")
const renderer = new THREE.WebGLRenderer({canvas, antialias : true});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera)

let clock = new THREE.Clock()
function animation(){
     // this line means , hamara computer kite frames per seconds print kr skte hai uthne bar animations chlega yan animations chelga 
     window.requestAnimationFrame(animation)

     renderer.render(scene,camera)

     // 
    //  cube.rotation.x += 0.01
      
    // using the clock() 
    // cube.rotation.z = clock.getElapsedTime() 
    cube.rotation.z = clock.getElapsedTime() * 2
    // cube.rotation.z = clock.getElapsedTime() * 10
}

animation()

// if mera computer give me 30 fps then yeh function 30 bar run hoga means ek second mein 30 bar + hoga 0.01 
