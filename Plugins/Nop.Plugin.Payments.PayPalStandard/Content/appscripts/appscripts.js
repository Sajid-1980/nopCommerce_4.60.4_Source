let scene, camera, renderer, controls;
let object;
let meshes = [];

function init() {
    // Create the scene and set the background color to white
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Create the camera and position it to look at the center of the scene
    camera = new THREE.PerspectiveCamera(45, 600 / 500, 1, 2000);
    camera.position.z = 200;
    camera.lookAt(scene.position);
    console.log("comara",camera);
    console.log("width", window.innerWidth, "height", window.innerHeight);
    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp', maxAnisotropy: 16 });
    renderer.setSize(600, 500);
    var abc = document.getElementById('modal');
    //document.body.appendChild(renderer.domElement);
    abc.appendChild(renderer.domElement);
    // Create the controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    function loadModel() {
        object.traverse(function (child) {
            if (child.isMesh) child.material.map = texture_1;
        });
        object.position.y = - 85;
        scene.add(object);
    }
    // texture
    const manager = new THREE.LoadingManager(loadModel);
    const textureLoader = new THREE.TextureLoader(manager);
    const texture_1 = textureLoader.load('/alqeemz/1.jpg');
    // Load the OBJ file
    var material = new THREE.MeshPhysicalMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const loader = new THREE.OBJLoader(manager);
    loader.load(
        '/kurta_salwar/untitled.obj',
        (obj) => {
            object = obj;
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    console.log("childs", child);
                    meshes.push(child);
                    child.material = material;
                }
            });
            // Center the object in the scene
            const box = new THREE.Box3().setFromObject(obj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            obj.position.sub(center);
            scene.add(obj);
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
    //change fabric
    var fabirc = document.querySelectorAll('.fabrics');
   /* console.log("fabric", fabirc);*/
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
                object.position.y = -85;
                scene.add(object);
            }, undefined, function (error) {
                // Error occurred while loading the texture
                console.error('Error loading texture:', error);
            });

            // Output the value
            console.log(dataId);
        });
    });
 
    // Add a resize event listener to update the renderer when the window is resized
    window.addEventListener('resize', () => {
        camera.aspect = 600 / 500;
        camera.updateProjectionMatrix();
        renderer.setSize(600, 500);
    });

    // Change colors
    const changecolor = document.getElementById('changecolor');
    changecolor.addEventListener('input', function () {
        var selectcolor = this.value;
        //console.log("colors",selectcolor);
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                var color = new THREE.Color(selectcolor);
                child.material.color = color;
            }
        });

    });
    //mesh shalwar show and hide
    var showhide = document.getElementById('shalwar');
    showhide.addEventListener('click', function () {
        console.log("showsabc");
        var meshName = 'WALLET_POCKET_RetopoFlow.006'; // Replace with the name of the mesh you want to show/hide
        // Find the mesh with the specified name
        var mesh = meshes.find(function (mesh) {
            return mesh.name === meshName;
        });
        // Toggle the visibility of the mesh if found
        if (mesh) {
            mesh.visible = !mesh.visible;
            console.log("showsabc", mesh);
        }
    });
    //mesh shalwar show and hide
    var showhide = document.getElementById('Kurta');
    showhide.addEventListener('click', function () {
        var meshName = 'Kurta_only'; // Replace with the name of the mesh you want to show/hide
        // Find the mesh with the specified name
        var mesh = meshes.find(function (mesh) {
            return mesh.name === meshName;
        });
        // Toggle the visibility of the mesh if found
        if (mesh) {
            mesh.visible = !mesh.visible;
            //const zoomDuration = 400; // Duration of the zoom animation in milliseconds
            //const zoomDistance = 50; // Distance to zoom in
            //const targetPosition = mesh.position.clone().normalize().multiplyScalar(zoomDistance);
            //const initialPosition = camera.position.clone();
            //const initialFOV = camera.fov;
            //let currentTime = 0;
            //let zoomTimer; // Variable to store the timer
            //function animateZoom() {
            //    currentTime += 1;
            //    const progress = Math.min(currentTime / zoomDuration, 1); // Calculate the progress as a value between 0 and 1
            //    const newPosition = initialPosition.clone().lerp(targetPosition, progress);
            //    camera.position.copy(newPosition);
            //    const newFOV = initialFOV - (initialFOV * progress);
            //    camera.fov = newFOV;
            //    camera.updateProjectionMatrix();
            //    if (currentTime < 45) {
            //        zoomTimer = requestAnimationFrame(animateZoom);
            //    }
            //}
            //animateZoom();
            //// To stop the zoom animation
            //function stopZoom() {
            //    cancelAnimationFrame(zoomTimer);
            //}
        }
    });

    //change collar
    var collar = document.querySelectorAll('.colars');
    console.log("collar", collar);
    collar.forEach(function (collar) {       
        collar.addEventListener('click', function (event) {
            // Prevent the default link behavior
            event.preventDefault();
            var dataId = this.getAttribute('data-id');
            console.log("collar_id", dataId);
            var meshName = dataId; // Replace with the name of the mesh you want to show/hide
            // Find the mesh with the specified name
            var mesh = meshes.find(function (mesh) {
                return mesh.name === meshName;
            });
            // Toggle the visibility of the mesh if found
            if (mesh) {
                mesh.visible = !mesh.visible;
            }
        });
    });
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();
animate();