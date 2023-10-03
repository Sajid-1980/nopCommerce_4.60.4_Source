let scene, camera, renderer, controls;
let object;
let meshes = [];
let pointLight;
let lightAngle = 0;
let spotlight;
let rotationComplete = false;
const textureWidth = 500; // Replace with the actual width of your texture image
const textureHeight = 336; // Replace with the actual height of your texture image

function init() {
    // Create the scene and set the background color to white
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Create a PointLight
    pointLight = new THREE.PointLight(0xffffff, 1, 200);
    scene.add(pointLight);

    // Create a spotlight with a larger angle to cover the whole model
    spotlight = new THREE.SpotLight(0xffffff, 1, 1000);
    scene.add(spotlight);
    spotlight.castShadow = true;
    scene.add(spotlight);

    // Configure shadow properties for the spotlight
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.near = 500;
    spotlight.shadow.camera.far = 4000;
    spotlight.shadow.camera.fov = 30;
    let initialFOV = 45;
    let currentFOV = initialFOV;
    // Create the camera and position it to look at the center of the scene
    camera = new THREE.PerspectiveCamera(currentFOV, 600 / 500, 2, 2000);
    camera.position.z = 300;
    camera.lookAt(scene.position);

    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp', maxAnisotropy: 16 });
    renderer.setSize(750, 600);
    var modelrc = document.getElementById('modal');
    modelrc.appendChild(renderer.domElement);

    // Enable shadow mapping in the renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

    // Create the controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    function loadModel() {
        // Get the dimensions of the bounding box
        const boundingBox = new THREE.Box3().setFromObject(object);
        const width = boundingBox.max.x - boundingBox.min.x;
        const height = boundingBox.max.y - boundingBox.min.y;

        const tilingFactorU = width / textureWidth; // Adjust textureWidth to match your texture's dimensions
        const tilingFactorV = height / textureHeight; // Adjust textureHeight to match your texture's dimensions
        object.traverse(function (child) {
            if (child.isMesh) {
                // Access the geometry
                const geometry = child.geometry;
                console.log("gemotry", geometry);
                // Modify the UVs for the geometry
                geometry.attributes.uv.array.forEach(function (uv, index) {
                    // Adjust the UV coordinates here
                    // For example, to tile the texture 4 times both horizontally and vertically:
                    //uv *= 3; // Adjust the tiling factor as needed
                    //geometry.attributes.uv.array[index] = uv;
                   // geometry.attributes.uv.array[index] = uv * 4;
                    geometry.attributes.uv.array[index] = uv * tilingFactorU;
                    geometry.attributes.uv.array[index + 1] = uv * tilingFactorV;
                });

                // Ensure the UVs are updated
                geometry.attributes.uv.needsUpdate = true;

                // Apply the texture to the material
                child.material.map = texture_1;

                // Set the material properties including shadows (optional)
                child.material.side = THREE.DoubleSide; // Double-sided material
                child.material.shadowSide = THREE.DoubleSide; // Enable double-sided shadow casting and receiving
                child.material.color = new THREE.Color(0xffffff); // Material color
            }
        });

        object.position.y = -60;
        scene.add(object);
        const modelPositionX = object.position.x;
        const modelPositionY = object.position.y;
        const modelPositionZ = object.position.z;
        console.log("x postion", modelPositionX, "Y position", modelPositionY, "Z postion", modelPositionZ);
    }

    // Texture
    const manager = new THREE.LoadingManager(loadModel);
    const textureLoader = new THREE.TextureLoader(manager);
    const texture_1 = textureLoader.load('/alqeemz/fabrics/0n6cm8f22tpt967b.jpg');

    // Load the OBJ file
    var material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        shadowSide: THREE.DoubleSide, // Enable double-sided shadow casting and receiving
    });
    const loader = new THREE.OBJLoader(manager);
    loader.load(
        '/kurta_salwar/untitled.obj',
        (obj) => {
            object = obj;
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    meshes.push(child);
                    child.material = material;
                    child.receiveShadow = true; // Enable shadow receiving for the object
                }
            });

            // Center the object in the scene
            const box = new THREE.Box3().setFromObject(obj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            obj.position.sub(center);
            scene.add(obj);
            // Start the rotation animation once the model is loaded
            rotationComplete = false;
        },
        (xhr) => {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error(error);
        }
    );

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(-1, 0, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(1, 0, -1);
    scene.add(directionalLight2);

    // ... (rest of your code remains the same)

    // Add a resize event listener to update the renderer when the window is resized
    window.addEventListener('resize', () => {
        camera.aspect = 600 / 500;
        camera.updateProjectionMatrix();
        renderer.setSize(600, 500);
    });

    //change fabric
    var fabirc = document.querySelectorAll('.fabrics');
    fabirc.forEach(function (fabirc) {
        fabirc.addEventListener('click', function (event) {
            // Prevent the default link behavior
            event.preventDefault();
            // Get the image element within the anchor
            var image = fabirc.querySelector('img');
            // Retrieve the value of the src attribute
            var src = image.getAttribute('src');
            // Retrieve the value of the data-id attribute
            var dataId = this.getAttribute('data-id');
            // Create a new instance of TextureLoader
            var textureLoader = new THREE.TextureLoader();
            // Load the texture dynamically using TextureLoader
            textureLoader.load(src, function (texture) {
                object.traverse(function (child) {
                    if (child.isMesh) {
                        child.material.map = texture;
                    }
                });
                object.position.y = -60;
                scene.add(object);
            }, undefined, function (error) {
                // Error occurred while loading the texture
                console.error('Error loading texture:', error);
            });
            // Output the value
            console.log(dataId);
        });
    });
    //zoom
    // Function to zoom in
    function zoomIn() {
        if (currentFOV > 10) {
            currentFOV -= 5; // You can adjust the zoom increment as needed
            camera.fov = currentFOV;
            camera.updateProjectionMatrix();
        }
    }

    // Function to zoom out
    function zoomOut() {
        if (currentFOV < 100) {
            currentFOV += 5; // You can adjust the zoom increment as needed
            camera.fov = currentFOV;
            camera.updateProjectionMatrix();
        }
    }
    // Create zoom in button
    const zoomInButton = document.getElementById('zoom-in-button');
    zoomInButton.addEventListener('click', zoomIn);

    // Create zoom out button
    const zoomOutButton = document.getElementById('zoom-out-button');
    zoomOutButton.addEventListener('click', zoomOut);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (object && !rotationComplete) {
        // Continue animating
        object.rotation.y += 0.01; // Adjust the rotation speed as needed

        // Stop the rotation animation after one complete rotation (360 degrees)
        if (object.rotation.y >= Math.PI * 2) {
            rotationComplete = true;
        }
    }
    // Update the position of the PointLight to create a circular path
    const radius = 200; // Adjust the radius as needed
    const speed = 0.005; // Adjust the speed as needed
    lightAngle += speed;
    const x = Math.cos(lightAngle) * radius;
    const z = Math.sin(lightAngle) * radius;
    pointLight.position.set(x, 50, z);
    renderer.render(scene, camera);
}

init();
animate();
