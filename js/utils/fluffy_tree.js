import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';  // Import DRACOLoader
import { vertexShader, fragmentShader } from './GhibliShader.js';

export function loadTrees(scene) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();  // Create a DRACOLoader instance
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');  // Set the path to Draco decoder files

    loader.setDRACOLoader(dracoLoader);  // Set DRACOLoader for GLTFLoader

    loader.load('../js/assets/trees.glb', function(gltf) {
        const nodes = gltf.scene.children;

        const uniforms = {
            colorMap: {
                value: [
                    new THREE.Color("#427062"),
                    new THREE.Color("#33594E"),
                    new THREE.Color("#234549"),
                    new THREE.Color("#1E363F"),
                ],
            },
            brightnessThresholds: {
                value: [0.9, 0.45, 0.001],
            },
            lightPosition: { value: new THREE.Vector3(15, 15, 15) },
        };

        nodes.forEach(node => {
            if (node.name === 'Foliage') {
                const material = new THREE.ShaderMaterial({
                    vertexShader: vertexShader,
                    fragmentShader: fragmentShader,
                    uniforms: uniforms,
                });

                const mesh = new THREE.Mesh(node.geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.position.set(0.33, -0.05, -0.68);
                scene.add(mesh);
            }
        });
    }, undefined, function(error) {
        console.error('An error happened while loading the model:', error);
    });
}
