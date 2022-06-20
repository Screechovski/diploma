import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { LogLuvEncoding, Vector3 } from 'three';
import { Num, getLSColor } from '@/assets/helper';
import { exportCollada, exportDRACO, exportGLTF, exportMMD, exportOBJ, exportPLY, exportSTL, exportUSDZ } from '@/modeller/export';
import { FlagAliasesReversed, UserHelp } from '@/assets/constants';

let squareCounter = 1;
let axesCounter = 1;
let sphereCounter = 1;
let cylinderCounter = 1;

export class Modeller{
    scene;
    camera;
    renderer;
    dragging = false;
    element;
    squareCoordinates = []

    constructor(element, storeDispatch) {
        const { clientWidth: width, clientHeight: height } = element;

        this.rayCaster = new THREE.Raycaster();

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(getLSColor("backgroud") ?? 0x0a0a0a);

        this.camera = new THREE.OrthographicCamera(width / -200, width / 200, height / 200, height / -200, -1000, 1000);
        this.camera.position.y = -1

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)

        this.storeDispatch = storeDispatch

        this.selectedAxes = {
            x: false,
            y: true,
            z: false,
        }

        this.pressedKeys = {
            "shift": false,
            "ctrl": false,
        }
        this.selectedOperations = {
            "square": false,
            "point": false,
            "circle": false,
        }

        this.pointOperation = {
            status: false,
            value: null
        }
        this.squareOperation = {
            status: null,
            value: null,
            dot: null,
            start: {
                x: null,
                y: null,
                z: null,
            },
        }
        this.circleOperation = {
            status: null,
            value: null,
            dot: null,
            start: {
                x: null,
                y: null,
                z: null,
            },
        }

        this.dotsArray = [[0], [0], [0]]

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


    animate = () => {
        requestAnimationFrame(this.animate)

        this.render()

        // this.stats.update()
    }

    render = () => {
        this.renderer.render(this.scene, this.camera)
    }

    enableOrbitControls = (flag = false) => {
        this.controls.enabled = flag
    }

    setBackgroudColor = (color) => {
        this.scene.background = new THREE.Color(color);
    }

    getChildrensArray = () => {
        const childrensArray = Object.values(this.scene.children)
        const cleanChildrensArray = childrensArray.map(({name, type, visible, material: { wireframe = null }}) =>
            ({name, type, visible, wireframe}));

        return cleanChildrensArray;
    }

    add = (mesh) => {
        this.scene.add(mesh);
        this.storeDispatch("tree/setTree", this.getChildrensArray(), {root: true})
    }

    addAxesHelper = (x = 0, y = 0, z = 0) => new Promise((resolve, reject) => {
        try {
            const axesHelper = new THREE.AxesHelper(5);
            axesHelper.name = "Оси координат " + axesCounter;
            axesHelper.position.x = x;
            axesHelper.position.y = y;
            axesHelper.position.z = z;
            axesCounter++;
            this.add(axesHelper);
            resolve();
        } catch (error) {
            reject(error);
        }
    })

