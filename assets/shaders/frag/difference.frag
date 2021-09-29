uniform sampler2D tex1;
uniform sampler2D tex2;

varying vec2 vTextureCoord;

void main() {
   vec4 c1 = texture2D(tex1, vTextureCoord);
   vec4 c2 = texture2D(tex2, vTextureCoord);

//    gl_FragColor = vec4(c1.rgb-c2.rgb, 1);
   gl_FragColor = c1 - c2;
}