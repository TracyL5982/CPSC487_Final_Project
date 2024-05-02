// import * as THREE from 'three';
// //import vertexShader from './vertex.glsl.js';

// export function createFoliageGeometry() {
//     const textureLoader = new THREE.TextureLoader();
//     const alphaMap = textureLoader.load('https://douges.dev/static/foliage_alpha3.png', 
//         () => console.log('Alpha map loaded successfully.'),
//         undefined,
//         err => console.error('Failed to load alpha map:', err)
//     );

//     const uniforms = {
//         u_effectBlend: { value: 1.0 },
//         u_remap: { value: 0.0 },
//         u_normalize: { value: 0.0 },
//         alphaMap: { value: alphaMap }
//     };

//     const fragmentShader = `
//     precision highp float;
//     uniform sampler2D alphaMap;
//     uniform vec4 color;
//     void main() {
//         vec4 textureColor = texture2D(alphaMap, gl_FragCoord.xy);
//         gl_FragColor = vec4(0.3, 0.9, 0.3, 1.0) * textureColor;
//     }`;

//     const material = new THREE.ShaderMaterial({
//         uniforms: uniforms,
//         vertexShader: vertexShader,
//         fragmentShader: fragmentShader,
//         transparent: true
//     });

//     const geometry = new THREE.PlaneGeometry(1, 1);
//     return { geometry, material };
// }

import * as THREE from 'three';
import vertexShader from './vertex.glsl.js';

export function createFoliageGeometry() {
    const textureLoader = new THREE.TextureLoader();
    const alphaMap = textureLoader.load('https://douges.dev/static/foliage_alpha3.png',
        () => console.log('Alpha map loaded successfully.'),
        undefined,
        err => console.error('Failed to load alpha map:', err)
    );

    const uniforms = {
        u_effectBlend: { value: 1.0 },
        alphaMap: { value: alphaMap }
    };

    // Simplified shader for testing
    const simplifiedVertexShader = `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`;

    const simplifiedFragmentShader = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color for visibility
        }`;

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: simplifiedVertexShader,
        fragmentShader: simplifiedFragmentShader,
        transparent: true
    });

    console.log('Uniforms set:', uniforms);
    console.log('Material created with simplified shaders.');

    const geometry = new THREE.PlaneGeometry(1, 1);
    console.log('Geometry size:', geometry.parameters.width, 'x', geometry.parameters.height);

    return { geometry, material };
}
