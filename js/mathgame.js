let controller, runGame; //Defining intial variables for the controller element and the function that runs the game.
let score = 0; //Setting the intial score to be 0.
let userAnswer = ""; //Setting the initial user's answer to be blank, or undefined.
let animationCanvas = document.getElementById("animationCanvas"); //Referencing the canvas used for animation and storing it in the variable "animationCanvas".
animationCTX = animationCanvas.getContext("2d"); //Getting the context for the animation canvas and storing it in the variable "animationCTX".
let backgroundCanvas = document.getElementById("canvas"); //Referencing the canvas used for the background and storing it in the variable "backgroundCanvas".
ctx = backgroundCanvas.getContext("2d"); //Getting the context for the background canvas and storing it in the variable "ctx".
let scoreText = document.getElementById("scoreText"); //Referencing the HTML "h2" element which displays the score and storing this in the variable "scoreText".

//Defining and sourcing image elements for each sprite.
let characterRunningLeft = new Image();
characterRunningLeft.src = "/images/runningleft.png";
let characterRunningRight = new Image();
characterRunningRight.src = "/images/runningright.png";
let characterJumpingLeft = new Image();
characterJumpingLeft.src = "/images/jumpingleft.png";
let characterJumpingRight = new Image();
characterJumpingRight.src = "/images/jumpingright.png";

//Defining the height and width of the canvas.
ctx.canvas.height = 500;
ctx.canvas.width = 1000;

//Defining the properties for the hitbox of the first solution that appears on screen. These properties include id, x and y positions, height, width, text value and hitbox area.
let hitBox1 = [{
    "id": "value1",
    "x": 150,
    "y": 150,
    "height": 1,
    "width": 200,
    "text": "",
    "hitX": 50
}];

//Defining the properties for the hitbox of the second solution that appears on screen. These properties include id, x and y positions, height, width, text value and hitbox area.
let hitBox2 = [{
    "id": "value2",
    "x": 500,
    "y": 150,
    "height": 1,
    "width": 200,
    "text": "",
    "hitX": 400
}];

//Defining the properties for the hitbox of the third solution that appears on screen. These properties include id, x and y positions, height, width, text value and hitbox area.
let hitBox3 = [{
    "id": "value3",
    "x": 850,
    "y": 150,
    "height": 1,
    "width": 200,
    "text": "",
    "hitX": 750
}];

//Defining the properties for the player character that appears on screen.
let rectangle = [{

    "x": 500, // center of the canvas
    "height": 120,
    "jumping": true,
    "width": 120,
    "x_velocity": 0,
    "y": 0,
    "y_velocity": 0,
    "colliding": true

}];

//Storing the text for each hitbox in a multidimensional array. Each array within the parent array contains the text for each hitbox. For example, the first array within the parent array corresponds to hitBox 1.
let solutions = [
    ["Isaac Newton and Leibniz", "Complex Numbers", "The gradient of that function", "5x + 6", "15x - 9", "A cubic function", "98x", "A really small number", "a^2 - 4bc", "The Chain Rule", "62.402", "Distance"],
    ["Pythagoras and Achimedes", "Integration", "The position of the function on the graph", "0", "30(5x - 5) + 6", "A coordinate on a curve", "89x + c", "A letter representing a given number", "b^2 - 4ac", "Einstein's Rule", "π", "Acceleration"],
    ["Isaac Newton and Albert Einstein", "Differentiation", "A parallel function", "6x + 5", "75x + 6", "The area under the curve", "89x", "The second derivative", "c^2 - 4ab", "The Planck's Constant Rule", "√-1", "Circular Motion"]
];

//Defining the basic position for where each question appears in terms of x and y coordinates.
let questionText = [

    {
        "x": 500,
        "y": 50,
        "text": ""
    }
];

