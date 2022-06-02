import { downloadObjectAsJson } from '@/assets/helper';
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"
import { ColladaExporter } from "three/examples/jsm/exporters/ColladaExporter"
import { DRACOExporter } from "three/examples/jsm/exporters/DRACOExporter"
import { MMDExporter } from "three/examples/jsm/exporters/MMDExporter"
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter"
import { PLYExporter } from "three/examples/jsm/exporters/PLYExporter"
import { STLExporter } from "three/examples/jsm/exporters/STLExporter"
import { USDZExporter } from "three/examples/jsm/exporters/USDZExporter"

export const exportGLTF = (name, scene) => {
    exporter(new GLTFExporter(), name, scene);
}

export const exportCollada = (name, scene) => {
    exporter(new ColladaExporter(), name, scene);
}

export const exportDRACO = (name, scene) => {
    exporter(new DRACOExporter(), name, scene);
}

export const exportMMD = (name, scene) => {
    exporter(new MMDExporter(), name, scene);
}

export const exportOBJ = (name, scene) => {
    exporter(new OBJExporter(), name, scene);
}

export const exportPLY = (name, scene) => {
    exporter(new PLYExporter(), name, scene);
}

export const exportSTL = (name, scene) => {
    exporter(new STLExporter(), name, scene);
}

export const exportUSDZ = (name, scene) => {
    exporter(new USDZExporter(), name, scene);
}

const exporter = (instance, name, scene) => {
    instance.parse(
        scene,
        ( data ) => {
            console.log( data );
            downloadObjectAsJson(data , name);
        },
        ( error ) => {
            console.warn( 'An error happened', error);
        },
        {}
    );
}