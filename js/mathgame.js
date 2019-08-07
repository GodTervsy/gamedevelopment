let movePlayer, player, movement, Launcher;

movement = {
    left: false,
    right: false,
    fire: false,
    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 32:
                controller.fire = key_state;
                break;
            case 37:
                controller.left = key_state;
                break;
            case 39:
                controller.right = key_state;
                break;


        }
    }
};

function initCanvas() {
    let ctx = document.getElementById("canvas").getContext("2d")
    let cW = ctx.canvas.width;
    let cH = ctx.canvas.height;

    let solutions = ["1", "2", "3"];

    let answers = [

        {
            "value": "1",
            "value2": "2",
            "value3": "3"
        },


    ];

    let rectangles = [

        {
            "id": "enemy1",
            "x": 100,
            "y": -70,
            "w": 0,
            "h": 0
        },

        {
            "id": "enemy2",
            "x": 325,
            "y": -70,
            "w": 0,
            "h": 0
        },

        {
            "id": "enemy3",
            "x": 550,
            "y": -70,
            "w": 0,
            "h": 0
        }
    ];

    function renderEnemies() {
        for (let i = 0; i < rectangles.length; i++) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(rectangles[i].x, rectangles[i].y += 1, rectangles[i].w, rectangles[i].h);
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("6", rectangles[i].x, rectangles[i].y);
        }
    }

    function Launcher() {
        this.y = 280, this.x = cW * .5 - .25, this.w = 50, this.h = 50, this.dir, this.bg = "orange",
            this.missiles = [];
        this.render = function () {
            if (movement.left) {
                alert("left");

                launcher.dir = "left";

            }

            if (movement.right) {

                launcher.dir = "right";
            }
            ctx.fillStyle = this.bg;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            for (let i = 0; i < this.missiles.length; i++) {
                let m = this.missiles[i];
                ctx.fillStyle = m.bg;
                ctx.fillRect(m.x, m.y -= 5, m.w, m.h);
                this.hitDetect(this.missiles[i], i);
                if (m.y <= 0) {
                    this.missiles.splice(i, 1);
                }
            }
            if (rectangles.length == 0) {
                clearInterval(animateInterval);

                ctx.fillStyle = "#FC0";
                ctx.font = "italic bold 36px Arial, sans-serif";
                ctx.fillText("Level Complete", cW * .5 - 130, 50, 300);
            }
        }
        this.hitDetect = function (m, mi) {
            for (let i = 0; i < rectangles.length; i++) {
                let e = rectangles[i];
                if (m.x + m.w >= e.x && m.x <= e.x + e.w && m.y >= e.y && m.y <= e.y + e.h) {
                    this.missiles.splice(this.missiles[mi], 1);

                    rectangles.splice(i, 1);

                    document.getElementById("status").innerHTML = "You destroyed " + e.id;
                }
            }
        }
    }

    let launcher = new Launcher();

    function animate() {
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies();
    }
    let animateInterval = setInterval(animate, 30);

    /*let left_btn = document.getElementById("left_btn");
    let right_btn = document.getElementById("right_btn");
    let fire_btn = document.getElementById("fire_btn");
    left_btn.addEventListener("mousedown", function (event) {
        launcher.dir = "left"
    });
    left_btn.addEventListener("mouseup", function (event) {
        launcher.dir = "";
    });
    right_btn.addEventListener("mousedown", function (event) {
        launcher.dir = "right";
    });
    right_btn.addEventListener("mouseup", function (event) {
        launcher.dir = "";
    });
    fire_btn.addEventListener("mouseup", function (event) {
        launcher.dir = "";
    });
    fire_btn.addEventListener("mousedown", function (event) {

        launcher.missiles.push({
            "x": launcher.x + launcher.w * .5,
            "y": launcher.y,
            "w": 3,
            "h": 10,
            "bg": "red"
        });
    });*/

    window.requestAnimationFrame(Launcher);
}

/*window.addEventListener("load", function (event) {
    initCanvas();
});*/

window.addEventListener("keydown", movement.keyListener);
window.addEventListener("keyup", movement.keyListener);
requestAnimationFrame(Launcher);