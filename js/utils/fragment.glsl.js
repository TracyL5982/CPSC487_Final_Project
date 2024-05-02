// Simple Fragment Shader
const fragmentShader = `
precision highp float;

uniform vec3 u_color; // Color passed as a uniform

void main() {
    gl_FragColor = vec4(u_color, 1.0);
}
`;
export default fragmentShader;