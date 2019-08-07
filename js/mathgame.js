let ctx, controller, rectangle, loop;

ctx = document.querySelector("canvas").getContext("2d");

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
    up: false,
    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37: // left key
                controller.left = key_state;
                break;
            case 38: // up key
                controller.up = key_state;
                break;
            case 39: // right key
                controller.right = key_state;
                break;

        }

    }

};

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

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);