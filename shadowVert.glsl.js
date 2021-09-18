export default `#version 300 es

uniform mat4 uModel;
uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uLightView;
uniform mat4 uLightProjection;
uniform vec4 uColor;
uniform vec3 uLightDir;
uniform bool uHasNormals;

in vec3 position;
in vec3 normal;

out vec4 vColor;
out vec4 vLightSpacePos;


void main() {

    if(uHasNormals)
    {
        float lightDot = dot(normalize(normal), normalize(uLightDir));
        vColor = uColor;
        vColor.rgb *= lightDot;
    }
    else 
    {
        vColor = uColor;
    }
    gl_Position = uProjection * uView * uModel * vec4(position, 1);
    vLightSpacePos = uLightProjection * uLightView * vec4(position, 1);
}
`;