let allbtn = document.querySelectorAll(".btn");
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let home = document.querySelector("#home");
let submit = 0;
let newanswer = [];
let a = 1;
let getanswer;
let mode1Score = 0;
allbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    home.style.display = "none";
  });
});

//pop up
let popMain = document.createElement('div');
let popBox = document.createElement('div');
let popText = document.createElement('h2');
let nameInput = document.createElement('input');
let okBtn = document.createElement('btn');
let username;
popText.innerText = "Enter your name";
nameInput.type = "input";
nameInput.placeholder = "Enter name here";
okBtn.innerText = "Ok";
popMain.classList.add("pmain");
popBox.classList.add("pbox");
nameInput.classList.add("ptext");
okBtn.classList.add("pbtn");
document.querySelector('body').appendChild(popMain);
popMain.appendChild(popBox);
popBox.appendChild(popText);
popBox.appendChild(nameInput);
popBox.appendChild(okBtn);
function popup() {
  okBtn.addEventListener("click",()=>{
    username = nameInput.value.trim();
    if(username==='') {
      alert("Enter valid name");
    } else {
      popMain.remove();
    }
  })
}
popup();

function countdown() {
  let count = document.createElement('div');
  count.classList.add('count');
  document.body.appendChild(count);
  let i = 3;
  let timer = setInterval(()=>{
    count.innerText = i.toString();
    i--;
    if(i<0) {
      clearInterval(timer);
      count.remove();
      loadQuizScreen("challenge");
    }
  },1000);
}