    addSquare = (data) => {
        const { width, height, length, startX, startY, startZ } = data;
        const squareGeometry = new THREE.BoxGeometry(width, height, length);
        const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x6c6c6c });
        const square = new THREE.Mesh(squareGeometry, squareMaterial);

        square.position.x = +startX + width / 2;
        square.position.y = +startY + height / 2;
        square.position.z = +startZ + length / 2;
        square.name = "Прямоугольник " + squareCounter;
        squareCounter++;

        this.add(square);
    }

    addCylinder = (data) => {
        const { startX, height, startZ, radius, startY } = data;
        const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 50);
        const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x6c6c6c });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

        cylinder.position.x = +startX + radius;
        cylinder.position.y = +startY + height / 2;
        cylinder.position.z = +startZ + radius;
        cylinder.name = "Цилиндр " + cylinderCounter;
        cylinderCounter++;

        this.add(cylinder);
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
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x6c6c6c });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.x = +startX + radius;
        sphere.position.y = +startY + radius;
        sphere.position.z = +startZ + radius;
        sphere.name = "Круг " + sphereCounter;
        sphereCounter++;

        this.add(sphere);
    }

    addPlane = () => {
        const size = 1000;
        const divisions = 1000;
        const gridHelper = new THREE.GridHelper(size, divisions);

        gridHelper.name = "Сетка";

        this.add(gridHelper);
    }

    getNativePosition = (e) => {
        let vector = new THREE.Vector3();
        const { domElement } = this.renderer;
        const { top, left } = domElement.getBoundingClientRect();

        if (Object.values(this.selectedAxes).every(i => !i)) {
            return null;
        }

        vector.set(
            ((e.clientX - left) / domElement.offsetWidth) * 2 - 1,
            -((e.clientY - top) / domElement.offsetHeight) * 2 + 1,
            0
        );
        vector.unproject(this.camera);

        return {
            x: this.selectedAxes.x ? 0 : Num(vector.x),
            y: this.selectedAxes.y ? 0 : Num(vector.y),
            z: this.selectedAxes.z ? 0 : Num(vector.z),
        }
    }

    operationMovePoint = (vector) => {
        if (!this.pointOperation.status) {
            const axesHelper = new THREE.AxesHelper(0.2);
            this.pointOperation.status = true;
            this.pointOperation.value = axesHelper;
            this.add(axesHelper);
        }
        this.pointOperation.value.position.x = vector.x;
        this.pointOperation.value.position.y = vector.y;
        this.pointOperation.value.position.z = vector.z;
    }

    operationMoveSquare = (vector) => {
        if (this.squareOperation.status === null) {
            if (this.squareOperation.dot === null) {
                const axesHelper = new THREE.AxesHelper(0.2);
                this.squareOperation.dot = axesHelper;
                this.add(axesHelper);
            } else {
                this.squareOperation.dot.position.x = vector.x;
                this.squareOperation.dot.position.y = vector.y;
                this.squareOperation.dot.position.z = vector.z;
            }
        }
        if (this.squareOperation.status === "hasPlane") {
            if (this.selectedAxes.y) {
                const XA = (vector.x - this.squareOperation.start.x) * 2;
                const ZA = (vector.z - this.squareOperation.start.z) * 2;
                const a = Math.min(XA, ZA);
                this.squareOperation.value.scale.x = this.pressedKeys.ctrl ? a : XA;
                this.squareOperation.value.scale.y = this.pressedKeys.ctrl ? a : ZA;
            } else if (this.selectedAxes.z) {
                const XA = (vector.x - this.squareOperation.start.x) * 2;
                const YA = (vector.y - this.squareOperation.start.y) * 2;
                const a = Math.min(XA, YA);
                this.squareOperation.value.scale.x = this.pressedKeys.ctrl ? a : XA;
                this.squareOperation.value.scale.y = this.pressedKeys.ctrl ? a : YA;
            } else if (this.selectedAxes.x) {
                const ZA =(vector.z - this.squareOperation.start.z) * 2;
                const YA = (vector.y - this.squareOperation.start.y) * 2;
                const a = Math.min(ZA, YA);
                this.squareOperation.value.scale.x = this.pressedKeys.ctrl ? a : ZA;
                this.squareOperation.value.scale.y = this.pressedKeys.ctrl ? a : YA;
            }
        }
    }

    operationMoveCircle = (vector) => {
        if (this.circleOperation.status === null) {
            if (this.circleOperation.dot === null) {
                const axesHelper = new THREE.AxesHelper(0.2);
                this.circleOperation.dot = axesHelper;
                this.add(axesHelper);
            } else {
                this.circleOperation.dot.position.x = vector.x;
                this.circleOperation.dot.position.y = vector.y;
                this.circleOperation.dot.position.z = vector.z;
            }
        }
        if (this.circleOperation.status === "hasCircle") {
            if (this.selectedAxes.y) {
                const XA = vector.x - this.circleOperation.start.x;
                const ZA = vector.z - this.circleOperation.start.z;
                const r = Math.sqrt(Math.pow(XA, 2) + Math.pow(ZA, 2));
                this.circleOperation.value.scale.x = this.pressedKeys.ctrl ? r : XA;
                this.circleOperation.value.scale.y = this.pressedKeys.ctrl ? r : ZA;
            } else if (this.selectedAxes.z) {
                const XA = vector.x - this.circleOperation.start.x;
                const YA = vector.y - this.circleOperation.start.y;
                const r = Math.sqrt(Math.pow(XA, 2) + Math.pow(YA, 2))
                this.circleOperation.value.scale.x = this.pressedKeys.ctrl ? r : XA;
                this.circleOperation.value.scale.y = this.pressedKeys.ctrl ? r : YA;
            } else if (this.selectedAxes.x) {
                const ZA = vector.z - this.circleOperation.start.z;
                const YA = vector.y - this.circleOperation.start.y;
                const r = Math.sqrt(Math.pow(ZA, 2) + Math.pow(YA, 2))
                this.circleOperation.value.scale.x = this.pressedKeys.ctrl ? r : ZA;
                this.circleOperation.value.scale.y = this.pressedKeys.ctrl ? r : YA;
            }
        }
    }

    operationMoveProxy = (vector) => {
        let was = 0;
        if (this.selectedOperations.point) {
            this.operationMovePoint(vector);
            was++;
        }
        if (this.selectedOperations.square) {
            this.operationMoveSquare(vector);
            was++;
        }
        if (this.selectedOperations.circle) {
            this.operationMoveCircle(vector);
            was++;
        }
        if (was > 1) throw Error("2 operations is selected")
    }

    cursorPositionProxy = (vector) => {
        const [xArray, yArray, zArray] = this.dotsArray;
        let varVector = {...vector};

        varVector.x = this.magnitDots(xArray, varVector.x);
        varVector.y = this.magnitDots(yArray, varVector.y);
        varVector.z = this.magnitDots(zArray, varVector.z);

        return varVector;
    }

    magnitDots = (magnitArray , axis) => {
        let returnedValue = axis;

        for (let i = 0; i < magnitArray.length; i++) {
            const magnit = magnitArray[i];

            const min = magnit - 0.05;
            const max = magnit + 0.05;

            if ((min < axis && axis < max) && !this.pressedKeys.shift) {
                returnedValue = magnit;
            }
        }

        return returnedValue;
    }

    operationClickProxy = (vector) => {
        let was = 0;
        if (this.selectedOperations.point) {
            return this.operationClickPoint(vector);
            was++;
        }
        if (this.selectedOperations.square) {
            return this.operationClickSquare(vector);
            was++;
        }
        if (this.selectedOperations.circle) {
            return this.operationClickCircle(vector);
            was++;
        }
        if (was > 1) throw Error("2 operations is selected")
    }

    operationClickPoint = (vector) => {
        this.pointOperation.status = false;
        this.pointOperation.value = null;
        this.addDot(vector);
        this.selectedOperations.point = false;
        this.storeDispatch("panel/disableOperation", FlagAliasesReversed["point"], {root: true})
        this.storeDispatch("helper/setLine", "", {root: true})
    }

    operationClickSquare = (vector) => {
        if (this.squareOperation.status === null) {
            const planeGeometry = new THREE.PlaneGeometry( 1, 1 );
            const planeMaterial = new THREE.MeshBasicMaterial( {color: 0x6c6c6c, side: THREE.DoubleSide, wireframe: true} );
            const plane = new THREE.Mesh( planeGeometry, planeMaterial );

            plane.position.x = vector.x;
            plane.position.y = vector.y;
            plane.position.z = vector.z;

            if (this.selectedAxes.x) {
                plane.rotation.y = (Math.PI / 2);
            } else if (this.selectedAxes.y) {
                plane.rotation.x = (Math.PI / 2);
            }

            this.squareOperation.start.x = vector.x;
            this.squareOperation.start.y = vector.y;
            this.squareOperation.start.z = vector.z;

            this.addDot(vector) // добавляем центральную точку в массив магнитова

            this.squareOperation.value = plane;
            this.squareOperation.status = "hasPlane";
            this.storeDispatch("helper/setLine", UserHelp.square.clickForEnd, {root: true})
            // TODO нужно удалить точку
            this.add( plane );
        } else if (this.squareOperation.status === "hasPlane") {
            // добавляем 4 угловые точки в массив магнитов
            if (this.selectedAxes.y) {
                const absScaleX = Math.abs(this.squareOperation.value.scale.x);
                const absScaleY = Math.abs(this.squareOperation.value.scale.y);
                const startZ = this.squareOperation.start.z;
                const startX = this.squareOperation.start.x;

                this.addDot({x: startX + absScaleX / 2,y: 0, z: startZ + absScaleY / 2});
                this.addDot({x: startX + absScaleX / 2,y: 0, z: startZ - absScaleY / 2});
                this.addDot({x: startX - absScaleX / 2,y: 0, z: startZ + absScaleY / 2});
                this.addDot({x: startX - absScaleX / 2,y: 0, z: startZ - absScaleY / 2});
            } else if (this.selectedAxes.x) {
                const absScaleX = Math.abs(this.squareOperation.value.scale.x);
                const absScaleY = Math.abs(this.squareOperation.value.scale.y);
                const startZ = this.squareOperation.start.z;
                const startX = this.squareOperation.start.x;

                this.addDot({x: 0, y: startX + absScaleX / 2, z: startZ + absScaleY / 2});
                this.addDot({x: 0, y: startX + absScaleX / 2, z: startZ - absScaleY / 2});
                this.addDot({x: 0, y: startX - absScaleX / 2, z: startZ + absScaleY / 2});
                this.addDot({x: 0, y: startX - absScaleX / 2, z: startZ - absScaleY / 2});
            } else if (this.selectedAxes.z) {
                const absScaleX = Math.abs(this.squareOperation.value.scale.x);
                const absScaleY = Math.abs(this.squareOperation.value.scale.y);
                const startZ = this.squareOperation.start.z;
                const startX = this.squareOperation.start.x;

                this.addDot({x: startX + absScaleX / 2,y: startZ + absScaleY / 2, z: 0});
                this.addDot({x: startX + absScaleX / 2,y: startZ - absScaleY / 2, z: 0});
                this.addDot({x: startX - absScaleX / 2,y: startZ + absScaleY / 2, z: 0});
                this.addDot({x: startX - absScaleX / 2,y: startZ - absScaleY / 2, z: 0});
            }
            // сбрасываем операцию
            this.selectedOperations.square = false;
            this.storeDispatch("helper/setLine", "", {root: true})
            this.storeDispatch("panel/disableOperation", FlagAliasesReversed["square"], {root: true})
            this.squareOperation.status = null;
            this.squareOperation.value = null;
            this.squareOperation.dot = null;
            this.squareOperation.start = { x: null, y: null, z: null }
        }
    }

    operationClickCircle = (vector) => {
        if (this.circleOperation.status === null) {
            const circleGeometry = new THREE.CircleGeometry( 1, 32 );
            const circleMaterial = new THREE.MeshBasicMaterial( {color: 0x6c6c6c, side: THREE.DoubleSide, wireframe: true} );
            const circle = new THREE.Mesh( circleGeometry, circleMaterial );

            circle.position.x = vector.x;
            circle.position.y = vector.y;
            circle.position.z = vector.z;

            if (this.selectedAxes.x) {
                circle.rotation.y = (Math.PI / 2);
            } else if (this.selectedAxes.y) {
                circle.rotation.x = (Math.PI / 2);
            }

            this.circleOperation.start.x = vector.x;
            this.circleOperation.start.y = vector.y;
            this.circleOperation.start.z = vector.z;

            this.addDot(vector) // добавляем центральную точку в массив магнитова

            this.circleOperation.value = circle;
            this.circleOperation.status = "hasCircle";
            this.storeDispatch("helper/setLine", UserHelp.circle.clickForEnd, {root: true})
            // TODO нужно удалить точку
            this.add( circle );
        } else if (this.circleOperation.status === "hasCircle") {
            // сбрасываем операцию
            this.selectedOperations.circle = false;
            this.storeDispatch("helper/setLine", "", {root: true})
            this.storeDispatch("panel/disableOperation", FlagAliasesReversed["circle"], {root: true})
            this.circleOperation.status = null;
            this.circleOperation.value = null;
            this.circleOperation.dot = null;
            this.circleOperation.start = { x: null, y: null, z: null }
        }
    }

    addDot = ({x: vX,y: vY,z: vZ}) => {
        const [x,y,z] = this.dotsArray;

        this.dotsArray = [
            [...x, vX],
            [...y, vY],
            [...z, vZ]
        ];
    }

    mouseMove = (e) => {
        this.operationMoveProxy(this.cursorPositionProxy(this.getNativePosition(e)));
    }

    clickHandler = (e) => new Promise((resolve, reject) => {
        try {
            this.operationClickProxy(this.cursorPositionProxy(this.getNativePosition(e)));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })

    setAxis = (key) => {
        switch (key) {
            case "xy":
                this.camera.position.x = 0;
                this.camera.position.y = 0;
                this.camera.position.z = 1;
                this.selectedAxes = {
                    x: false,
                    y: false,
                    z: true,
                }
                break;
            case "xz":
                this.camera.position.x = 0;
                this.camera.position.z = 0;
                this.camera.position.y = -1;
                this.selectedAxes = {
                    x: false,
                    y: true,
                    z: false,
                }
                break;
            case "yz":
                this.camera.position.x = -1;
                this.camera.position.z = 0;
                this.camera.position.y = 0;
                this.selectedAxes = {
                    x: true,
                    y: false,
                    z: false,
                }
                break;
        }
        this.camera.lookAt(new Vector3(0, 0, 0))
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
                this.storeDispatch("tree/setTree", this.getChildrensArray(), {root: true})
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })

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
            !this.hasAxis() && this.setAxis("xy"); // если не выбрана плоскость выбирает XY
            this.enableOrbitControls(false);
            this.selectedOperations[operationName] = flag;
        } else {
            console.warn("Unknown operation")
        }
    }

    hasAxis = () => {
        return Object.values(this.selectedAxes).some(i => i);
    }

    removeAllOperations = () => {
        Object.keys(this.selectedOperations).forEach(key =>
            this.selectedOperations[key] = false)
    }

    exportScene = ({type, name}) => {
        switch (type) {
            case "GLTF":
                return exportGLTF(name, this.scene);
            case 'Collada':
                return exportCollada(name, this.scene);
            case 'DRACO':
                return exportDRACO(name, this.scene);
            case 'MMD':
                return exportMMD(name, this.scene);
            case 'OBJ':
                return exportOBJ(name, this.scene);
            case 'PLY':
                return exportPLY(name, this.scene);
            case 'STL':
                return exportSTL(name, this.scene);
            case 'USDZ':
                return exportUSDZ(name, this.scene);
            default:
                break;
        }
    }

    getSceneJSON = () => new Promise((resolve, reject) => {
        try {
            const json = JSON.stringify(this.scene.toJSON());
            resolve(json);
        } catch (error) {
            reject(error);
        }
    })
}