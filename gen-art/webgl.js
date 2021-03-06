// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const eases = require('eases');
const BezierEasing = require('bezier-easing');

const settings = {
  // set dimentions for gif export
  dimensions: [512, 512],
  fps: 24, 
  duration: 4,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color

  renderer.setClearColor("hsl(0, 0%, 95%)", 1.0); 

  // Setup a camera
  const camera = new THREE.OrthographicCamera();


  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // Setup a color palette
  const palette = random.pick(palettes);

  for (let i = 0; i < 40; i++) {
    // Setup a mesh with geometry + material
    const mesh = new THREE.Mesh(geometry,  
      // we changed the mesh to obby lighting rules (basic ignores light)
      new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    }));
    mesh.position.set(
      random.range(-0.85, 0.9), // x
      random.range(-0.85, 0.9), // y
      random.range(-0.85, 0.9), // z
    );
    mesh.scale.set(
      random.range(-0.85, 0.9), // x
      random.range(-0.85, 0.9), // y
      random.range(-0.85, 0.9), // z
    );

    mesh.scale.multiplyScalar(0.45);
    scene.add(mesh);
  }

  // add ambient light 
  // we add ambient light to make the dark areas that don't get light have a different color
  scene.add(new THREE.AmbientLight('hsl(0, 0%, 40%)'));
  // add a light
  const light = new THREE.DirectionalLight('white', 1); // direction light acts like the sun and the places that don't get sunlight are black
  light.position.set(0, 0, 2);
  scene.add(light);

  const easeFn = BezierEasing(0.67,0.03,0.29,0.99);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      
      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 1.5;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },

    // Update & render your scene here
    render({ playhead }) {
      const t = Math.sin(playhead * Math.PI);
      scene.rotation.z = easeFn(t);
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
