var pointLight, sun, moon, planet, planetOrbit, ring, controls, scene, camera, renderer, scene;
var planetSegments = 48;
var mercuryData = constructPlanetData(88, 0.015, 20, "mercury", "images/mercury.jpg", 1, planetSegments);
var venusData = constructPlanetData(225, 0.015, 40, "venus", "images/venus.jpg", 2, planetSegments);
var earthData = constructPlanetData(365.2564, 0.01, 60, "earth", "images/earth.jpg", 2, planetSegments);
var marsData = constructPlanetData(730, 0.015, 80, "mars", "images/mars.jpg", 2, planetSegments);
var jupiterData = constructPlanetData(4380, 0.015, 100, "jupiter", "images/jupiter.jpg", 8, planetSegments);
var saturnData = constructPlanetData(10585, 0.015, 120, "saturn", "images/saturn.jpg", 7, planetSegments);
var uranusData = constructPlanetData(30660, 0.015, 140, "uran", "images/uranus.jpg", 6, planetSegments);
var neptuneData = constructPlanetData(60225, 0.015, 160, "neptune", "images/neptune.jpg", 6, planetSegments);
var Data = constructPlanetData(365.2564, 0.015, 25, "earth", "images/earth.jpg", 1, planetSegments);
var moonData = constructPlanetData(29.5, 0.01, 2.8, "moon", "images/moon.jpg", 0.5, planetSegments);
var moonmars1Data = constructPlanetData(20.5, 0.01, 3, "moonmars1", "images/moon.jpg", 0.5, planetSegments);
var moonmars2Data = constructPlanetData(29.5, 0.01, 4, "moonmars2", "images/moon.jpg", 0.5, planetSegments);
var moonjupiter1Data = constructPlanetData(7.5, 0.01, 9, "moonjupiter1", "images/moon.jpg", 0.5, planetSegments);
var moonjupiter2Data = constructPlanetData(10.5, 0.03, 10, "moonjupiter2", "images/moon.jpg", 0.5, planetSegments);
var moonjupiter3Data = constructPlanetData(30.5, 0.09, 11, "moonjupiter3", "images/moon.jpg", 0.5, planetSegments);
var moonjupiter4Data = constructPlanetData(40, 0.04, 12, "moonjupiter4", "images/moon.jpg", 0.5, planetSegments);
var moonsaturn1Data = constructPlanetData(30, 0.04, 9, "moonsaturn1", "images/moon.jpg", 0.5, planetSegments);
var moonsaturn2Data = constructPlanetData(50, 0.04, 10, "moonsaturn2", "images/moon.jpg", 0.5, planetSegments);
var moonsaturn3Data = constructPlanetData(100, 0.04, 11, "moonsaturn3", "images/moon.jpg", 0.5, planetSegments);
var moonuranus1Data = constructPlanetData(30, 0.04, 9, "moonuranus1", "images/moon.jpg", 0.5, planetSegments);
var moonuranus2Data = constructPlanetData(50, 0.04, 10, "moonuranus2", "images/moon.jpg", 0.5, planetSegments);
var moonuranus3Data = constructPlanetData(100, 0.04, 11, "moonuranus3", "images/moon.jpg", 0.5, planetSegments);
var moonneptune1Data = constructPlanetData(30, 0.04, 9, "moonneptune1", "images/moon.jpg", 0.5, planetSegments);
var moonneptune2Data = constructPlanetData(50, 0.04, 10, "moonneptune2", "images/moon.jpg", 0.5, planetSegments);
var moonneptune3Data = constructPlanetData(100, 0.04, 11, "moonneptune3", "images/moon.jpg", 0.5, planetSegments);

var orbitData = {value: 200, runOrbit: true, runRotation: true};
var clock = new THREE.Clock();

function constructPlanetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName, myTexture, mySize, mySegments) {
    return {
        orbitRate: myOrbitRate
        , rotationRate: myRotationRate
        , distanceFromAxis: myDistanceFromAxis
        , name: myName
        , texture: myTexture
        , size: mySize
        , segments: mySegments
    };
}

