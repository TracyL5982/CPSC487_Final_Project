// // foliage.js
// import * as THREE from 'three';
// import vertexShader from './vertex.glsl.js';
// import fragmentShader from './fragment.glsl.js';

// export function createFoliageMaterial() {
//     const textureLoader = new THREE.TextureLoader();
//     const alphaMap = textureLoader.load('../js/assets/foliage_alpha3.png', () => {
//         console.log('Alpha map loaded successfully.');
//     }, undefined, () => {
//         console.error('Error loading alpha map.');
//     });

//     const uniforms = {
//         u_effectBlend: { value: 1.0 },
//         u_inflate: { value: 0.0 },
//         u_scale: { value: 1.0 },
//         u_windSpeed: { value: 1.0 },
//         u_windTime: { value: 0.0 },
//         alphaMap: { value: alphaMap }
//     };

//     const material = new THREE.ShaderMaterial({
//         uniforms: uniforms,
//         vertexShader: vertexShader,
//         fragmentShader: fragmentShader,
//         transparent: true,
//         side: THREE.FrontSide
//     });

//     // Shader compilation debug
//     material.onBeforeCompile = (shader) => {
//         console.log('Vertex Shader:\n', shader.vertexShader);
//         console.log('Fragment Shader:\n', shader.fragmentShader);
//     };

//     // Update wind effect over time
//     function updateMaterial(delta) {
//         uniforms.u_windTime.value += uniforms.u_windSpeed.value * delta;
//         material.needsUpdate = true; 
//     }

//     return { material, updateMaterial };
// }

import * as THREE from 'three';
import { createFoliageGeometry } from './foliage_geometry.js';  // Verify this path is correct

export function createFoliage() {
    const { geometry, material } = createFoliageGeometry();
    const mesh = new THREE.Mesh(geometry, material);
    console.log('Mesh created and added to scene:', mesh);
    return mesh;
}
