// Load the GLB model
const loader = new THREE.GLTFLoader();
loader.load('LOGO_GREENTECH250424.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1); // adjust the scale to your liking

    // Create the AR scene
    const arScene = new AR.Scene();
    arScene.add(model);

    // Create the AR camera
    const arCamera = new AR.Camera();
    arCamera.aspect = window.innerWidth / window.innerHeight;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('ar-view'),
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        arScene.update();
        renderer.render(arScene, arCamera);
    }
    animate();

    // Add event listeners for device orientation
    window.addEventListener('deviceorientation', (event) => {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;

        // Rotate the model based on device orientation
        model.rotation.x = beta * Math.PI / 180;
        model.rotation.y = alpha * Math.PI / 180;
        model.rotation.z = gamma * Math.PI / 180;
    });
});
