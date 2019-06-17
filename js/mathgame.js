let context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 1000;

rectangle = {

    height: 64,
    jumping: true,
    width: 64,
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

            case 65: // left key
                controller.left = key_state;
                break;
            case 87: // up key
                controller.up = key_state;
                break;
            case 68: // right key
                controller.right = key_state;
                break;
            case 32:
                controller.right = key_state;

        }

    }

};

loop = function () {

    if (controller.up && rectangle.jumping == false) {

        rectangle.y_velocity -= 50;
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

    context.fillStyle = "#202020";
    context.fillRect(0, 0, 1000, 500); // x, y, width, height
    context.fillStyle = "#ff0000"; // hex for red
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 430);
    context.lineTo(1000, 430);
    context.stroke();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);