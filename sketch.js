import * as THREE from './build/three.module.js';

import { OrbitControls } from './OrbitControls.js'

document.addEventListener('DOMContentLoaded', function() {
    //create a new scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.setClearColor('0x000000');
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 20, 75 );
    controls.update();

    //function to set size to responsive screen size
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect(window.innerWidth / window.innerHeight);
        camera.updateProjectionMatrix();
    });

    // const createPlanet = (planetTexture, radius, panels1, panels2, xPosition, rotation, planetName) => {
    //     const texture = new THREE.TextureLoader().load(planetTexture);
    //     const geometry = new THREE.SphereGeometry(radius, panels1, panels2);
    //     const material = new THREE.MeshLambertMaterial({map: texture});
    //     planetName = new THREE.Mesh(geometry, material);
    //     planetName.position.x = xPosition;
    //     planetName.rotation.y += rotation;
    //     scene.add(planetName);
    // }

    // createPlanet('textures/sun.jpg', 10, 100, 100, 0, 0, 'Sun');
    // createPlanet('textures/mercury.jpg', 1.5, 100, 100, 20, 0.03, 'Mercury');
    // createPlanet('textures/Venus.jpg', 2, 100, 100, 30, 0.004, 'Venus');

    const sunTexture = new THREE.TextureLoader().load( 'textures/sun.jpg' );
    const sunGeometry = new THREE.SphereGeometry(35, 100, 100);
    const sunMaterial = new THREE.MeshLambertMaterial({map: sunTexture });
    const Sun = new THREE.Mesh(sunGeometry, sunMaterial);
    Sun.name = 'Sun';
    scene.add(Sun);

    var Mercurytexture = new THREE.TextureLoader().load( 'textures/mercury.jpg' );
    const Mercurygeometry = new THREE.SphereGeometry(0.24, 100, 100);
    const Mercurymaterial = new THREE.MeshLambertMaterial({map: Mercurytexture});
    const Mercury = new THREE.Mesh(Mercurygeometry, Mercurymaterial);
    Mercury.name = 'Mercury';
    scene.add(Mercury);

    var Venustexture = new THREE.TextureLoader().load( 'textures/venus.jpg' );
    const Venusgeometry = new THREE.SphereGeometry(0.6, 100, 100);
    var Venusmaterial = new THREE.MeshBasicMaterial( { map: Venustexture} );
    const Venus = new THREE.Mesh(Venusgeometry, Venusmaterial);
    Venus.name = 'Venus';
    scene.add(Venus);

    var earthTexture = new THREE.TextureLoader().load( 'textures/earth.jpg' );
    const earthGeometry = new THREE.SphereGeometry(0.63, 100, 100);
    var earthMaterial = new THREE.MeshBasicMaterial( { map: earthTexture} );
    const Earth = new THREE.Mesh(earthGeometry, earthMaterial);
    Earth.name = 'Earth';
    scene.add(Earth);

    var marsTexture = new THREE.TextureLoader().load( 'textures/mars.jpg' );
    const marsGeometry = new THREE.SphereGeometry(0.33, 100, 100);
    var marsMaterial = new THREE.MeshBasicMaterial( { map: marsTexture} );
    const Mars = new THREE.Mesh(marsGeometry, marsMaterial);
    Mars.name = 'Mars';
    scene.add(Mars);

    var jupiterTexture = new THREE.TextureLoader().load( 'textures/mars.jpg' );
    const jupiterGeometry = new THREE.SphereGeometry(6.9, 100, 100);
    var jupiterMaterial = new THREE.MeshBasicMaterial( { map: jupiterTexture} );
    const Jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    Jupiter.name = 'Jupiter';
    scene.add(Jupiter);


    const starColor = ['#FFFFFF', '#FFF80B'];
    const stargeometry = new THREE.SphereGeometry(0.1, 40, 40);

    for (let i = 0; i < 4000; i++) {
        const starmaterial = new THREE.MeshLambertMaterial({color: randomItem});
        var randomItem = starColor[Math.floor(Math.random()*starColor.length)];
        const star = new THREE.Mesh(stargeometry, starmaterial);
        star.position.x = Math.floor(Math.random() * 450) - (450/2);
        star.position.y = Math.floor(Math.random() * 450) - (450/2);
        star.position.z = Math.floor(Math.random() * 300) - (300/2);
        scene.add(star);
    }

    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );

    //render the scene
    var t = 0;
    var p = 0;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    mouse.clicked = false;
    function onMouseMove(event) {
        //gets mouse position
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove, false);
    function onMouseClick() {
        mouse.clicked = true;
    }
    window.addEventListener('click', onMouseClick);
    const render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    //     Mercury.rotation.y += 0.03;
    //     t += 0.004;
    //     Mercury.position.x = 80*Math.cos(t) + 0;
    //     Mercury.position.z = 80*Math.sin(t) + 0;
        Mercury.position.x = 40;
        Venus.position.x = 60;
        Earth.position.x = 80;
        Earth.rotation.y += 0.004;
        Mars.position.x = 100;
        Jupiter.position.x = 120;


    //     Venus.rotation.y += 0.004;
    //     Venus.position.x = 100*Math.cos(t) + 20;
    //     Venus.position.z = 100*Math.sin(t) + 20;

    //    Mars.rotation.y += 0.0004;
    //     Mars.position.x = 120*Math.cos(t) + 40;
    //     Mars.position.z = 120*Math.sin(t) + 40;


        if(mouse.clicked) {
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects([Sun, Mercury, Venus, Earth, Mars, Jupiter]);
            for ( var i = 0; i < intersects.length; i++ ) {
                console.log(intersects[i].object.name);
            }
            mouse.clicked = false;
        }
    }
    render();
});