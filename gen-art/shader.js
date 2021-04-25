const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  // dimensions: [1024, 1024],
  context: 'webgl',
  animate: true
};

// Your glsl code
const frag = glsl(/* glsl */`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    // 1. we can play around with the color and give it a variable which eilds interesting color animation
    vec3 colorA = sin(time) + vec3(0.792,0.02,0.302);
    vec3 colorB = vec3(0.643,0.831,0.706);

    vec2 center = vUv - 0.5;
    center.x *= aspect;
    float dist = length(center);

    // 2. we can play with the gradient by changing the vUv to y or even x + y
    // and better yet to checg directions multiply by the time of course a sign function
    vec3 color = mix(colorA, colorB, vUv.y + vUv.x * cos(time));

    // we have a rigid transition from 0 to 1 and that's why we don't have a smooth circle 
    // to fix that we do a smooth transition 
    // this is a step function it says if the first param is less that the second one return 0 otherwise 1
    // float alpha = step(dist, 0.25);
    // now the top did nothing diffrent from what we had before, so instead of it we'll use a function called smoothStep
    float alpha = smoothstep(0.255, 0.25, dist);

    gl_FragColor = vec4(color, alpha); 
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    // set the background
    clearColor: 'white', // if set to false I get a clear transparent background
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspect: ({ width, height}) => width / height,
    }
  });
};

canvasSketch(sketch, settings);