function getRing(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ring1Geometry = new THREE.RingGeometry(size, innerDiameter, facets);
    var ring1Material = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

function getTube(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ringGeometry = new THREE.TorusGeometry(size, innerDiameter, facets, facets);
    var ringMaterial = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

function getMaterial(type, color, myTexture) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: myTexture === undefined ? null : myTexture
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        case 'phong':
            return new THREE.MeshPhongMaterial(materialOptions);
        case 'standard':
            return new THREE.MeshStandardMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

function createVisibleOrbits() {
    var orbitWidth = 0.01;
    mercuryOrbit = getRing(mercuryData.distanceFromAxis + orbitWidth
        , mercuryData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "mercuryOrbit"
        , 0);

    var orbitWidth = 0.01;
    venusOrbit = getRing(venusData.distanceFromAxis + orbitWidth
        , venusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "venusOrbit"
        , 0);

    var orbitWidth = 0.01;
    earthOrbit = getRing(earthData.distanceFromAxis + orbitWidth
        , earthData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "earthOrbit"
        , 0);

    var orbitWidth = 0.01;
    marsOrbit = getRing(marsData.distanceFromAxis + orbitWidth
        , marsData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "marsOrbit"
        , 0);

    var orbitWidth = 0.01;
    jupiterOrbit = getRing(jupiterData.distanceFromAxis + orbitWidth
        , jupiterData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "jupiterOrbit"
        , 0);

    var orbitWidth = 0.01;
    saturnOrbit = getRing(saturnData.distanceFromAxis + orbitWidth
        , saturnData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "saturnOrbit"
        , 0);

    var orbitWidth = 0.01;
    uranusOrbit = getRing(uranusData.distanceFromAxis + orbitWidth
        , uranusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "uranusOrbit"
        , 0);

    var orbitWidth = 0.01;
    neptuneOrbit = getRing(neptuneData.distanceFromAxis + orbitWidth
        , neptuneData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "neptuneOrbit"
        , 0);

}

function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}

function loadTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        passThisTexture = new THREE.ImageUtils.loadTexture(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = getMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = getMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var myPlanet = getSphere(myMaterial, myData.size, myData.segments);
    myPlanet.receiveShadow = true;
    myPlanet.name = myData.name;
    scene.add(myPlanet);
    myPlanet.position.set(x, y, z);

    return myPlanet;
}

function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}


function movePlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.y += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
    }
}


function moveMoon(myMoon, myPlanet, myData, myTime) {
    movePlanet(myMoon, myData, myTime);
    if (orbitData.runOrbit) {
        myMoon.position.x = myMoon.position.x + myPlanet.position.x;
        myMoon.position.z = myMoon.position.z + myPlanet.position.z;
    }
}


function update(renderer, scene, camera, controls) {
    pointLight.position.copy(sun.position);
    controls.update();

    var time = Date.now();

    movePlanet(earth, earthData, time);
    moveMoon(moon, earth, moonData, time);
   

    movePlanet(mercury, mercuryData, time);


    movePlanet(venus, venusData, time);


    movePlanet(mars, marsData, time);
    moveMoon(moonmars1, mars, moonmars1Data, time);
    moveMoon(moonmars2, mars, moonmars2Data, time);


    movePlanet(jupiter, jupiterData, time);
    moveMoon(moonjupiter1, jupiter, moonjupiter1Data, time);
    moveMoon(moonjupiter2, jupiter, moonjupiter2Data, time);
    moveMoon(moonjupiter3, jupiter, moonjupiter3Data, time);
    moveMoon(moonjupiter4, jupiter, moonjupiter4Data, time);


    movePlanet(saturn, saturnData, time);
    moveMoon(moonsaturn1, saturn, moonsaturn1Data, time);
    moveMoon(moonsaturn2, saturn, moonsaturn2Data, time);
    moveMoon(moonsaturn3, saturn, moonsaturn3Data, time);
    movePlanet(ring1, saturnData, time, true);
    movePlanet(ring2, saturnData, time, true);

    movePlanet(uranus, uranusData, time);
    moveMoon(moonuranus1, uranus, moonuranus1Data, time);
    moveMoon(moonuranus2, uranus, moonuranus2Data, time);
    moveMoon(moonuranus3, uranus, moonuranus2Data, time);


    movePlanet(neptune, neptuneData, time);
    moveMoon(moonneptune1, neptune, moonneptune1Data, time);
    moveMoon(moonneptune2, neptune, moonneptune2Data, time);
    moveMoon(moonneptune3, neptune, moonneptune3Data, time);
   

  
    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}


