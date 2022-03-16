import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const gui = new GUI();

const cubeRotationFolder = gui.addFolder("Cube rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2)
cubeRotationFolder.open()

const cameraProsition = gui.addFolder("Camera position")
cameraProsition.add(camera.position, "x", -5, 5)
cameraProsition.add(camera.position, "y", -5, 5)
cameraProsition.add(camera.position, "z", -5, 5)
cameraProsition.open()

function animate() {
    requestAnimationFrame(animate)
    render()
}

const stats = Stats();

document.body.appendChild(stats.dom)

function render() {
    stats.update()
    renderer.render(scene, camera)
}

animate()