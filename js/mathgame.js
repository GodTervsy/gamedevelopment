let context, controller, loop;
let score = 0;
let userAnswer = "";
context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 500;
context.canvas.width = 1000;

let hitBox1 = [{
    "id": "value1",
    "x": 150,
    "y": 90,
    "height": 1,
    "width": 50,
    "text": "123"
}];

let hitBox2 = [{
    "id": "value2",
    "x": 500,
    "y": 90,
    "height": 1,
    "width": 20,
    "text": "2498"
}];

let hitBox3 = [{
    "id": "value3",
    "x": 850,
    "y": 90,
    "height": 1,
    "width": 20,
    "text": "238947"
}];

let rectangle = [{

    "x": 500, // center of the canvas
    "height": 50,
    "jumping": true,
    "width": 50,
    "x_velocity": 0,
    "y": 0,
    "y_velocity": 0,
    "colliding": true

}];

let questions = [
    ["123", "2143", "2872", "90"],
    ["2498", "293847", "23894", "82"],
    ["238947", "23946", "784325", "69"]
];

let answers = ["Start", "A", "B", "C", "A"];
let answersPosition = answers.indexOf("Start");

let questionsPosition1 = questions[0].indexOf("123");
let questionsPosition2 = questions[1].indexOf("2498");
let questionsPosition3 = questions[2].indexOf("238947");


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
            rectangle[i].colliding = true;

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

                        function displayAnswers() {
                            //console.log(answers[answersPosition])
                            h1.text = questions[0][questionsPosition1];
                            questionsPosition1++;

                            h2.text = questions[1][questionsPosition2];
                            questionsPosition2++;

                            h3.text = questions[2][questionsPosition3];
                            questionsPosition3++;

                            if (userAnswer == answers[answersPosition]) {
                                console.log("right");
                                score++;
                                console.log(score);
                            } else {
                                console.log("wrong");
                                console.log(score);
                            }
                            answersPosition++;
                        }
                        /*let solutions = [{

                                "set1": [{
                                    "a": "29",
                                    "b": "72",
                                    "c": "90"
                                }]

                            },
                            {
                                "id": "set2",
                                "a": "901",
                                "b": "221",
                                "c": "2321"
                            }

                        ];*/

                        //h1 = rect1 r = rect2


                        if (h1.x < r.x + r.width && h1.x + h1.width > r.x && h1.y < r.y + r.height && h1.y + h1.height > r.y && r.colliding == true) {
                            r.colliding = false;
                            userAnswer = "A";
                            //console.log("YUH1");
                            displayAnswers();
                        } else if (h2.x < r.x + r.width && h2.x + h2.width > r.x && h2.y < r.y + r.height && h2.y + h2.height > r.y && r.colliding == true) {
                            r.colliding = false;
                            userAnswer = "B";
                            //console.log("YUH2");
                            displayAnswers();
                        } else if (h3.x < r.x + r.width && h3.x + h3.width > r.x && h3.y < r.y + r.height && h3.y + h3.height > r.y && r.colliding == true) {
                            r.colliding = false;
                            userAnswer = "C";
                            //console.log("YUH3");
                            displayAnswers();
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