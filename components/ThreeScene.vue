<template>
  <div ref="sceneContainer" style="width: 100%; height: 100vh"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // Create scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      this.$refs.sceneContainer.appendChild(renderer.domElement);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Set clear color to transparent

      // Load local texture (served from static folder)
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("/mono.png", (texture) => {
        // Callback to confirm texture is loaded
        console.log('Texture loaded', texture);
      }, undefined, (error) => {
        console.error('Error loading texture:', error);
      });

      // Create a sphere with the texture
      const geometry = new THREE.SphereGeometry(3, 128, 128); // Earth size
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const earth = new THREE.Mesh(geometry, material);
      scene.add(earth);

      // Keep the Earth in the middle of the screen
      earth.position.set(0, 0, 0);

      // Position the camera
      camera.position.set(0, 0, 10); // Ensure the Earth is fully visible

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
      directionalLight.position.set(5, 5, 5); // Position of light
      scene.add(directionalLight);

      // OrbitControls to allow spinning without zooming or panning
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false; // Disable zoom
      controls.enablePan = false; // Disable panning (keeps the Earth fixed in place)

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.005; // Optional: make the Earth rotate automatically
        controls.update(); // Allow user to spin the Earth
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    },
  },
};
</script>


<style scoped>
.scene-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3; /* Make sure it's on top */
}
</style>
