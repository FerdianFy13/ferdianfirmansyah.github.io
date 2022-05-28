let controls;
var camera, scene, renderer;
var geometry, material, mesh, wireframe;
let width = window.innerWidth;
let height = window.innerHeight;

/*scene*/
var scene = new THREE.Scene();

/*camera*/
var camera = new THREE.PerspectiveCamera(430, width / height, 0.1, 30.5);
camera.position.z = 20;

/*renderer*/
const canvas = document.getElementById("myCanvas2");
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

/*call function to draw object 3D*/
Icosaheedron();
CustomGeometry();
/*end call function to draw object 3D*/

/*icosahedron function outer object*/
function Icosaheedron() {
    /*outer one object 3D*/
    geometry = new THREE.IcosahedronGeometry(10, 1);
    material = new THREE.MeshLambertMaterial({
        wireframe: true,
        wireframeLinewidth: 15,
        transparent: true,
        opacity: 15,
    });
    wireframe = new THREE.Mesh(geometry, material);
    scene.add(wireframe);
    /*end outer one object 3D*/

    /*outer second object 3D*/
    geometry = new THREE.SphereGeometry(6, 22, 32);
    material = new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0.23,
        wireframe: true,
        color: "silver",
    });
    var circle = new THREE.Mesh(geometry, material);
    scene.add(circle);
    /*outer second object 3D*/

    /*light object 3D for mesh lambert material*/
    /*light one object 3D for mesh lambert material*/
    var light1 = new THREE.DirectionalLight(0x588c7e, 0.65);
    scene.add(light1);
    light1.position.set(1.5, 2, 6);
    /*end light one object 3D for mesh lambert material*/

    /*light second object 3D for mesh lambert material*/
    var light2 = new THREE.DirectionalLight(0xf2e394, 0.7);
    scene.add(light2);
    light2.position.set(-1.5, -2, 2);
    /*end light second object 3D for mesh lambert material*/

    /*light third object 3D for mesh lambert material*/
    var light3 = new THREE.DirectionalLight(0xf2ae72, 0.2);
    scene.add(light3);
    light3.position.set(-2, 2, -1.5);
    /*end light third object 3D for mesh lambert material*/

    /*light fourth object 3D for mesh lambert material*/
    var light4 = new THREE.DirectionalLight(0xd96459, 0.7);
    scene.add(light4);
    light4.position.set(-1, -2, 2);
    /*end light fourth object 3D for mesh lambert material*/
    /*end light object 3D for mesh lambert material*/

    /*animation object 3D*/
    let wireframeY = 0;
    let wireframeX = 0;
    let easing = 0.5;
    let autoRotate = true;
    /*end animation object 3D*/

    /*function rendering in animation*/
    let render = function() {
        requestAnimationFrame(render);
        if (autoRotate == true) {
            wireframe.rotation.y += 0.009;
            wireframe.rotation.x -= 0.009;
        } else {
            /*rotation y*/
            let yDistance = wireframe.rotation.y - wireframeY;
            yFullDistance = Math.sqrt(yDistance * yDistance);
            if (yFullDistance > 0) {
                wireframe.rotation.y -= yDistance * easing;
            }
            /*rotation x*/
            let xDistance = wireframe.rotation.x - wireframeX;
            xFullDistance = Math.sqrt(xDistance * xDistance);
            if (xFullDistance > 0) {
                wireframe.rotation.x -= xDistance * easing;
            }
        }
        renderer.render(scene, camera);
    };
    render();
    /*end function rendering in animation*/

    /*responsive for object 3d function*/
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    onWindowResize();
    /*responsive for object 3d function*/
}
/*end icosahedron function outer object*/

/*custom geometry function in object*/
function CustomGeometry() {
    /*triangular pyramid vertect*/
    const geo = new THREE.BufferGeometry();
    let vertices = new Float32Array([
        // vertects
        -2.0, -2.0, 2.0, // 0
        2.0, -2.0, 2.0, // 1
        0.0, -2.0, -2.0, // 2
        0.0, 2.0, 0.0 // 3
    ]);
    /*end triangular pyramid vertect*/

    /*triangular pyramid color*/
    let colors = new Float32Array([
        //   R    G    B
        1.0, 0.0, 1.0, // 0
        0.0, 0.0, 1.0, // 1
        1.0, 0.0, 1.0, // 2
        1.0, 1.0, 0.0, // 3
    ]);
    /*end triangular pyramid color*/

    /*triangular pyramid view*/
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    /*end triangular pyramid view*/

    /*triangular pyramid view display 3d*/
    geo.setIndex([
        1, 3, 2, // left
        0, 3, 1, //right
        0, 1, 2, // top
        0, 2, 3, // bottom
    ]);
    /*end triangular pyramid view display 3d*/

    /*material triangular pyramid color*/
    const material = new
    THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, opacity: 0.5, transparent: false, wireframe: false });
    let mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
    /*end material triangular pyramid color*/

    /*texture color image*/
    const ATexture = new THREE.TextureLoader().load("https://i.ibb.co/HznXWqp/gradient1.jpg");
    const BTexture = new THREE.TextureLoader().load("https://i.ibb.co/GF4HH8d/proyek-akhir.jpg");
    const CTexture = new THREE.TextureLoader().load("https://i.ibb.co/1mJwFXh/ruang-sempro.jpg");
    /*end texture color image*/

    /*array a collection of textures*/
    const matArray = [
        new THREE.MeshBasicMaterial({ map: ATexture }),
        new THREE.MeshBasicMaterial({ map: BTexture }),
        new THREE.MeshBasicMaterial({ map: CTexture }),
        new THREE.MeshBasicMaterial({ map: ATexture }),
        new THREE.MeshBasicMaterial({ map: BTexture }),
        new THREE.MeshBasicMaterial({ map: CTexture }),
    ];
    /*array a collection of textures*/
    const geo3 = new THREE.SphereGeometry(1, 22, 32);

    /*material display sphere geometry*/
    const materials = new THREE.MeshBasicMaterial({
        map: BTexture,
        wireframe: true
    });

    const mesh3 = new THREE.Mesh(geo3, materials);
    mesh3.position.set(3.5, 0, 0);
    scene.add(mesh3);

    const geo2 = new THREE.ConeGeometry(1, 2, 32);

    /*material display cone geometry*/
    let mesh2 = new THREE.Mesh(geo2, matArray);
    mesh2.position.set(-3.5, 0, 0);
    scene.add(mesh2);

    /*closure addEventListener*/
    window.addEventListener('resize', function() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    /*end closure addEventListener*/

    /*update function animation*/
    function update() {
        mesh.rotation.y += 0.010;
        mesh.rotation.x += 0.010;
        mesh2.rotation.x -= 0.010;
        mesh2.rotation.y += 0.010;
        mesh3.rotation.x -= 0.010;
        mesh3.rotation.y += 0.010;
        requestAnimationFrame(update);
        renderer.render(scene, camera);
    }
    update();
    /*end update function animation*/
}

