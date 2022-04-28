import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
/*
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const boxGeometry = new THREE.BoxGeometry()
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0)
const planeGeometry = new THREE.PlaneGeometry()
const torusKnotGeometry = new THREE.TorusKnotGeometry()

const material = new THREE.MeshNormalMaterial()

const cube = new THREE.Mesh(boxGeometry, material)
cube.position.x = 5
scene.add(cube)

const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
icosahedron.position.x = 0
scene.add(icosahedron)

const plane = new THREE.Mesh(planeGeometry, material)
plane.position.x = -2
scene.add(plane)

const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
torusKnot.position.x = -5
scene.add(torusKnot)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const options = {
    side: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
}

const gui = new GUI()
const materialFolder = gui.addFolder('THREE.Material')
materialFolder.add(material, 'transparent').onChange(() => material.needsUpdate = true)
materialFolder.add(material, 'opacity', 0, 1, 0.01)
materialFolder.add(material, 'depthTest')
materialFolder.add(material, 'depthWrite')
materialFolder
    .add(material, 'alphaTest', 0, 1, 0.01)
    .onChange(() => updateMaterial())
materialFolder.add(material, 'visible')
materialFolder
    .add(material, 'side', options.side)
    .onChange(() => updateMaterial())
materialFolder.open()

const meshNormalMaterialFolder = gui.addFolder('THREE.MeshNormalMaterial')

meshNormalMaterialFolder.add(material, 'wireframe')
meshNormalMaterialFolder
    .add(material, 'flatShading')
    .onChange(() => updateMaterial())
meshNormalMaterialFolder.open()

function updateMaterial() {
    material.side = Number(material.side)
    material.needsUpdate = true
}

function animate() {
    requestAnimationFrame(animate)

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()*/

export default class Modeller {
    scene;
    camera;
    renderer;
    dragging = false;
    element;
    squareCoordinates = []

    constructor(element){
        const { clientWidth: width, clientHeight: height } = element;
        this.element = element;
        this.rayCaster = new THREE.Raycaster();

        this.element.addEventListener("mousedown", this.onMouseDown)

        this.scene = new THREE.Scene()
        this.scene.add(new THREE.AxesHelper(5))
        this.scene.background = new THREE.Color( 0x0e0e0e );

        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        this.camera.position.z = 3

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)
        element.appendChild(this.renderer.domElement)
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
        this.orbitControls.enabled = false
        this.animate()
    }

    enableOrbitControls = (flag = false) => {
        console.log("enableOrbitControls", flag);
        this.orbitControls.enabled = flag
    }

    animate = () => {
        requestAnimationFrame(this.animate)

        this.render()

        // stats.update()
    }

    render = (a) => {
        this.renderer.render(this.scene, this.camera)
    }

    addSphere = () => {
        const sphereGeometry = new THREE.SphereGeometry()
        const material = new THREE.MeshNormalMaterial()
        const sphere = new THREE.Mesh(sphereGeometry, material)
        sphere.position.x = 3
        this.scene.add(sphere)
    }

    getPosition = (event) => {
        const offset = this.element.getBoundingClientRect();
        const position = {
            x: ((event.clientX - offset.left) / this.element.clientWidth) * 2 - 1,
            y: -((event.clientY - offset.top) / this.element.clientHeight) * 2 + 1
        };
        this.rayCaster.setFromCamera(position, this.camera);
        const intersects = this.rayCaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0) {
            return intersects[0].point;
        }
    }

    onMouseDown = (e) => {
        /*const position = this.getPosition(e);

        const planeGeometry = new THREE.PlaneGeometry()
        const material = new THREE.MeshNormalMaterial()
        const plane = new THREE.Mesh(planeGeometry, material)
        plane.position.x = position.x
        plane.position.y = position.y
        this.scene.add(plane)*/


        // scene.children[1].position.set(relative.x + vertexSize, relative.y, relative.z);
        // controls.enabled = false;
    }
}