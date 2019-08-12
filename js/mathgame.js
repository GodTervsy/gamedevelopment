let context, controller, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 1000;

let hitBox1 = [{
    "x": 150,
    "y": 90,
    "height": 1,
    "width": 50,
    "text": "hi"
}];

let hitBox2 = [{
    "x": 500,
    "y": 90,
    "height": 1,
    "width": 20,
    "text": "test"
}];

let hitBox3 = [{
    "x": 850,
    "y": 90,
    "height": 1,
    "width": 20,
    "text": "yes"
}];

let rectangle = [{

    "x": 500, // center of the canvas
    "height": 50,
    "jumping": true,
    "width": 50,
    "x_velocity": 0,
    "y": 0,
    "y_velocity": 0

}];



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

    for (let i = 0; i < rectangle.length; i++) {

        if (controller.up && rectangle[i].jumping == false) {

            rectangle[i].y_velocity -= 60;
            rectangle[i].jumping = true;

        }

        if (controller.left) {

            rectangle[i].x_velocity -= 0.5;

        }

        if (controller.right) {

            rectangle[i].x_velocity += 0.5;

        }

        rectangle[i].y_velocity += 1.5; // gravity
        rectangle[i].x += rectangle[i].x_velocity;
        rectangle[i].y += rectangle[i].y_velocity;
        rectangle[i].x_velocity *= 0.9; // friction
        rectangle[i].y_velocity *= 0.9; // friction

        // if rectangle is falling below floor line
        if (rectangle[i].y > 415 - 16 - 32) {

            rectangle[i].jumping = false;
            rectangle[i].y = 415 - 16 - 32;
            rectangle[i].y_velocity = 0;

        }

        // if rectangle is going off the left of the screen
        if (rectangle[i].x < -32) {

            rectangle[i].x = 1000;

        } else if (rectangle[i].x > 1000) { // if rectangle goes past right boundary

            rectangle[i].x = -32;

        }

        function renderSolutions() {

            for (let i = 0; i < hitBox1.length; i++) {
                context.font = "20px Arial";
                context.textAlign = "center";
                context.fillText(hitBox1[i].text, hitBox1[i].x, hitBox1[i].y, hitBox1[i].width);
            }

            for (let i = 0; i < hitBox2.length; i++) {
                context.font = "20px Arial";
                context.textAlign = "center";
                context.fillText(hitBox2[i].text, hitBox2[i].x, hitBox2[i].y);
            }

            for (let i = 0; i < hitBox3.length; i++) {
                context.font = "20px Arial";
                context.textAlign = "center";
                context.fillText(hitBox3[i].text, hitBox3[i].x, hitBox3[i].y);
            }
        }

        function hitDetect() {

            for (let i = 0; i < hitBox1.length; i++) {
                for (let i = 0; i < hitBox2.length; i++) {
                    for (let i = 0; i < hitBox3.length; i++) {
                        let h1 = hitBox1[i];
                        let h2 = hitBox2[i];
                        let h3 = hitBox3[i];
                        let r = rectangle[i];

                        //h1 = rect1 r = rect2

                        if (h1.x < r.x + r.width && h1.x + h1.width > r.x && h1.y < r.y + r.height && h1.y + h1.height > r.y) {
                            console.log("YUH1");
                            h1.text = "gey";
                        } else if (h2.x < r.x + r.width && h2.x + h2.width > r.x && h2.y < r.y + r.height && h2.y + h2.height > r.y) {
                            console.log("YUH2");
                        } else if (h3.x < r.x + r.width && h3.x + h3.width > r.x && h3.y < r.y + r.height && h3.y + h3.height > r.y) {
                            console.log("YUH3");
                        }
                    }
                }
            }
        }

        context.fillStyle = "#202020";
        context.fillRect(0, 0, 1000, 500); // x, y, width, height
        context.fillStyle = "#ff0000"; // hex for red
        context.beginPath();
        context.fillRect(rectangle[i].x, rectangle[i].y, rectangle[i].width, rectangle[i].height);
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(0, 420);
        context.lineTo(1000, 420);
        context.stroke();
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.fillStyle = "#FFFFFF";
        //context.fillRect(hitBox2.x, hitBox2.y, hitBox2.width, hitBox2.height)
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.fillStyle = "#FFFFFF";
        //context.fillRect(hitBox3.x, hitBox3.y, hitBox3.width, hitBox3.height)
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
    }

    // call update when the browser is ready to draw again
    renderSolutions();
    hitDetect();
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);