import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

let squareCounter = 1;
let axesCounter = 1;
let sphereCounter = 1;
let cylinderCounter = 1;

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
        console.log(this.controls);
        //this.controls.enabled = false

        this.segments = 50
        this.radiusSegmentsK = 7

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

    addAxesHelper = (x = 0, y = 0, z = 0) => new Promise((resolve, reject) => {
        try {
            const axesHelper = new THREE.AxesHelper(5);
            axesHelper.name = "Оси координат " + axesCounter;
            axesHelper.position.x = x;
            axesHelper.position.y = y;
            axesHelper.position.z = z;
            axesCounter++;
            this.scene.add(axesHelper);
            resolve();
        } catch (error) {
            reject(error);
        }
    })

    addSquare = (data) => {
        const {width, height, length, startX, startY, startZ} = data;
        const squareGeometry = new THREE.BoxGeometry( width, height, length );
        const squareMaterial = new THREE.MeshBasicMaterial( {color: 0x6c6c6c} );
        const square = new THREE.Mesh( squareGeometry, squareMaterial );

        square.position.x = +startX + width / 2;
        square.position.y = +startY + height / 2;
        square.position.z = +startZ + length / 2;
        square.name = "Прямоугольник " + squareCounter;
        squareCounter++;

        this.scene.add( square );
    }

    addCylinder = (data) => {
        const { startX, height, startZ, radius, startY } = data;
        const cylinderGeometry = new THREE.CylinderGeometry( radius, radius, height, 50 );
        const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0x6c6c6c} );
        const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );

        cylinder.position.x = +startX + radius;
        cylinder.position.y = +startY + height / 2;
        cylinder.position.z = +startZ + radius;
        cylinder.name = "Цилиндр " + squareCounter;
        cylinderCounter++;

        this.scene.add( cylinder );
    }

    addSphere = (data) => {
        const {
            radius,
            startX,
            startY,
            startZ
        } = data;
        const sphereGeometry = new THREE.SphereGeometry(
            radius,
            5 * this.radiusSegmentsK,
            radius * this.radiusSegmentsK
        );
        const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x6c6c6c } );
        const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

        sphere.position.x = +startX + radius;
        sphere.position.y = +startY + radius;
        sphere.position.z = +startZ + radius;
        sphere.name = "Круг " + squareCounter;
        sphereCounter++;

        this.scene.add( sphere );
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
        (['x','y','z']).forEach((coordinate)=>{
            this.camera.position[coordinate] = !key.includes(coordinate) ? 3 : 0;
        })
        this.controls.update();
    }

    removeObject = (id) => new Promise((resolve, reject) => {
        try {
            if (!this.scene.children[id]) {
                reject("Children is undefined")
            } else {
                const cleanObjectName = this.scene.children[id].name.replace(/[^а-я]/gi, "").toLocaleLowerCase();
                console.log(cleanObjectName);
                switch (cleanObjectName) {
                    case "осикоординат":
                        axesCounter--
                        break;
                    case "прямоугольник":
                        squareCounter--
                        break;
                }
                this.scene.remove(this.scene.children[id])
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })

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

    toggleVisible = (id) => new Promise((resolve, reject) => {
        try {
            if (!this.scene.children[id]) {
                reject("Children is undefined")
            } else {
                const visible = this.scene.children[id].visible;
                this.scene.children[id].visible = !visible;
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })

    toggleWireframe = (id) => new Promise((resolve, reject) => {
        const wireframe = this.scene.children[id].material.wireframe ?? null;
        try {
            if (wireframe === null) {
                reject("Wireframe is undefined")
            } else {
                this.scene.children[id].material.wireframe = !wireframe
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })
}