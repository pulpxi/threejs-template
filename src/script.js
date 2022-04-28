import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui'


//#region Main Variables
const gui = new GUI();
let scene, camera, canvas, renderer, controls;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};
//#endregion

start();
function start(){
    // Canvas
    canvas = document.querySelector('canvas.webgl');
    // Scene
    scene = new THREE.Scene();
    //Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Camera
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 1
    camera.position.y = 1
    camera.position.z = 1
    const cameraFolder = gui.addFolder('Camera Settings');
    cameraFolder.add(camera.position, 'x');
    cameraFolder.add(camera.position, 'y');
    cameraFolder.add(camera.position, 'z');
    scene.add(camera)
    // Resize Event
    window.addEventListener('resize', onWindowResize);
    // Controls
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
}

//#region Event Listeners
function onWindowResize(){
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    debugCamera.aspect = sizes.width / sizes.height;
    debugCamera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
//#endregion




















// Cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
)
scene.add(cube)

// Light
const light = new THREE.DirectionalLight(
    new THREE.Color(255, 255, 255),
    .8,
);
light.position.set(10, 10, 10);
scene.add(light);
const lightHelper = new THREE.DirectionalLightHelper(light);
scene.add(lightHelper);

const lightFolder = gui.addFolder('Light Settings');
lightFolder.add(light, 'intensity');
lightFolder.add(light.position, 'x');
lightFolder.add(light.position, 'y');
lightFolder.add(light.position, 'z');
















function update(){

    renderer.render(scene, camera);
    requestAnimationFrame(update);
}

update();