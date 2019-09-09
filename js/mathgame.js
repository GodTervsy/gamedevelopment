let ctx, controller, loop;
let score = 0;
let userAnswer = "";
ctx = document.querySelector("canvas").getContext("2d");

ctx.canvas.height = 500;
ctx.canvas.width = 1000;

let hitBox1 = [{
    "id": "value1",
    "x": 150,
    "y": 150,
    "height": 1,
    "width": 200,
    "text": "123",
    "hitX": 50
}];

let hitBox2 = [{
    "id": "value2",
    "x": 500,
    "y": 150,
    "height": 1,
    "width": 200,
    "text": "2498",
    "hitX": 400
}];

let hitBox3 = [{
    "id": "value3",
    "x": 850,
    "y": 150,
    "height": 1,
    "width": 200,
    "text": "238947",
    "hitX": 750
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

let solutions = [
    ["The gradient of that function", "5x + 6", "A cubic function", "98x", "A really small number", "a^2 - 4bc", "The Chain Rule", "62.402", "Distance"],
    ["The position of the function on the graph", "0", "A coordinate on a curve", "89x + c", "A letter representing a given number", "b^2 - 4ac", "Einstein's Rule", "π", "Acceleration"],
    ["A parallel function", "6x + 5", "The area under the curve", "89x", "The second derivative", "c^2 - 4ab", "The Planck's Constant Rule", "√-1", "Circular Motion"]
];

let paragraphText = [

    {
        "x": 500,
        "y": 50,
        "text": ""
    }
];

let questions = [
    "In calculus, what does differentiating a function find?",
    "Differentiate the following expression: 3x^2 + 5x + 10",
    "In calculus, what does integrating a function find?",
    "Integrate the following expression: ∫89 dx",
    "What is the integration constant, c?",
    "What is the formula for the discriminant at Level 2?",
    "Which of these is a rule used in differentiation at Level 3?",
    "What is the value of the complex number, i?",
    "If a function for the velocity of an object is integrated, what resulting function is found?"
];

let questionsPosition = questions.indexOf("In calculus, what does differentiating a function find?");

let answers = ["Start", "A", "C", "C", "B", "B", "B", "A", "C", "A"];
let answersPosition = answers.indexOf("Start");

let solutionsPosition1 = solutions[0].indexOf("The gradient of that function");
let solutionsPosition2 = solutions[1].indexOf("The position of the function on the graph");
let solutionsPosition3 = solutions[2].indexOf("A parallel function");


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
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.fillText(hitBox1[i].text, hitBox1[i].x, hitBox1[i].y);
            }

            for (let i = 0; i < hitBox2.length; i++) {
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.fillText(hitBox2[i].text, hitBox2[i].x, hitBox2[i].y);
            }

            for (let i = 0; i < hitBox3.length; i++) {
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.fillText(hitBox3[i].text, hitBox3[i].x, hitBox3[i].y);
            }

            for (let i = 0; i < paragraphText.length; i++) {
                ctx.font = "25px Arial"
                ctx.fillText(paragraphText[i].text, paragraphText[i].x, paragraphText[i].y);
            }
        }

        function endGame() {
            if (score == 9) {
                if (
                    window.confirm(
                        "Outstanding performace!\nYou got " + score + " out of " + questions.length + "!" + "\nThanks for playing!\nIf you would like to play again, please click 'OK'. Otherwise, click cancel, or exit the browser tab."
                    )
                ) {
                    questionsPosition = 1;
                    location.reload();
                } else {
                    while (questionsPosition == questions.length) {
                        alert(
                            "Thanks for playing!\nIf you'd like to play again, please refresh the page (press F5).\nIf you do not want to play again, exit the browser tab."
                        );
                    }
                }
            } else if (score <= 8) {
                if (
                    window.confirm(
                        "That's the end of the quiz!\nYou got " + score + " out of " + questions.length + "!" + "\nThanks for playing!\nIf you would like to play again and get a perfect score, please click 'OK'. Otherwise, click cancel or exit the browser tab."
                    )
                ) {
                    questionsPosition = 1;
                    location.reload();
                } else {
                    while (questionsPosition == questions.length) {
                        alert("Thanks for playing!\nIf you'd like to play again, please refresh the page (press F5).\nIf you do not want to play again, exit the browser tab.");
                    }
                }
            }
        }

        function hitDetect() {

            for (let i = 0; i < hitBox1.length; i++) {
                for (let i = 0; i < hitBox2.length; i++) {
                    for (let i = 0; i < hitBox3.length; i++) {
                        for (let i = 0; i < paragraphText.length; i++) {
                            let h1 = hitBox1[i];
                            let h2 = hitBox2[i];
                            let h3 = hitBox3[i];
                            let r = rectangle[i];
                            let p = paragraphText[i];

                            function displayAnswers() {
                                //console.log(answers[answersPosition])
                                h1.text = solutions[0][solutionsPosition1];
                                solutionsPosition1++;

                                h2.text = solutions[1][solutionsPosition2];
                                solutionsPosition2++;

                                h3.text = solutions[2][solutionsPosition3];
                                solutionsPosition3++;

                                p.text = questions[questionsPosition];
                                questionsPosition++;

                                if (userAnswer == answers[answersPosition]) {
                                    score++;
                                    console.log(score);
                                } else {
                                    console.log(score);
                                }
                                answersPosition++;
                            }


                            if (h1.hitX < r.x + r.width && h1.hitX + h1.width > r.x && h1.y < r.y + r.height && h1.y + h1.height > r.y && r.colliding == true) {
                                r.colliding = false;
                                userAnswer = "A";
                                displayAnswers();
                            } else if (h2.hitX < r.x + r.width && h2.hitX + h2.width > r.x && h2.y < r.y + r.height && h2.y + h2.height > r.y && r.colliding == true) {
                                r.colliding = false;
                                userAnswer = "B";
                                displayAnswers();
                            } else if (h3.hitX < r.x + r.width && h3.hitX + h3.width > r.x && h3.y < r.y + r.height && h3.y + h3.height > r.y && r.colliding == true) {
                                r.colliding = false;
                                userAnswer = "C";
                                displayAnswers();
                            }
                        }
                    }
                }
            }
        }
        ctx.fillStyle = "#202020";
        ctx.fillRect(0, 200, 1000, 300); // x, y, width, height
        ctx.fillStyle = "#202830"
        ctx.fillRect(0, 0, 1000, 200);
        ctx.fillStyle = "#FF0000"; // hex for red
        ctx.beginPath();
        ctx.fillRect(rectangle[i].x, rectangle[i].y, rectangle[i].width, rectangle[i].height);
        ctx.strokeStyle = "#202830";
        ctx.lineWidth = 4;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(0, 420);
        ctx.lineTo(1000, 420);
        ctx.stroke();
    }

    while (questionsPosition == questions.length + 1) {
        endGame();
    }

    // call update when the browser is ready to draw again
    renderSolutions();
    hitDetect();
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);