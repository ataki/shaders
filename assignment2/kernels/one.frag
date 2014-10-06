// phong.frag

/*
  This fragment implements the Phong Reflection model.
*/

varying vec3 modelPos;    // fragment position in model space
varying vec3 lightSourcePos; // light source position in model space
varying vec3 normal;	  // fragment normal in model space

void main()
{
    vec3 C = vec3(0.0, 0.0, 0.0); // camera position
    
    vec3 finalColor = vec3(0.0, 0.0, 0.0); // stores final color
    
    for (int i = 0; i < 2; i++) {
        vec3 lightAmbient  = gl_LightSource[i].ambient.xyz;
        vec3 lightDiffuse  = gl_LightSource[i].diffuse.xyz;
        vec3 lightSpecular = gl_LightSource[i].specular.xyz;
        
        vec3 materialAmbient = gl_FrontMaterial.ambient.xyz;
        vec3 materialDiffuse = gl_FrontMaterial.diffuse.xyz;
        vec3 materialSpecular  = gl_FrontMaterial.specular.xyz;
        float shininess    = gl_FrontMaterial.shininess;
//        printf ("shininess: %f", shininess);
        
        /* CS 148 TODO: Implement the Phong reflectance model here */
        vec3 Lm = normalize(lightSourcePos-modelPos);
        vec3 Rm = normalize(reflect(-Lm,normal));
        vec3 V = normalize(-modelPos);
        
        vec3 colorAmbient = materialAmbient*lightAmbient;
        vec3 colorDiffuse = clamp(max(dot(Lm,normal),0.0)*materialDiffuse*lightDiffuse,0.0,1.0);
        vec3 colorSpecular = clamp(pow(max(dot(Rm,V),0.0),shininess)*materialSpecular*lightSpecular,0.0,1.0);
        
        vec3 color = colorAmbient + colorDiffuse + colorSpecular;
        finalColor += clamp(color, 0.0, 1.0);
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
