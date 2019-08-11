let context, controller, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 1000;

let solution1 = [{
    "x": 150,
    "y": 90,
    "height": 10,
    "width": 20,
    "text": "hi"
}];

let solution2 = [{
    "x": 500,
    "y": 90,
    "height": 0,
    "width": 0,
    "text": "test"
}];

let solution3 = [{
    "x": 850,
    "y": 90,
    "height": 0,
    "width": 0,
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

            rectangle[i].y_velocity -= 70;
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

            for (let i = 0; i < solution1.length; i++) {
                context.font = "30px Arial";
                context.textAlign = "center";
                context.fillText(solution1[i].text, solution1[i].x, solution1[i].y, solution1[i].width);
            }

            for (let i = 0; i < solution2.length; i++) {
                context.font = "30px Arial";
                context.textAlign = "center";
                context.fillText(solution2[i].text, solution2[i].x, solution2[i].y);
            }

            for (let i = 0; i < solution3.length; i++) {
                context.font = "30px Arial";
                context.textAlign = "center";
                context.fillText(solution3[i].text, solution3[i].x, solution3[i].y);
            }
        }

        function hitDetect() {

            for (let i = 0; i < solution1.length; i++) {
                let s1 = solution1[i];
                let r = rectangle[i];

                /*if (distX > (s1.width + r.x)) {
                    alert("nahx");
                }

                if (distX <= (s1.x)) {
                    alert("yuhx");
                }

                if (distY > (s1.height + r.y)) {
                    alert("nahy");
                }

                if (distY <= (s1.y)) {
                    alert("yuhy");
                }*/
            }
        }

        context.fillStyle = "#202020";
        context.fillRect(0, 0, 1000, 500); // x, y, width, height
        context.fillStyle = "#ff0000"; // hex for red
        context.beginPath();
        context.rect(rectangle[i].x, rectangle[i].y, rectangle[i].width, rectangle[i].height);
        context.fill();
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(0, 420);
        context.lineTo(1000, 420);
        context.stroke();
        context.fillStyle = "#FFFFFF";
        context.beginPath();
        //context.fillRect(solution1.x, solution1.y, solution1.width, solution1.height)
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.fillStyle = "#FFFFFF";
        //context.fillRect(solution2.x, solution2.y, solution2.width, solution2.height)
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.fillStyle = "#FFFFFF";
        //context.fillRect(solution3.x, solution3.y, solution3.width, solution3.height)
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