//Storing all questions in an array. This makes it easier to cycle through the questions in the quiz.
let questions = [
    "Who are said to be the two \"Founding Fathers\" of Calculus?",
    "What area of calculus did Isaac Newton mainly contribute to?",
    "In calculus, what does differentiating a function find?",
    "Differentiate the following expression: 3x^2 + 5x + 10",
    "Differentiate the following expression: 3(5x-5)^2 + 6x",
    "In calculus, what does integrating a function find?",
    "Integrate the following expression: ∫89 dx",
    "What is the integration constant, c?",
    "What is the formula for the discriminant at Level 2?",
    "Which of these is a rule used in differentiation at Level 3?",
    "What is the value of the complex number, i?",
    "If a function for the velocity of an object is integrated, what resulting function is found?"
];

//Storing the answers to each question in the form of an array.
let answers = ["Start", "A", "C", "A", "C", "B", "C", "B", "B", "B", "A", "C", "A"];

//Defining the starting position of each array shown above in different variables.
let questionsPosition = questions.indexOf("Who are said to be the two \"Founding Fathers\" of Calculus?");
let answersPosition = answers.indexOf("Start");
let solutionsPosition1 = solutions[0].indexOf("Isaac Newton and Leibniz");
let solutionsPosition2 = solutions[1].indexOf("Pythagoras and Achimedes");
let solutionsPosition3 = solutions[2].indexOf("Isaac Newton and Albert Einstein");

alert("Welcome to the game!\nThis game inlcudes multiple-choice questions about Level 2 and 3 Calculus. \nMove the player character using the arrow keys on the keyboard, and jump to answers using the either the spacebar or the up arrow key.\nGood luck!")


//Adding functionality to the player character and setting up key events (left and right movement, jumping).
controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 32: //space key
                controller.up = key_state;
                break;
            case 37: //left key
                controller.left = key_state;
                break;
            case 38: //up key
                controller.up = key_state;
                break;
            case 39: //right key
                controller.right = key_state;
                break;

        }

    }

};

