function initCanvas() {
    let ctx = document.getElementById("canvas").getContext("2d")
    let cW = ctx.canvas.width;
    let cH = ctx.canvas.height;
    let enemies = [

        {
            "id": "enemy4",
            "x": 100,
            "y": -70,
            "w": 40,
            "h": 20
        },
        {
            "id": "enemy5",
            "x": 325,
            "y": -70,
            "w": 40,
            "h": 20
        },
        {
            "id": "enemy6",
            "x": 550,
            "y": -70,
            "w": 40,
            "h": 20
        }
    ];

    function renderEnemies() {
        for (let i = 0; i < enemies.length; i++) {
            ctx.fillStyle = "blue";
            ctx.fillRect(enemies[i].x, enemies[i].y += 1, enemies[i].w, enemies[i].h)
        }
    }

    function Launcher() {
        this.y = 280, this.x = cW * .5 - .25, this.w = 50, this.h = 50, this.dir, this.bg = "orange",
            this.missiles = [];
        this.render = function () {
            if (this.dir == "left") {
                this.x -= 5;
            } else if (this.dir == "right") {
                this.x += 5;
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
            if (enemies.length == 0) {
                clearInterval(animateInterval);

                ctx.fillStyle = "#FC0";
                ctx.font = "italic bold 36px Arial, sans-serif";
                ctx.fillText("Level Complete", cW * .5 - 130, 50, 300);
            }
        }
        this.hitDetect = function (m, mi) {
            for (let i = 0; i < enemies.length; i++) {
                let e = enemies[i];
                if (m.x + m.w >= e.x && m.x <= e.x + e.w && m.y >= e.y && m.y <= e.y + e.h) {
                    this.missiles.splice(this.missiles[mi], 1);

                    enemies.splice(i, 1);

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
    let left_btn = document.getElementById("left_btn");
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
    });
}



window.addEventListener("load", function (event) {
    initCanvas();
});