function loadQuizScreen(mode) {
    let m = mode;
  newanswer = [];
  // Clear the existing content
  document.body.innerHTML = "";
  let body2 = document.querySelector('body');
  body2.classList.add("body2");

  // Create main quiz container
  let quizContainer = document.createElement("div");
  quizContainer.classList.add("quiz-container");

  // Heading for Quiz Mode
  let modeHeading = document.createElement("h1");
  modeHeading.classList.add("quiz-mode-heading");
  modeHeading.innerText =
    mode === "basic" ? "Basic Mode Quiz" : "Challenge Mode Quiz";

  // Question Element
  let questionEl = document.createElement("h2");
  questionEl.classList.add("quiz-question");
  questionEl.innerText = `${a})${shuffledQuestions[0].question}`;

  //Timer
  if(mode=="challenge") {
  let totalsec = 120;
  let timer = document.createElement("div");
  timer.classList.add("timer");
  let ticker = setInterval(() => {
    let minutes = Math.floor(totalsec / 60);
    let sec = totalsec % 60;
    timer.innerText = `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    if (totalsec == 0) {
      clearInterval(ticker);
      checkScore1();
      mode1Result(m);
    }
    if(submit==1) {
        clearInterval(ticker);
    }
    totalsec--;
  }, 1000);
  quizContainer.appendChild(timer);
}


  // Options Container
  let optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");

  // Creating four option buttons
  for (let i = 0; i < 4; i++) {
    let optionBtn = document.createElement("div");
    optionBtn.classList.add("option-btn");
    optionBtn.classList.add(`option-btn${i + 1}`);
    optionBtn.type = "button";
    optionBtn.innerText = shuffledQuestions[a-1].options[i]; // Placeholder
    optionsContainer.appendChild(optionBtn);
  }

  // Next Button
  let nextBtn = document.createElement("div");
  nextBtn.classList.add("next-btn");
  nextBtn.type = "button";
  nextBtn.innerText = "Next Question";

  // Append all elements to quiz container
  quizContainer.appendChild(modeHeading);
  quizContainer.appendChild(questionEl);
  quizContainer.appendChild(optionsContainer);
  quizContainer.appendChild(nextBtn);

  // Append quiz container to body
  document.body.appendChild(quizContainer);

  //Next question
  let i = 1;
  let optionBtn1 = document.querySelector(".option-btn1");
  let optionBtn2 = document.querySelector(".option-btn2");
  let optionBtn3 = document.querySelector(".option-btn3");
  let optionBtn4 = document.querySelector(".option-btn4");
  let optionBtns = [optionBtn1, optionBtn2, optionBtn3, optionBtn4];
  function nextQuestion(i) {
    questionEl.innerText = `${i + 1})${shuffledQuestions[i].question}`;
    for (let z = 0; z < 4; z++) {
      optionBtns[z].innerText = shuffledQuestions[i].options[z];
    }
  }
  nextBtn.addEventListener("click", () => {
    if(i<=shuffledQuestions.length-1) {
    nextQuestion(i);
    i++;
    }
  });

  //Changing color with modes
  if(mode=="challenge") {
    body2.classList.add("body2");
    optionBtns.forEach((el)=>{
        el.classList.add("btnC");
    }) 
  } else {
    body2.classList.add("body3");
    optionBtns.forEach((el)=>{
        el.classList.add("btnB");
  })
}

  //Selecting option effect
    let selectedanswer = "No answer";
  optionBtns.forEach((btn,index)=>{
    btn.addEventListener("click",(el)=>{
      optionBtns.forEach(b=>{
        b.classList.remove("opacity");
      })
      el.target.classList.add("opacity");
      selectedanswer = el.target.innerText;
    })
  })
  
//To store answer
function storeanswer1() {
  nextBtn.addEventListener("click",function adding() {
  if(selectedanswer!=0) {
    newanswer.push(selectedanswer);
  } else {
    newanswer.push("No answer");
  }
  selectedanswer = null;
  optionBtns.forEach(btn=>{
    btn.classList.remove("opacity");
  });
  a++;
  if(a===shuffledQuestions.length) {
    nextBtn.innerText = "Submit";
    nextBtn.removeEventListener("click",adding);
  }
  if(nextBtn.innerText=="Submit") {
    nextBtn.addEventListener("click",()=>{
        newanswer.push(selectedanswer);
      console.log("submission executed");
    checkScore1();
    mode1Result(m);
    submit = 1;
    })
  }
  })
  return ()=>newanswer;
};
storeanswer1();

}

//To check score of mode1
function checkScore1() {
  for(let i=0; i<newanswer.length; i++) {
    if(newanswer[i]===answers[i]) {
      console.log(newanswer[i]);
      mode1Score++;
    }
  }
}

//Summon mode1 result
function mode1Result(m) {
  document.body.innerHTML = '';
  let h1 = document.createElement('h1');
  let container = document.createElement('div');
  let scoreText = document.createElement('p');
  let message = document.createElement('p');
  let resultBtn = document.createElement('div');
  let tryAgainBtn = document.createElement('div');
  let homeBtn = document.createElement('div');
  let body1 = document.querySelector('body');
  h1.classList.add("heading1");
  container.classList.add("div1");
  scoreText.classList.add("scoreText");
  message.classList.add("message");
  body1.classList.add("body1");
  resultBtn.classList.add("resultBtns");
  tryAgainBtn.classList.add("resultBtn");
  tryAgainBtn.type = 'input';
  homeBtn.classList.add("resultBtn");
  homeBtn.type = 'input';
  h1.innerText = nameInput.value;
  scoreText.innerText = `Your final score is ${mode1Score}/${answers.length}`;
  tryAgainBtn.innerText = "Try Again";
  homeBtn.innerText = "Back to Home";
  if(mode1Score===totalScore) {
    message.innerText = "Perfect! You are a genius!";
  } else if(mode1Score>(totalScore/2)) {
    message.innerText = "Great job! Keep it up!";
  } else if (mode1Score<(totalScore/2)) {
    message.innerText = "Keep practicing! You can do better!"
  }
  body1.appendChild(container);
  body1.appendChild(resultBtn);
  resultBtn.appendChild(tryAgainBtn);
  resultBtn.appendChild(homeBtn);
  container.appendChild(h1);
  container.appendChild(scoreText);
  container.appendChild(message);
  tryAgainBtn.addEventListener("click",()=>{
    submit = 0;
    body1.classList.remove("body1");
    body1.classList.remove("body2");
    body1.innerHTML = '';
    body1.style.background = "";
    mode1Score = 0;
    answers = [];
    shuffledQuestions = [];
    newanswer = [];
    shuffledQuestions = getRandomQuestion(questionBank).slice(0,20);
    answers = shuffledQuestions.map(q=>q.answer);
    totalScore = answers.length;
    a = 1;
    if(m=="challenge") {
        countdown();
    } else {
        setTimeout(()=>{
            loadQuizScreen("basic");
        },1000);
    }
  })
  homeBtn.addEventListener("click",()=>{
    location.reload();
  })
}

//Challenge Mode
btn1.addEventListener("click", () => {
  countdown();
});

//Basic Mode
btn2.addEventListener("click",()=>{
    setTimeout(()=>{
        loadQuizScreen("basic");
    },1000);
})

const questionBank = [
    //Basic Maths
    { 
        question: "What is the value of 7 × 8?", 
        options: ["54", "56", "58", "60"], 
        answer: "56" 
    },
    { 
        question: "If a triangle has angles of 60° and 45°, what is the third angle?", 
        options: ["60°", "65°", "75°", "85°"], 
        answer: "75°" 
    },
    { 
        question: "What is 15% of 200?", 
        options: ["25", "30", "35", "40"], 
        answer: "30" 
    },
    { 
        question: "Solve: 144 ÷ 12", 
        options: ["10", "12", "14", "16"], 
        answer: "12" 
    },
    { 
        question: "What is the square root of 121?", 
        options: ["9", "10", "11", "12"], 
        answer: "11" 
    },
    { 
        question: "Find the missing number: 3, 6, 12, 24, __", 
        options: ["36", "42", "48", "54"], 
        answer: "48" 
    },
    { 
        question: "How many sides does a hexagon have?", 
        options: ["4", "5", "6", "7"], 
        answer: "6" 
    },
    { 
        question: "What is 9³ (9 raised to the power 3)?", 
        options: ["567", "681", "729", "810"], 
        answer: "729" 
    },
    { 
        question: "A number is multiplied by 7 and gives 84. What is the number?", 
        options: ["10", "11", "12", "14"], 
        answer: "12" 
    },
    { 
        question: "Convert 0.75 into a fraction.", 
        options: ["1/3", "2/3", "3/4", "4/5"], 
        answer: "3/4" 
    },
    { 
        question: "What is the perimeter of a square with side length 9 cm?", 
        options: ["18 cm", "27 cm", "36 cm", "45 cm"], 
        answer: "36 cm" 
    },
    { 
        question: "What is the LCM of 6 and 8?", 
        options: ["12", "18", "24", "36"], 
        answer: "24" 
    },
    { 
        question: "What is 45% of 400?", 
        options: ["150", "170", "180", "200"], 
        answer: "180" 
    },
    { 
        question: "A shopkeeper sells an item for ₹450 with a profit of ₹50. What was the cost price?", 
        options: ["₹350", "₹375", "₹400", "₹425"], 
        answer: "₹400" 
    },
    { 
        question: "What is the value of π (pi) up to 3 decimal places?", 
        options: ["3.142", "3.152", "3.162", "3.172"], 
        answer: "3.142" 
    },
    { 
        question: "If 3x = 27, what is x?", 
        options: ["3", "6", "9", "12"], 
        answer: "9" 
    },
    { 
        question: "How many prime numbers are there between 10 and 30?", 
        options: ["6", "7", "8", "9"], 
        answer: "8" 
    },
    { 
        question: "A bag has 5 red balls, 3 blue balls, and 2 green balls. What is the probability of picking a blue ball?", 
        options: ["1/3", "2/5", "3/10", "3/5"], 
        answer: "3/10" 
    },
    { 
        question: "A train travels at 60 km/h. How far will it travel in 3 hours?", 
        options: ["120 km", "150 km", "180 km", "200 km"], 
        answer: "180 km" 
    },
    { 
        question: "The area of a rectangle is 48 cm², and its width is 6 cm. What is the length?", 
        options: ["6 cm", "7 cm", "8 cm", "9 cm"], 
        answer: "8 cm" 
    },
    //Basic GK
      { 
          question: "Which is the largest continent in the world?", 
          options: ["Africa", "Asia", "Europe", "North America"], 
          answer: "Asia" 
      },
      { 
          question: "Who was the first President of India?", 
          options: ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"], 
          answer: "Dr. Rajendra Prasad" 
      },
      { 
          question: "What is the capital of Japan?", 
          options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], 
          answer: "Tokyo" 
      },
      { 
          question: "Which planet is known as the ‘Red Planet’?", 
          options: ["Venus", "Mars", "Jupiter", "Saturn"], 
          answer: "Mars" 
      },
      { 
          question: "Who is known as the Father of the Nation in India?", 
          options: ["Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh", "Jawaharlal Nehru"], 
          answer: "Mahatma Gandhi" 
      },
      { 
          question: "Which is the longest river in the world?", 
          options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], 
          answer: "Nile River" 
      },
      { 
          question: "Who invented the telephone?", 
          options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "James Watt"], 
          answer: "Alexander Graham Bell" 
      },
      { 
          question: "Which Indian state is known as the ‘Land of Five Rivers’?", 
          options: ["Uttar Pradesh", "Punjab", "Rajasthan", "Haryana"], 
          answer: "Punjab" 
      },
      { 
          question: "Who wrote the Indian National Anthem?", 
          options: ["Rabindranath Tagore", "Bankim Chandra Chattopadhyay", "Sarojini Naidu", "Subhas Chandra Bose"], 
          answer: "Rabindranath Tagore" 
      },
      { 
          question: "Which gas do plants use for photosynthesis?", 
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
          answer: "Carbon Dioxide" 
      },
      { 
          question: "What is the currency of the United Kingdom?", 
          options: ["Euro", "Dollar", "Pound Sterling", "Rupee"], 
          answer: "Pound Sterling" 
      },
      { 
          question: "Which festival is known as the ‘Festival of Lights’ in India?", 
          options: ["Holi", "Navratri", "Diwali", "Eid"], 
          answer: "Diwali" 
      },
      { 
          question: "Which is the national bird of India?", 
          options: ["Peacock", "Sparrow", "Eagle", "Parrot"], 
          answer: "Peacock" 
      },
      { 
          question: "Which Mughal emperor built the Taj Mahal?", 
          options: ["Babur", "Akbar", "Shah Jahan", "Aurangzeb"], 
          answer: "Shah Jahan" 
      },
      { 
          question: "Which ocean is the largest in the world?", 
          options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], 
          answer: "Pacific Ocean" 
      },
      { 
          question: "Who discovered gravity?", 
          options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], 
          answer: "Isaac Newton" 
      },
      { 
          question: "Which country is famous for the Great Wall?", 
          options: ["Japan", "China", "India", "South Korea"], 
          answer: "China" 
      },
      { 
          question: "Which sport is known as the ‘gentleman’s game’?", 
          options: ["Football", "Cricket", "Tennis", "Hockey"], 
          answer: "Cricket" 
      },
      { 
          question: "How many states are there in India?", 
          options: ["25", "26", "28", "29"], 
          answer: "28" 
      },
      { 
          question: "Which element is essential for breathing?", 
          options: ["Carbon", "Oxygen", "Nitrogen", "Hydrogen"], 
          answer: "Oxygen" 
      },
      //General science
        { 
            question: "What is the chemical formula of water?", 
            options: ["H2O", "CO2", "O2", "H2O2"], 
            answer: "H2O" 
        },
        { 
            question: "Which gas is most abundant in Earth's atmosphere?", 
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
            answer: "Nitrogen" 
        },
        { 
            question: "What is the smallest unit of life?", 
            options: ["Tissue", "Organ", "Cell", "Molecule"], 
            answer: "Cell" 
        },
        { 
            question: "Which vitamin is produced when the skin is exposed to sunlight?", 
            options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], 
            answer: "Vitamin D" 
        },
        { 
            question: "What is the process by which plants make their food?", 
            options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], 
            answer: "Photosynthesis" 
        },
        { 
            question: "What is the main function of red blood cells?", 
            options: ["Fight infections", "Carry oxygen", "Digest food", "Produce hormones"], 
            answer: "Carry oxygen" 
        },
        { 
            question: "Which planet is known as the ‘Evening Star’?", 
            options: ["Mars", "Venus", "Jupiter", "Saturn"], 
            answer: "Venus" 
        },
        { 
            question: "What is the boiling point of water at sea level?", 
            options: ["90°C", "100°C", "110°C", "120°C"], 
            answer: "100°C" 
        },
        { 
            question: "Which organ is responsible for pumping blood throughout the body?", 
            options: ["Liver", "Brain", "Heart", "Kidney"], 
            answer: "Heart" 
        },
        { 
            question: "What type of energy is stored in a battery?", 
            options: ["Thermal Energy", "Kinetic Energy", "Chemical Energy", "Nuclear Energy"], 
            answer: "Chemical Energy" 
        },
        { 
            question: "What is the SI unit of force?", 
            options: ["Newton", "Joule", "Watt", "Pascal"], 
            answer: "Newton" 
        },
        { 
            question: "Which part of the human body controls all functions and actions?", 
            options: ["Heart", "Brain", "Lungs", "Spinal Cord"], 
            answer: "Brain" 
        },
        { 
            question: "Which metal is liquid at room temperature?", 
            options: ["Gold", "Iron", "Mercury", "Silver"], 
            answer: "Mercury" 
        },
        { 
            question: "What is the powerhouse of the cell?", 
            options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], 
            answer: "Mitochondria" 
        },
        { 
            question: "What is the main gas responsible for global warming?", 
            options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], 
            answer: "Carbon Dioxide" 
        },
        { 
            question: "Which part of the plant is responsible for photosynthesis?", 
            options: ["Roots", "Stem", "Leaves", "Flowers"], 
            answer: "Leaves" 
        },
        { 
            question: "What is the process by which water changes from a liquid to a gas?", 
            options: ["Condensation", "Evaporation", "Freezing", "Sublimation"], 
            answer: "Evaporation" 
        },
        { 
            question: "What is the outermost layer of the Earth called?", 
            options: ["Mantle", "Core", "Crust", "Atmosphere"], 
            answer: "Crust" 
        },
        { 
            question: "Which vitamin helps in blood clotting?", 
            options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin K"], 
            answer: "Vitamin K" 
        },
        { 
            question: "What is the speed of light in a vacuum?", 
            options: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "500,000 km/s"], 
            answer: "300,000 km/s" 
        },
        //Logical reasoning
          { 
              question: "What comes next in the pattern? 2, 4, 6, 8, ?", 
              options: ["9", "10", "11", "12"], 
              answer: "10" 
          },
          { 
              question: "If a week has 7 days, how many days are there in 3 weeks?", 
              options: ["14", "15", "20", "21"], 
              answer: "21" 
          },
          { 
              question: "Which shape has four equal sides?", 
              options: ["Triangle", "Rectangle", "Square", "Circle"], 
              answer: "Square" 
          },
          { 
              question: "If a cow gives milk, what does a hen give?", 
              options: ["Eggs", "Wool", "Grass", "Meat"], 
              answer: "Eggs" 
          },
          { 
              question: "If you have 3 apples and take away 2, how many do you have?", 
              options: ["1", "2", "3", "5"], 
              answer: "2" 
          },
          { 
              question: "If a clock shows 9:00, what will be the time after 3 hours?", 
              options: ["10:00", "11:00", "12:00", "1:00"], 
              answer: "12:00" 
          },
          { 
              question: "Which number is missing? 5, 10, ?, 20, 25", 
              options: ["12", "13", "15", "18"], 
              answer: "15" 
          },
          { 
              question: "What is the opposite of 'Fast'?", 
              options: ["Slow", "Quick", "Speed", "Run"], 
              answer: "Slow" 
          },
          { 
              question: "Which object is the odd one out? Chair, Table, Bed, Apple", 
              options: ["Chair", "Table", "Bed", "Apple"], 
              answer: "Apple" 
          },
          { 
              question: "If Monday comes before Tuesday, which day comes after Wednesday?", 
              options: ["Monday", "Tuesday", "Thursday", "Friday"], 
              answer: "Thursday" 
          },
          { 
              question: "Which number should come next? 2, 4, 8, 16, ?", 
              options: ["20", "24", "32", "36"], 
              answer: "32" 
          },
          { 
              question: "If a pizza is cut into 4 equal parts, how many pieces will you have?", 
              options: ["2", "3", "4", "5"], 
              answer: "4" 
          },
          { 
              question: "If today is Saturday, what day will it be after 2 days?", 
              options: ["Sunday", "Monday", "Tuesday", "Wednesday"], 
              answer: "Monday" 
          },
          { 
              question: "Which number is the smallest? 15, 25, 35, 45", 
              options: ["15", "25", "35", "45"], 
              answer: "15" 
          },
          { 
              question: "If a triangle has 3 sides, how many sides does a pentagon have?", 
              options: ["4", "5", "6", "7"], 
              answer: "5" 
          },
          { 
              question: "Which animal can fly? Dog, Cat, Bird, Fish", 
              options: ["Dog", "Cat", "Bird", "Fish"], 
              answer: "Bird" 
          },
          { 
              question: "What do we use to tell time?", 
              options: ["Clock", "Book", "Spoon", "Shoes"], 
              answer: "Clock" 
          },
          { 
              question: "Which of the following is a fruit? Carrot, Potato, Banana, Onion", 
              options: ["Carrot", "Potato", "Banana", "Onion"], 
              answer: "Banana" 
          },
          { 
              question: "If you start with 10 chocolates and eat 4, how many are left?", 
              options: ["4", "5", "6", "7"], 
              answer: "6" 
          },
          { 
              question: "What is heavier? A feather, a balloon, a rock, or a leaf?", 
              options: ["Feather", "Balloon", "Rock", "Leaf"], 
              answer: "Rock" 
          },
          //NSD questions
            { 
                question: "When is National Science Day celebrated in India?", 
                options: ["January 28", "February 28", "March 28", "April 28"], 
                answer: "February 28" 
            },
            { 
                question: "National Science Day in India is celebrated to honor the discovery of which phenomenon?", 
                options: ["Photoelectric Effect", "Raman Effect", "Newton's Laws", "Radioactivity"], 
                answer: "Raman Effect" 
            },
            { 
                question: "Which Indian scientist discovered the Raman Effect?", 
                options: ["Homi Bhabha", "C. V. Raman", "A. P. J. Abdul Kalam", "Srinivasa Ramanujan"], 
                answer: "C. V. Raman" 
            },
            { 
                question: "In which year did C. V. Raman win the Nobel Prize in Physics?", 
                options: ["1925", "1930", "1935", "1940"], 
                answer: "1930" 
            },
            { 
                question: "Which institution did C. V. Raman work at when he discovered the Raman Effect?", 
                options: ["IIT Bombay", "Indian Institute of Science (IISc)", "University of Calcutta", "Banaras Hindu University"], 
                answer: "University of Calcutta" 
            },
            { 
                question: "Which color of light scatters the most in the Raman Effect?", 
                options: ["Red", "Blue", "Green", "Violet"], 
                answer: "Violet" 
            },
            { 
                question: "What does the Raman Effect explain?", 
                options: ["Reflection of light", "Change in wavelength of scattered light", "Formation of rainbows", "Absorption of light"], 
                answer: "Change in wavelength of scattered light" 
            },
            { 
                question: "What is the theme for National Science Day 2024?", 
                options: ["Science and Innovation", "Indigenous Technologies for a Self-Reliant India", "Science for a Sustainable Future", "Future of AI and Robotics"], 
                answer: "Indigenous Technologies for a Self-Reliant India" 
            },
            { 
                question: "Which organization in India promotes scientific research and innovation?", 
                options: ["ISRO", "CSIR", "DRDO", "All of the above"], 
                answer: "All of the above" 
            },
            { 
                question: "Which Indian scientist is known as the Missile Man of India?", 
                options: ["Homi Bhabha", "A. P. J. Abdul Kalam", "Satyendra Nath Bose", "C. V. Raman"], 
                answer: "A. P. J. Abdul Kalam" 
            },
            { 
                question: "Which ministry organizes National Science Day in India?", 
                options: ["Ministry of Education", "Ministry of Science and Technology", "Ministry of Defence", "Ministry of Health"], 
                answer: "Ministry of Science and Technology" 
            },
            { 
                question: "Which famous Indian space organization contributes to scientific advancements?", 
                options: ["NASA", "ISRO", "ESA", "CERN"], 
                answer: "ISRO" 
            },
            { 
                question: "Which fundamental force is responsible for the Raman Effect?", 
                options: ["Gravitational Force", "Electromagnetic Force", "Nuclear Force", "Frictional Force"], 
                answer: "Electromagnetic Force" 
            },
            { 
                question: "Which Indian physicist is known for his contributions to Quantum Mechanics?", 
                options: ["Satyendra Nath Bose", "C. V. Raman", "Homi Bhabha", "Vikram Sarabhai"], 
                answer: "Satyendra Nath Bose" 
            },
            { 
                question: "Which Indian scientist founded the Tata Institute of Fundamental Research (TIFR)?", 
                options: ["Homi Bhabha", "C. V. Raman", "A. P. J. Abdul Kalam", "Vikram Sarabhai"], 
                answer: "Homi Bhabha" 
            },
            { 
                question: "Which element was discovered by Indian scientist S. Chandrasekhar?", 
                options: ["Neutron", "Chandrasekhar Limit (related to White Dwarfs)", "Boson", "Electron"], 
                answer: "Chandrasekhar Limit (related to White Dwarfs)" 
            },
            { 
                question: "What is the significance of the Raman Effect in modern science?", 
                options: ["It is used in spectroscopic analysis", "It helps in diagnosing diseases", "It is used in forensic science", "All of the above"], 
                answer: "All of the above" 
            },
            { 
                question: "Which award is given by the Government of India for excellence in scientific research?", 
                options: ["Bharat Ratna", "Padma Bhushan", "Shanti Swarup Bhatnagar Award", "Dronacharya Award"], 
                answer: "Shanti Swarup Bhatnagar Award" 
            },
            { 
                question: "Which field of study deals with the study of light and its properties?", 
                options: ["Optics", "Acoustics", "Mechanics", "Thermodynamics"], 
                answer: "Optics" 
            },
            { 
                question: "What is the primary goal of celebrating National Science Day?", 
                options: ["To promote scientific awareness", "To honor C. V. Raman", "To encourage scientific research", "All of the above"], 
                answer: "All of the above" 
            },
              // Medium Maths (7 questions)
              { 
                  question: "What is the value of (5² + 4² - 2) ÷ 3?", 
                  options: ["9", "11", "13", "17"], 
                  answer: "13" 
              },
              { 
                  question: "If a train travels 360 km in 4 hours, what is its average speed?", 
                  options: ["80 km/h", "85 km/h", "90 km/h", "95 km/h"], 
                  answer: "90 km/h" 
              },
              { 
                  question: "What is the remainder when 145 is divided by 12?", 
                  options: ["1", "3", "5", "9"], 
                  answer: "1" 
              },
              { 
                  question: "A man buys an article for ₹400 and sells it for ₹500. What is his profit percentage?", 
                  options: ["20%", "25%", "30%", "40%"], 
                  answer: "25%" 
              },
              { 
                  question: "A circle has a radius of 7 cm. What is its area? (π = 3.14)", 
                  options: ["144.4 cm²", "154 cm²", "164.5 cm²", "176 cm²"], 
                  answer: "154 cm²" 
              },
              { 
                  question: "A number is increased by 20% and then decreased by 20%. What is the net effect?", 
                  options: ["No change", "Increased by 4%", "Decreased by 4%", "Decreased by 2%"], 
                  answer: "Decreased by 4%" 
              },
              { 
                  question: "A shopkeeper marks an item at ₹1200 and offers a 10% discount. What is the selling price?", 
                  options: ["₹1000", "₹1080", "₹1100", "₹1150"], 
                  answer: "₹1080" 
              },
          
              // Medium Logical Reasoning (7 questions)
              { 
                  question: "Which is the best anime of all time?", 
                  options: ["Attack on Titan", "One Piece", "Naruto", "Jujutsu Kaisen"], 
                  answer: "One Piece" 
              },
              { 
                  question: "What comes next in the pattern? 1, 3, 7, 15, 31, ?", 
                  options: ["49", "57", "63", "55"], 
                  answer: "63" 
              },
              { 
                  question: "A person walks 10 km north, then 6 km east, then 10 km south. How far is he from his starting point?", 
                  options: ["4 km", "6 km", "10 km", "12 km"], 
                  answer: "6 km" 
              },
              { 
                  question: "If a mirror shows the time as 3:45, what is the actual time?", 
                  options: ["8:15", "9:15", "10:15", "7:45"], 
                  answer: "8:15" 
              },
              { 
                  question: "A girl is 4 years older than her brother. If the sum of their ages is 20, what is the girl's age?", 
                  options: ["8", "10", "12", "14"], 
                  answer: "12" 
              },
              { 
                  question: "A father is twice as old as his son. After 10 years, the father's age will be 40. How old is the son now?", 
                  options: ["10", "15", "20", "25"], 
                  answer: "15" 
              },
              { 
                  question: "If 9 = 27, 7 = 15, and 5 = 7, then 3 = ?", 
                  options: ["5", "3", "1", "2"], 
                  answer: "3" 
              },
          
              // Medium General Knowledge (6 questions)
              { 
                  question: "Which Indian scientist is known as the ‘Rocket Man of India’?", 
                  options: ["Vikram Sarabhai", "A. P. J. Abdul Kalam", "Homi Bhabha", "C. V. Raman"], 
                  answer: "A. P. J. Abdul Kalam" 
              },
              { 
                  question: "Which country is known as the ‘Land of Rising Sun’?", 
                  options: ["China", "Japan", "Korea", "Vietnam"], 
                  answer: "Japan" 
              },
              { 
                  question: "Who was the first Indian woman in space?", 
                  options: ["Kalpana Chawla", "Sunita Williams", "Rakesh Sharma", "Indira Gandhi"], 
                  answer: "Kalpana Chawla" 
              },
              { 
                  question: "Which is the longest bone in the human body?", 
                  options: ["Humerus", "Femur", "Tibia", "Radius"], 
                  answer: "Femur" 
              },
              { 
                  question: "Who discovered the Theory of Relativity?", 
                  options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"], 
                  answer: "Albert Einstein" 
              },
              { 
                  question: "What does the CPU stand for in a computer?", 
                  options: ["Central Processing Unit", "Computer Power Unit", "Central Performance Unit", "Core Processing Unit"], 
                  answer: "Central Processing Unit" 
              }
];

//Get random questions
function getRandomQuestion(arr) {
    for(let i=arr.length-1;i>0;i--) {
        let j = Math.floor(Math.random()*(i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    return arr;
}
let shuffledQuestions = getRandomQuestion(questionBank).slice(0,20);

//Answer key
let answers = shuffledQuestions.map(q=>q.answer);
  let totalScore = answers.length;