export default `#version 300 es
precision highp float;

uniform sampler2D uSampler;

in vec4 vColor;
in vec4 vLightSpacePos;
out vec4 outColor;

vec3 shadowCalculation(vec4 lightSpacePos) {
     vec3 projCoords = lightSpacePos.xyz / lightSpacePos.w;
     projCoords = (projCoords * 0.5) + 0.5;

     return projCoords;
}

void main() {
    // TODO: compute shadowmap coordenates 
    // TODO: evaluate if point is in shadow or not
    vec3 projCoords = shadowCalculation(vLightSpacePos);
    float closestDepth = texture(uSampler, projCoords.xy).r;
    float currentDepth = projCoords.z;
    float shadow = 0.0;
    vec2 texelSize;
    texelSize.x = float(1 / textureSize(uSampler , 0).x);
    texelSize.y = float(1 / textureSize(uSampler , 0).y);
    for(int x = -1; x <= 1; ++x)
    {
        for(int y = -1; y <= 1; ++y)
        { 
            float pcfDepth = texture(uSampler, projCoords.xy + vec2(x, y) * texelSize).r;
            shadow += currentDepth - .007 > pcfDepth ? 1.0 : 0.0;
        }
    }
    shadow /= 9.0;
    outColor = vec4(vColor.rgb * (1.0-shadow), 1.0);
}
`;