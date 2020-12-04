let cubeSize = 1.2;
let xSpeed = 0.8;
let ySpeed = 0.01;
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const edgeSize = 10;
const cubes = Array.from(Array(edgeSize ** 2), makeCube);
cubes.forEach((_) => {
    scene.add(_);
});

const light = new THREE.DirectionalLight();
light.color.setHSL(0, 0, 1);
light.position.set(-1, 2, 4);
scene.add(light);

camera.position.z = 5;

function render(time) {
    time *= 0.001;
    cubes.forEach((_, i) => {
        _.rotation.x = time + i * xSpeed;
        _.rotation.y = time + i * ySpeed;
        _.material.color.offsetHSL(0.001, 0, 0);
    });
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);

function makeCube(_, idx) {
    const material = new THREE.MeshPhongMaterial();
    material.color.setHSL((240 + idx * 2) / 360, 0.6, 0.5);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (idx % edgeSize).toFixed() - (edgeSize / 2) + 0.5;
    cube.position.y = Math.floor(idx / edgeSize) - (edgeSize / 2) + 0.5;
    return cube;
}

document.querySelector('#cubeSize').addEventListener('input', (e) => {
    const s = e.target.value / 100;
    cubes.forEach((_) => {
        _.scale.set(s, s, s);
    });
});

document.querySelector('#xSpeed').addEventListener('input', (e) => {
    xSpeed = e.target.value / 100;
});

document.querySelector('#ySpeed').addEventListener('input', (e) => {
    ySpeed = e.target.value / 100;
});

document.body.addEventListener('keypress', (e) => {
    if (e.key === 'p') {
        document.querySelector('#parameters').classList.toggle('hidden');
    }
});