/*end custom geometry function in object*/

/*dom selector*/
let canvasKita = document.getElementById("myCanvas");
canvasKita.width = window.innerWidth;
canvasKita.height = 200;
let ctx = canvasKita.getContext("2d");

/*add image data*/
let imageData = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

/*constructor function circle*/
function circle(x, y, r, colors, right, left, top, bottom, speed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.colors = colors;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.render = function() {
        ctx.fillStyle = this.colors;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();

        /*control flow for speed circle*/
        if (this.right) {
            this.x += speed;
        }
        if (this.left) {
            this.x -= speed;
        }
        if (this.top) {
            this.y -= speed;
        }
        if (this.bottom) {
            this.y += speed;
        }
        /*end control flow for speed circle*/

        /*control flow for check position circle*/
        if (this.y + this.r > canvasKita.height) {
            this.bottom = false;
            this.top = true;
        } else if (this.y - this.r < 0) {
            this.bottom = true;
            this.top = false;
        }

        if (this.x + this.r > canvasKita.width) {
            this.right = false;
            this.left = true;
        } else if (this.x - this.r < 0) {
            this.right = true;
            this.left = false;
        }
        /*end control flow for check position circle*/
    };
}
/*end constructor function circle*/

/* draw circle */
let circle1 = new circle(180, 80, 45, "#9400D3", true, false, false, true, 2);
let circle2 = new circle(210, 60, 35, "#547980", false, true, true, false, 4);
let circle3 = new circle(150, 150, 50, "#45ADA8", true, false, true, false, 3);
let circle4 = new circle(90, 40, 40, "#9DE0AD", true, false, true, false, 2);
let circle5 = new circle(20, 120, 30, "#CD5C5C", false, true, false, true, 3);
/* end draw circle */

/* function animate object bounce */
function animasi() {
    /* stack state in animation */
    ctx.save();
    ctx.clearRect(0, 0, canvasKita.width, canvasKita.height);

    /* rendering circle in animation */
    circle1.render();
    circle2.render();
    circle3.render();
    circle4.render();
    circle5.render();
    /* end rendering circle in animation */

    ctx.restore();
    requestAnimationFrame(animasi);
    /* end stack state in animation */
}
animasi();
/* end function animate object bounce */

AOS.init({
    duration: 800,
    easing: "slide",
});

(function($) {
    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: "scroll",
    });

    let fullHeight = function() {
        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function() {
            $(".js-fullheight").css("height", $(window).height());
        });
    };
    fullHeight();

    // loader
    let loader = function() {
        setTimeout(function() {
            if ($("#ftco-loader").length > 0) {
                $("#ftco-loader").removeClass("show");
            }
        }, 1);
    };
    loader();

    let TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

        let that = this;
        let delta = 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };

    window.onload = function() {
        let elements = document.getElementsByClassName("txt-rotate");
        for (let i = 0; i < elements.length; i++) {
            let toRotate = elements[i].getAttribute("data-rotate");
            let period = elements[i].getAttribute("data-period");
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    };

    // Scrollax
    $.Scrollax();

    // Burger Menu
    let burgerMenu = function() {
        $("body").on("click", ".js-fh5co-nav-toggle", function(event) {
            event.preventDefault();

            if ($("#ftco-nav").is(":visible")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });
    };
    burgerMenu();

    let onePageClick = function() {
        $(document).on("click", '#ftco-nav a[href^="#"]', function(event) {
            event.preventDefault();

            let href = $.attr(this, "href");

            $("html, body").animate({
                    scrollTop: $($.attr(this, "href")).offset().top - 70,
                },
                500,
                function() {
                    // window.location.hash = href;
                }
            );
        });
    };

    onePageClick();
})(jQuery);

particlesJS(
    "particles-js",

    {
        particles: {
            number: {
                value: 20,
                density: {
                    enable: false,
                    value_area: 5000,
                },
            },
            color: {
                value: "#FFAC00",
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#FFAC00",
                },
                polygon: {
                    nb_sides: 3,
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100,
                },
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FFAC00",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600,
                },
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab",
                },
                onclick: {
                    enable: false,
                    mode: "push",
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    }
);