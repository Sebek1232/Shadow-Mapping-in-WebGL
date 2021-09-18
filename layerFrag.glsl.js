export default `#version 300 es
precision highp float;

uniform vec4 uColor;
in vec4 vColor;
out vec4 outColor;

void main() {
    outColor = uColor;
}
`;