runGame = function () {

    for (let i = 0; i < rectangle.length; i++) {

        //If the rectangle is jumping, set the "jumping" and "colliding" properties to be true and also set the "y velocity".
        if (controller.up && rectangle[i].jumping == false) {

            rectangle[i].y_velocity -= 48;
            rectangle[i].jumping = true;
            rectangle[i].colliding = true; //This property will ensure that the hit detection is only fired once as soon as the player and hitbox overlap.
        }

        //If the left key is being pressed, set the horizontal speed of the rectangle to be a negative number. The negative sign indicates that it will be travelling to the left.
        if (controller.left) {

            rectangle[i].x_velocity -= 0.5;
        }

        //If the right key is being pressed, set the horizontal speed of the rectangle to be a positive number. The positive sign indicates that it will be travelling to the right.
        if (controller.right) {

            rectangle[i].x_velocity += 0.5;

        }


        rectangle[i].y_velocity += 1.5; //Setting the gravity for the player.
        rectangle[i].x += rectangle[i].x_velocity; //Ensuring the player's horizontal position on the screen adapts according to the horizontal velocity of the player.
        rectangle[i].y += rectangle[i].y_velocity; //Ensuring the player's vertical position on the screen adapts according to the vertical velocity of the player.
        rectangle[i].x_velocity *= 0.9; //Setting friction for the player while travelling horizontally on the ground.
        rectangle[i].y_velocity *= 0.9; //Setting air resistance for the player while travelling vertically.

        //Accounting for the boundary case of the player falling below the floor line.
        if (rectangle[i].y > 415 - 16 - 32) {

            rectangle[i].jumping = false;
            rectangle[i].y = 415 - 16 - 32;
            rectangle[i].y_velocity = 0;

        }

        //Accounting for the boundary case of the player travelling off the left side of the screen. In this case, the horizontal position of the player is set to the right side of the screen. This allows for the effect of the player disappearing on the left and then reappearing on the right.
        if (rectangle[i].x < -32) {

            rectangle[i].x = 1000;

        }
        //Accounting for the boundary case of the player travelling off the right side of the screen. In this case, the horizontal position of the player is set to the left side of the screen. This allows for the effect of the player disappearing on the right and then reappearing on the left. 
        else if (rectangle[i].x > 1000) {

            rectangle[i].x = -32;

        }

        //The renderText() function changes the text of the hitboxes, question and score. This function is executed every time a collision is detected.
        function renderText() {

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

            for (let i = 0; i < questionText.length; i++) {
                ctx.font = "25px Arial"
                ctx.fillText(questionText[i].text, questionText[i].x, questionText[i].y);
            }

            scoreText.innerText = "Score: " + score;
        }

        //The endGame() function displays alert messages to the player once all questions have been answered. A custom message appears if the player achieves a perfect score. A confirm window is used in order to handle different button events (in this case, the "OK" button and the "Cancel" button).
        function endGame() {
            if (score == questions.length) {
                //If the player clicks the "OK" button in the confirm window, reset the position of the questions array and reload the page.
                if (
                    window.confirm(
                        "Outstanding performace!\nYou got " + score + " out of " + questions.length + "!" + "\nThanks for playing!\nIf you would like to play again, please click 'OK'. Otherwise, click cancel, or exit the browser tab."
                    )
                ) {
                    questionsPosition = 1; //Sets the position of the questions array to the beginning, in the event that the player plays the game again.
                    location.reload(); //Reloads the active tab, essentially resetting the game.

                    //If the player cliks the "Cancel" button in the confirm window, run a loop that does not allow further playing of the game, since it has ended.
                } else {
                    //This while loop accounts for the boundary case of the player being able to continue playing the game despite there being no questions to answer. The loop does not allow the player to close the alert without either exiting the tab or playing the game again.
                    while (questionsPosition == questions.length) {
                        alert(
                            "Thanks for playing!\nIf you'd like to play again, please refresh the page (press F5).\nIf you do not want to play again, please exit the browser tab."
                        );
                    }
                }
                //Generic message that displays if any score below perfect score is achieved. The same confirm window mechanism is utilised for this process.
            } else if (score < questions.length) {
                if (
                    window.confirm(
                        "That's the end of the quiz!\nYou got " + score + " out of " + questions.length + "!" + "\nThanks for playing!\nIf you would like to play again and get a perfect score, please click 'OK'. Otherwise, click cancel or exit the browser tab."
                    )
                ) {
                    questionsPosition = 1;
                    location.reload();
                } else {
                    while (questionsPosition == questions.length) {
                        alert("Thanks for playing!\nIf you'd like to play again, please refresh the page (press F5).\nIf you do not want to play again, please exit the browser tab.");
                    }
                }
            }
        }

        //The hitDetect() function contains the algorithm for the hit detection.
        function hitDetect(displayAnswers) {

            for (let i = 0; i < hitBox1.length; i++) {
                for (let i = 0; i < hitBox2.length; i++) {
                    for (let i = 0; i < hitBox3.length; i++) {
                        for (let i = 0; i < questionText.length; i++) {
                            let h1 = hitBox1[i];
                            let h2 = hitBox2[i];
                            let h3 = hitBox3[i];
                            let r = rectangle[i];
                            let p = questionText[i];

                            //The displayAnswers() function changes the text of the hitboxes to display the next possible options for the next question. It also changes the question text to be the next question.
                            function displayAnswers() {
                                h1.text = solutions[0][solutionsPosition1]; //Referencing the position of the first hitBox's solutions in the multidimensional array.
                                solutionsPosition1++;

                                h2.text = solutions[1][solutionsPosition2]; //Referencing the position of the second hitBox's solutions in the multidimensional array.
                                solutionsPosition2++;

                                h3.text = solutions[2][solutionsPosition3]; //Referencing the position of the third hitBox's solutions in the multidimensional array.
                                solutionsPosition3++;

                                p.text = questions[questionsPosition]; //Referencing the position of the questions in the questions array.
                                questionsPosition++;

                                //If the player's answer is the correct answer, add one to the score and then advance the position of the answers array by one. Otherwise, only advance the position of the answers array.
                                if (userAnswer == answers[answersPosition]) {
                                    score++;
                                }
                                answersPosition++;


                            }


                            //If the player is colliding with any of the hitboxes, set the "colliding" property to false, define the player's answer and call the displayAnswers() function.
                            if (h1.hitX < r.x + r.width && h1.hitX + h1.width > r.x && h1.y < r.y + r.height && h1.y + h1.height > r.y && r.colliding == true) { //Collision is calculated using x, y, width and height values of the hitboxes and player.
                                r.colliding = false; //This property ensures that the collision is detected only once, to prevent multiple answers being chosen during one jump.
                                userAnswer = "A"; //Setting the player's answer to be "A".
                                displayAnswers();
                            } else if (h2.hitX < r.x + r.width && h2.hitX + h2.width > r.x && h2.y < r.y + r.height && h2.y + h2.height > r.y && r.colliding == true) {
                                r.colliding = false;
                                userAnswer = "B"; //Setting the player's answer to be "B".
                                displayAnswers();
                            } else if (h3.hitX < r.x + r.width && h3.hitX + h3.width > r.x && h3.y < r.y + r.height && h3.y + h3.height > r.y && r.colliding == true) {
                                r.colliding = false;
                                userAnswer = "C"; //Setting the player's answer to be "C".
                                displayAnswers();
                            }
                        }
                    }
                }
            }
        }
        //Setting the background colour of the playing area on the background canvas.
        ctx.fillStyle = "#202020";
        ctx.fillRect(0, 0, 1000, 500);

        //Setting a different background colour for the questions and answers, to make it easier to differentiate between these.
        ctx.fillStyle = "#202830";
        ctx.fillRect(0, 0, 1000, 200);

        //Drawing the initial player sprite at the top of the screen.
        if (rectangle[i].jumping == true && rectangle[i].x_velocity == 0) {
            animationCTX.clearRect(0, 0, 1000, 500);
            animationCTX.drawImage(characterRunningRight, rectangle[i].x, rectangle[i].y, 120, 120);
        }
        //Setting the sprite image depending on if the player is jumping or walking, left or right.
        if (rectangle[i].jumping == true && rectangle[i].x_velocity > 0) {
            animationCTX.clearRect(0, 0, 1000, 500); //Clear the animation canvas, keeping the background canvas intact.
            animationCTX.drawImage(characterJumpingRight, rectangle[i].x, rectangle[i].y, 120, 150); //Draw the specific sprite image.
            animationCTX.clearRect(characterJumpingRight, rectangle[i].x, rectangle[i].y, 120, 150); //Clear the previously drawn sprite image.
        } else if (rectangle[i].jumping == true && rectangle[i].x_velocity < 0) {
            animationCTX.clearRect(0, 0, 1000, 500);
            animationCTX.drawImage(characterJumpingLeft, rectangle[i].x, rectangle[i].y, 120, 150);
            animationCTX.clearRect(characterJumpingLeft, rectangle[i].x, rectangle[i].y, 120, 150);
        } else if (controller.left || rectangle[i].x_velocity < 0) {
            animationCTX.clearRect(0, 0, 1000, 500);
            animationCTX.drawImage(characterRunningLeft, rectangle[i].x, rectangle[i].y, 120, 120);
        } else if (controller.right || rectangle[i].x_velocity > 0) {
            animationCTX.clearRect(0, 0, 1000, 500);
            animationCTX.drawImage(characterRunningRight, rectangle[i].x, rectangle[i].y, 120, 120);
        }

        //Drawing the floor line seen at the bottom of the play area.
        ctx.strokeStyle = "#202830";
        ctx.lineWidth = 4;
        ctx.fillStyle = "#FFFFFF";
        ctx.moveTo(0, 480);
        ctx.lineTo(1000, 480);
        ctx.stroke();
    }

    //Calling the endGame() function when all questions have been asked.
    while (questionsPosition == questions.length + 1) {
        endGame();
    }

    //Calling each function in order to update the game state when the browser is ready to draw again.
    renderText();
    hitDetect();
    window.requestAnimationFrame(runGame);

};

//Adding event listeners for key presses, and calling an animation frame for the game.
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(runGame);