import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

let squareCounter = 1;

export default class Modeller {
    scene;
    camera;
    renderer;
    dragging = false;
    element;
    squareCoordinates = []

    constructor(element){
        const { clientWidth: width, clientHeight: height } = element;

        this.rayCaster = new THREE.Raycaster();

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 0x0e0e0e );

        this.camera = new THREE.OrthographicCamera( width / -200, width / 200, height / 200, height / -200, -1000, 1000 );
        this.camera.position.y = 3

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = false

        element.appendChild(this.renderer.domElement)

        this.addAxesHelper()

        this.animate()
    }

    enableOrbitControls = (flag = false) => {
        this.controls.enabled = flag
    }

    animate = () => {
        requestAnimationFrame(this.animate)

        this.render()

        // stats.update()
    }

    render = () => {
        this.renderer.render(this.scene, this.camera)
    }

    addAxesHelper = () => {
        const axesHelper = new THREE.AxesHelper(5)

        axesHelper.name = "Оси координат"

        this.scene.add(axesHelper)
    }

    addSphere = () => {
        /*const sphereGeometry = new THREE.SphereGeometry()
        const sphereMaterial = new THREE.MeshNormalMaterial()
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

        sphere.name = "Круг"
        sphere.position.x = 3

        this.scene.add(sphere)*/
    }

    addSquare = ({width, height, length, startX, startY, startZ}) => {
        const squareGeometry = new THREE.BoxGeometry( width, height, length );
        const squareMaterial = new THREE.MeshBasicMaterial( {color: 0x6c6c6c} );
        const square = new THREE.Mesh( squareGeometry, squareMaterial );

        square.position.x = width / 2 - startX;
        square.position.y = height / 2 - startY;
        square.position.z = length / 2 - startZ;
        square.name = "Прямоугольник " + squareCounter;
        squareCounter++;

        this.scene.add( square );
    }

    addPlane = () => {
        /*const planeGeometry = new THREE.PlaneGeometry( 1, 1 );
        const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( planeGeometry, planeMaterial );

        plane.name = "Квадрат"

        this.scene.add( plane );*/
    }

    getPosition = (event) => {
        const offset = this.renderer.domElement.getBoundingClientRect();
        const position = {
            x: ((event.clientX - offset.left) / this.renderer.domElement.clientWidth) * 2 - 1,
            y: -((event.clientY - offset.top) / this.renderer.domElement.clientHeight) * 2 + 1
        };
        this.rayCaster.setFromCamera(position, this.camera);
        const intersects = this.rayCaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0) {
            return intersects[0].point;
        }
    }

    setCamera = (key) => {
        console.log(this.camera);
        console.log(this.controls);
        ['x','y','z'].forEach((coordinate)=>{
            this.camera.position[coordinate] = !key.includes(coordinate) ? 3 : 0;
        })
        this.controls.update();
    }

    removeObject = (id) => {
        this.scene.remove(this.scene.children[id])
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