function init() {
   
    camera = new THREE.PerspectiveCamera(
            45, 
            window.innerWidth / window.innerHeight, 
            1,
            1000 
            );
    camera.position.z = 30;
    camera.position.x = -30;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

   
    document.getElementById('contener').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var path = 'cube/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    scene.background = reflectionCube;

    pointLight = getPointLight(1.5, "rgb(255, 220, 180)");
    scene.add(pointLight);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var sunMaterial = getMaterial("basic", "rgb(255, 255, 255)");
    sun = getSphere(sunMaterial, 16, 48);
    scene.add(sun);

    var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.ImageUtils.loadTexture("images/glow.png")
                , useScreenCoordinates: false
                , color: 0xffffee
                , transparent: false
                , blending: THREE.AdditiveBlending
            });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(70, 70, 1.0);
    sun.add(sprite); 

 
    earth = loadTexturedPlanet(earthData, earthData.distanceFromAxis, 0, 0);
    moon = loadTexturedPlanet(moonData, moonData.distanceFromAxis, 0, 0);
  
    mercury = loadTexturedPlanet(mercuryData, mercuryData.distanceFromAxis, 0, 0);
    venus = loadTexturedPlanet(venusData, venusData.distanceFromAxis, 0, 0);
    mars = loadTexturedPlanet(marsData, marsData.distanceFromAxis, 0, 0);
    moonmars1 = loadTexturedPlanet(moonmars1Data, moonmars1Data.distanceFromAxis, 0, 0);
    moonmars2 = loadTexturedPlanet(moonmars2Data, moonmars2Data.distanceFromAxis, 0, 0);

    jupiter = loadTexturedPlanet(jupiterData, jupiterData.distanceFromAxis, 0, 0);
    moonjupiter1 = loadTexturedPlanet(moonjupiter1Data, moonjupiter1Data.distanceFromAxis, 6, 0);
    moonjupiter2 = loadTexturedPlanet(moonjupiter2Data, moonjupiter2Data.distanceFromAxis, -2, 0);
    moonjupiter3 = loadTexturedPlanet(moonjupiter3Data, moonjupiter3Data.distanceFromAxis, 3, 0);
    moonjupiter4 = loadTexturedPlanet(moonjupiter4Data, moonjupiter4Data.distanceFromAxis, -5, 0);

    saturn = loadTexturedPlanet(saturnData, saturnData.distanceFromAxis, 0, 0);
    moonsaturn1 = loadTexturedPlanet(moonsaturn1Data, moonsaturn1Data.distanceFromAxis, 4, 0);
    moonsaturn2 = loadTexturedPlanet(moonsaturn2Data, moonsaturn2Data.distanceFromAxis, 2, 0);
    moonsaturn3 = loadTexturedPlanet(moonsaturn3Data, moonsaturn3Data.distanceFromAxis, -3, 0);
    ring1 = getTube(9, 0.6, 480, 0x857f77, "ring", earthData.distanceFromAxis);
    ring2 = getTube(11, 0.6, 480, 0x857f77, "ring", earthData.distanceFromAxis);

    uranus = loadTexturedPlanet(uranusData, uranusData.distanceFromAxis, 0, 0);
    moonuranus1 = loadTexturedPlanet(moonuranus1Data, moonuranus1Data.distanceFromAxis, -2, 0);
    moonuranus2 = loadTexturedPlanet(moonuranus2Data, moonuranus2Data.distanceFromAxis, -2, 0);
    moonuranus3 = loadTexturedPlanet(moonuranus3Data, moonuranus3Data.distanceFromAxis, 0, 0);

    neptune = loadTexturedPlanet(neptuneData, neptuneData.distanceFromAxis, 0, 0);
    moonneptune1 = loadTexturedPlanet(moonneptune1Data, moonneptune1Data.distanceFromAxis, 4, 0);
    moonneptune2 = loadTexturedPlanet(moonneptune2Data, moonneptune2Data.distanceFromAxis, 1, 0);
    moonneptune3 = loadTexturedPlanet(moonneptune3Data, moonneptune3Data.distanceFromAxis, -2, 0);
 
    createVisibleOrbits();

    var gui = new dat.GUI();
    var folder1 = gui.addFolder('light');
    folder1.add(pointLight, 'intensity', 0, 10);
    var folder2 = gui.addFolder('speed');
    folder2.add(orbitData, 'value', 0, 500);
    folder2.add(orbitData, 'runOrbit', 0, 1);
    folder2.add(orbitData, 'runRotation', 0, 1);

    update(renderer, scene, camera, controls);
}

init();
