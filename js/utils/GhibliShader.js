// GhibliShader.js
//import { Color, Vector3 } from "three";

export const uniforms = {
  modelMatrix: { type: "m4", value: null },
  viewMatrix: { type: "m4", value: null },
  projectionMatrix: { type: "m4", value: null },
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


export const vertexShader = `
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vPosition, 1.0);
}`;

export const fragmentShader = `
uniform vec3 colorMap[4];
uniform float brightnessThresholds[3];
uniform vec3 lightPosition;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 lightVector = normalize(lightPosition - vPosition);
    float brightness = max(dot(vNormal, lightVector), 0.0);
    vec3 color = colorMap[3]; // Default to darkest color
    if (brightness > brightnessThresholds[0]) color = colorMap[0];
    else if (brightness > brightnessThresholds[1]) color = colorMap[1];
    else if (brightness > brightnessThresholds[2]) color = colorMap[2];
    gl_FragColor = vec4(color, 1.0);
}`;


// export const uniforms = {
//   colorMap: {
//     value: [
//       new Color("#427062"),
//       new Color("#33594E"),
//       new Color("#234549"),
//       new Color("#1E363F"),
//     ],
//   },
//   brightnessThresholds: {
//     value: [0.9, 0.45, 0.001],
//   },
//   lightPosition: { value: new Vector3(15, 15, 15) },
// };

// export const vertexShader = `
// precision highp float;
// precision highp int;

// varying vec3 vNormal;
// varying vec3 vPosition;

// void main() {
//   vNormal = normal;
//   vPosition = position;

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }`;

// export const fragmentShader = `
// precision highp float;
// precision highp int;

// uniform vec3 colorMap[4];
// uniform float brightnessThresholds[3];
// uniform vec3 lightPosition;

// varying vec3 vNormal;
// varying vec3 vPosition;

// void main() {
//   vec3 worldPosition = (modelMatrix * vec4(vPosition, 1.0)).xyz;
//   vec3 worldNormal = normalize(vec3(modelMatrix * vec4(vNormal, 0.0)));
//   vec3 lightVector = normalize(lightPosition - worldPosition);
//   float brightness = dot(worldNormal, lightVector);
//   vec4 final;

//   if (brightness > brightnessThresholds[0])
//     final = vec4(colorMap[0], 1);
//   else if (brightness > brightnessThresholds[1])
//     final = vec4(colorMap[1], 1);
//   else if (brightness > brightnessThresholds[2])
//     final = vec4(colorMap[2], 1);
//   else
//     final = vec4(colorMap[3], 1);

//   gl_FragColor = final;
// }`;
