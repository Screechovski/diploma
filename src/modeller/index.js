import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { Vector3 } from 'three';

let squareCounter = 1;
let axesCounter = 1;
let sphereCounter = 1;
let cylinderCounter = 1;

export class Modeller {
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
        this.camera.position.y = 6

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)

        this.selectedAxes = {
            x: false,
            y: true,
            z: false,
        }

        this.pressedKeys = {
            "shift": false
        }
        this.selectedOperations = {
            "square": false,
            "point": false
        }

        this.dotsArray = [[0,0,0]]

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.controls.enabled = false
        this.controls.enableZoom = false

        this.controls.addEventListener("start", () => this.selectedAxes = {
            x: false,
            y: false,
            z: false,
        })

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

        // this.stats.update()
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
        cylinder.name = "Цилиндр " + cylinderCounter;
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
        sphere.name = "Круг " + sphereCounter;
        sphereCounter++;

        this.scene.add( sphere );
    }

    addPlane = () => {
        const size = 1000;
        const divisions = 1000;
        const gridHelper = new THREE.GridHelper( size, divisions );

        gridHelper.name = "Сетка";

        this.scene.add( gridHelper );
    }

    getNativePosition = (e) => {
        let vector = new THREE.Vector3();
        const { domElement } = this.renderer;
        const { top, left } = domElement.getBoundingClientRect();

        if (Object.values(this.selectedAxes).every(i => !i)) {
            return null;
        }

        vector.set(((e.clientX - top) / domElement.offsetWidth) * 2 - 1, -((e.clientY - left) / domElement.offsetHeight) * 2 + 1,0);
        vector.unproject(this.camera);

        return {
            x: this.selectedAxes.x ? 0 : vector.x - 1,
            y: this.selectedAxes.y ? 0 : vector.y - 1,
            z: this.selectedAxes.z ? 0 : vector.z + 1,
        }
    }

    operationPoint = (vector) => {
        if (!this.pointOperation) {
            const axesHelper = new THREE.AxesHelper(0.2);
            this.pointOperation = axesHelper;
            this.scene.add(axesHelper);
        }
        this.pointOperation.position.x = vector.x;
        this.pointOperation.position.y = vector.y;
        this.pointOperation.position.z = vector.z;
    }

    operationProxy = (vector) => {
        /*if (!this.has && vector !== null) {
            return this.has = this.posc_c470(vector.x, vector.y, vector.z);
        }
        if (this.has && vector !== null) {
            this.has.position.x = vector.x;
            this.has.position.y = vector.y;
            this.has.position.z = vector.z;
        }*/
        if (this.selectedOperations.point) {
            this.operationPoint(vector);
        }
    }

    cursorPositionProxy = (vector) => {
        let varVector = vector;
        varVector.x = Math.abs(varVector.x) < 0.05 && !this.pressedKeys.shift ? 0 : varVector.x;
        varVector.y = Math.abs(varVector.y) < 0.05 && !this.pressedKeys.shift ? 0 : varVector.y;
        varVector.z = Math.abs(varVector.z) < 0.05 && !this.pressedKeys.shift ? 0 : varVector.z;
        return varVector;
    }

    mouseMove = (e) => {
        this.operationProxy(this.cursorPositionProxy(this.getNativePosition(e)));
    }

    setCamera = (key) => {
        (['x','y','z']).forEach((coordinate) => {
            const temp = !key.includes(coordinate);
            this.camera.position[coordinate] = temp ? 1 : 0;
            this.selectedAxes[coordinate] = temp;
        })
        this.camera.lookAt(new Vector3(0, 0, 0))
        // this.controls.update();
    }

    removeObject = (id) => new Promise((resolve, reject) => {
        try {
            if (!this.scene.children[id]) {
                reject("Children is undefined")
            } else {
                const cleanObjectName = this.scene.children[id].name.replace(/[^а-я]/gi, "").toLocaleLowerCase();
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

    keyPressed = (key, flag) => {
        if (Object.keys(this.pressedKeys).includes(key)) {
            this.pressedKeys[key] = flag;
            return;
        }
        throw Error("Unknown button")
    }

    selectOperation = ([operationName, flag]) => {
        if (Object.keys(this.selectedOperations).includes(operationName)) {
            this.selectedOperations[operationName] = flag;
            return;
        }
        throw Error("Unknown operation")
    }

    removeAllOperations = () => {
        Object.keys(this.selectedOperations).forEach(key =>
            this.selectedOperations[key] = false)
    }
}