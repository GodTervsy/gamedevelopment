function renderGame() {
    let ctx, controller, rectangle, loop;

    ctx = document.querySelector("canvas").getContext("2d");

    let cW = ctx.canvas.width;
    let cH = ctx.canvas.height;

    ctx.canvas.height = 500;
    ctx.canvas.width = 1000;

    rectangle = {

        height: 32,
        jumping: true,
        width: 32,
        x: 144, // center of the canvas
        x_velocity: 0,
        y: 0,
        y_velocity: 0

    };

    controller = {

        left: false,
        right: false,
        space: false,
        keyListener: function (event) {

            let key_state = (event.type == "keydown") ? true : false;

            switch (event.keyCode) {

                case 32: // space key
                    controller.space = key_state;
                    break;
                case 37: // left key
                    controller.left = key_state;
                    break;
                case 39: // right key
                    controller.right = key_state;
                    break;

            }

        }

    };

    let problems = [{
        "id": "problems1",
        "value1": "1",
        "value2": "2",
        "value3": "3"
    }];

    let hitBoxes = [{

            "id": "rectangle1",
            "x": 100,
            "y": -70,
            "w": 0,
            "h": 0
        },

        {
            "id": "rectangle2",
            "x": 325,
            "y": -70,
            "w": 0,
            "h": 0
        },
        {
            "id": "rectangle3",
            "x": 550,
            "y": -70,
            "w": 0,
            "h": 0
        }
    ]

    function renderProblems() {
        for (let i = 0; i < hitBoxes.length; i++) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(hitBoxes[i].x, hitBoxes[i].y += 1, hitBoxes[i].w, hitBoxes[i].h);
            ctx.font = "30px Arial";
            ctx.fillText("1", hitBoxes[i].x, hitBoxes[i].y);
        }
    }

    function Launcher() {

        this.y = 280, this.x = cW * .5 - .25, this.w = 50, this.h = 50,
            this.missiles = [];

        this.renderPlayer = function () {

            for (let i = 0; i < this.missiles.length; i++) {
                let m = this.missiles[i];
                ctx.fillStyle = "#00FFFF";
                ctx.fillRect(m.x, m.y -= 5, m.w, m.h);
                this.hitDetect(this.missiles[i], i);
                if (m.y <= 0) {
                    this.missiles.splice(i, 1);
                }
            }

        }
        this.hitDetect = function (m, mi) {
            for (let i = 0; i < problems.length; i++) {
                let p = problems[i];
                if (m.x + m.w >= p.x && m.x <= p.x + p.w && m.y >= p.y && m.y <= p.y + p.h) {
                    this.missiles.splice(this.missiles[mi], 1);

                    problems.splice(i, 1);
                }
            }
        }
    }

    let launcher = new Launcher();
    renderProblems();


    loop = function () {
        if (controller.up && rectangle.jumping == false) {

            rectangle.y_velocity -= 20;
            rectangle.jumping = true;

        }

        if (controller.left) {

            rectangle.x_velocity -= 0.5;

        }

        if (controller.right) {

            rectangle.x_velocity += 0.5;

        }

        if (controller.space) {

            launcher.renderPlayer();
            launcher.missiles.push({
                "x": loop.x + loop.w * .5,
                "y": loop.y,
                "w": 3,
                "h": 10,
                "bg": "#00FFFF"
            });
        }

        rectangle.y_velocity += 1.5; // gravity
        rectangle.x += rectangle.x_velocity;
        rectangle.y += rectangle.y_velocity;
        rectangle.x_velocity *= 0.9; // friction
        rectangle.y_velocity *= 0.9; // friction

        // if rectangle is falling below floor line
        if (rectangle.y > 415 - 16 - 32) {

            rectangle.jumping = false;
            rectangle.y = 415 - 16 - 32;
            rectangle.y_velocity = 0;

        }

        // if rectangle is going off the left of the screen
        if (rectangle.x < -32) {

            rectangle.x = 1000;

        } else if (rectangle.x > 1000) { // if rectangle goes past right boundary

            rectangle.x = -32;

        }

        ctx.fillStyle = "#202020";
        ctx.fillRect(0, 0, 1000, 500); // x, y, width, height
        ctx.fillStyle = "#ff0000"; // hex for red
        ctx.beginPath();
        ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        ctx.fill();
        ctx.strokeStyle = "#202830";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 400);
        ctx.lineTo(1000, 400);
        ctx.stroke();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);
}

window.addEventListener("load", function (event) {
    renderGame();
})