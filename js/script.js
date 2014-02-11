// var camera, scene, light, renderer;
var geometry, material, mesh;

var mesh = [];
var material = [];

var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

var position = {z:0};

init();
animate();

function init() {

    var placeholdTexture = new THREE.ImageUtils.loadTexture( '../img/400.jpeg' );

    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;
    camera.position.y = 350;

    scene = new THREE.Scene();

    for(var i = 0; i < 10; i++) {

        var flag = (i % 2)*2 -1;

        $('.img3d').append('<div class="package" id="img' + i + '"><img src="./img/wedding' + (i%3+1) + '.jpg" onClick="showInfo(' + i + ')"><div class="shadow"></div></div>');
        $('#img'+i).css({
            '-webkit-transform':'translate3d(' + (flag*300) + 'px,0px,' + (-i*600) + 'px) rotateY(' + (-flag * 30) + 'deg)',
            'z-index': -i*10
        });
    }

    // var floor = addFloor();
    scene.add(addFloor());

    light = new THREE.DirectionalLight( 0xffffff, 3 );
    light.position.z = 3;
    scene.add( light );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    document.addEventListener( 'mousewheel', onMouseWheel, false );
    document.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

}

function showInfo(picNum) {
    var item = '<h2>Infomation</h2><p>' + (picNum+1) + '番目の画像に関する情報</p></div>'

    $("#infoLayer").html(item);
}

function addFloor() {
    // // FLOOR
    var floorMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(10000, 15000, 30, 45);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    floor.position.z = -5000;

    return floor;
}

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    // rotateItem();
    renderer.render( scene, camera );

}

// function rotateItem() {
//     for( var i=0; i < 10; i++){
//         var flag = (i % 2)*2 -1;
//         var dis = (camera.position.z - mesh[i].position.z)/500;
//         var theta = 1/(dis*dis+1);
//         mesh[i].rotation.y = Math.PI / 2 * theta * -flag;
//         // mesh[i].position.y =  dis * dis * 20 + 250;
//     }
// }

function onMouseWheel( event ) {

    var dis = 0;

    if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
        dis = - event.wheelDelta;
    } else if ( event.detail ) { // Firefox
        dis = event.detail;
    }

    var moveDistance = dis;


    if ( dis > 0 ) {
        camera.translateZ( moveDistance );
        position.z -= moveDistance/2;
    } else {
        camera.translateZ( moveDistance );
        position.z -= moveDistance/2;
    }

    for(var i = 0; i < 10; i++) {

        var flag = (i % 2)*2 -1;
        var relativeDis = -i*600+position.z;
        var degree = 90* 1/ (relativeDis*relativeDis/360000 + 1) * -flag /2;
        console.log(degree);

        $('#img'+i).css({
            '-webkit-transform':'translate3d(' + (flag*300) + 'px,0px,' + relativeDis + 'px) rotateY(' + degree + 'deg)',
            'z-index': -i*10    
        });
    }

}