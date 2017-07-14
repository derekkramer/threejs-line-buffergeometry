// Initialize the scene, camera, and global variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
let line;
const MAX_POINTS = 1000;
let drawCount;

// Position the camera back
camera.position.z = 100;

// Initialize the renderer and append to the HTML
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// geometry
const geometry = new THREE.BufferGeometry();

const shipGeo = new THREE.SphereGeometry(12, 32, 32);
const shipMat = new THREE.MeshPhongMaterial();
const ship = new THREE.Mesh(shipGeo, shipMat);
scene.add(ship);

// attributes
const positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

// drawcalls
drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);

// material
const material = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 10});

// line
line = new THREE.Line(geometry, material);
scene.add(line);

// console.log(line.geometry.attributes.position);
// console.log(line.geometry.getAttribute('position'));

let x = y = z = index = 0;

updatePositions();

// Create and add lights to the scene
// const ambientLight = new THREE.AmbientLight(0x404040, 2);
// scene.add(ambientLight);

// Start the rendering loop
// render();

// The render loop
function render() {
    // requestAnimationFrame(render);
    renderer.render(scene, camera);
}

// update positions
function updatePositions() {

    let positions = line.geometry.attributes.position.array;

    var step = (2 * Math.PI) / (MAX_POINTS / 4);
    var r = 20;
    var takeoff = MAX_POINTS / 10;
    var orbitJump = MAX_POINTS / 2;
    var orbitLand = orbitJump * 1.2;

    for(var theta = 0; theta < 2 * Math.PI; theta += step){

        let modifier = 1;

        if(theta < takeoff * step){
            modifier = (Math.sqrt(theta) / Math.sqrt(takeoff * step)) * 0.4 + 0.6;
        }

        x = r * Math.cos(theta) * modifier;
        y = r * Math.sin(theta) * modifier;
        z = 1;

        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;
    }

    for(var theta = 0; theta < 2 * Math.PI; theta += step){

        let modifier = 1;

        x = r * Math.cos(theta) * modifier;
        y = r * Math.sin(theta) * modifier;
        z = 1;

        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;
    }

    for(var theta = 0; theta < 2 * Math.PI; theta += step){

        let modifier = 1;
        let ellipseModifier = 1;

        if(theta > 1.5 * Math.PI){
            ellipseModifier = 1.5;
        }

        x = r * ellipseModifier * Math.cos(theta) * modifier;
        y = r * 1.5 * Math.sin(theta) * modifier;
        z = 1;

        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;
    }

    for(var theta = 0; theta < 2 * Math.PI; theta += step){

        let modifier = 1;

        x = r * 1.5 * Math.cos(theta) * modifier;
        y = r * 1.5 * Math.sin(theta) * modifier;
        z = 1;

        positions[index++] = x;
        positions[index++] = y;
        positions[index++] = z;
    }
}

// animate
function animate() {

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 20);

    drawCount = (drawCount + 1) % MAX_POINTS;

    line.geometry.setDrawRange(0, drawCount);

    if (drawCount === 0) {

        // periodically, generate new data

        updatePositions();

        line.geometry.attributes.position.needsUpdate = true; // required after the first render

        line.material.color.setHSL(Math.random(), 1, 0.5);

    }

    render();

}

animate();
