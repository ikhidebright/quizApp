// get and set key tags
let submitButton = document.querySelector("#sub");
let checkForTwoSelection = [];
let diffLevel = [];
let diffCat = [];
let error = [];
let apiResults = [];
let difficulty = document.querySelector("#difficulty");
let category = document.querySelector("#category");
let checkanswerbutton = document.querySelector("#checkanswer");
let modalBody = document.querySelector(".modalBody");
let timespent = document.querySelector(".timespent");
let catShow = document.querySelector(".catShow");
let diffShow = document.querySelector(".diffShow");
let testArea = document.querySelector(".testArea");
let checkCorrectAnswer = document.querySelector(".correctAnswers");
let timeSpent = [];
let timeGiven = 0;
let numberOfQuestions = 0;
let checkForSubmitButtonClicked = false;
let loadIcon = document.querySelector(".centerSticky");

//dynamic timer count down
const timer = (minutes) => {
        setInterval(() => {
                if (minutes === 5) {
                        document.querySelector("#timeUI").className = 'timeUpUI';
                }

        }, 100)
        let looper = setInterval(() => {

                if (minutes === 0) {
                        // do nothing
                        document.querySelector(".up").textContent = "Sorry, your time is up!";
                        document.querySelector(".up").style.color = 'red'
                        computeResults();

                } else {
                        let timeUI = document.querySelector("#timeUI");
                        let tt = Number(--minutes);
                        timeUI.innerHTML = tt + " min left";
                        timeSpent.push(tt);
                }
        }, 60000)

        if (checkForSubmitButtonClicked === true) {
                clearInterval(looper);
        }
}

// update number of ques
const updateNumberOfQuestions = () => {
        if (diffLevel[0] === "easy") {
                numberOfQuestions = 15;
        } else if (diffLevel[0] === "medium") {
                numberOfQuestions = 30;
        } else if (diffLevel[0] === "hard") {
                numberOfQuestions = 45;
        }
}

// get selected difficulty option
difficulty.addEventListener("change", function () {
        let diff = this.value;
        checkForTwoSelection.push(diff);
        diffLevel = [];
        diffLevel.push(diff)
        updateNumberOfQuestions();
        setInterval(buttonUpdate(), 400)
}, false);


// get selected category option
category.addEventListener("change", function () {
        let cat = this.value;
        checkForTwoSelection.push(cat);
        diffCat = [];
        diffCat.push(cat);
        updateNumberOfQuestions();
        setInterval(buttonUpdate(), 400)
}, false);


// update button UI
const buttonUpdate = () => {
        if (checkForTwoSelection.length > 1) {
                document.querySelector("#sub").disabled = false;
                document.querySelector("#sub").className = 'activeButton'
        } else {
                document.querySelector("#sub").disabled = true;
                document.querySelector("#sub").className = 'disabledButton'
        }
}


// calculate results and update UI and other updates
const computeResults = () => {
        let finaltime = timeGiven - timeSpent[timeSpent.length - 2];
        modalBody.style.display = 'block';
        timespent.innerHTML = 'Time spent: ' + finaltime + " minutes";
        checkForSubmitButtonClicked = true;
        updateCatDiffOnCheckResults();

}
// assign computeResults function to checkanswersbutton

checkanswerbutton.addEventListener("click", computeResults);


// getting data from api
const apiCall = (numberOfQuestions, cat, diff) => {
        let api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${cat}&difficulty=${diff}&type=multiple`
        fetch(api)
                .then((res) => {
                        document.querySelector(".error").style.display = "none";
                        document.querySelector(".rules").textContent = "Loading...";
                        res.json().then((data) => {
                                document.querySelector(".error").style.display = "none";
                                document.querySelector(".rules").style.display = "none";
                                apiResults.push(data);
                                // console.log(data.results)
                                // showQuestions();
                                testAreaFunction();
                                inputBox();
                                updateTime();
                        })
                }).catch((err) => {
                        error.push(err.message);
                        loading();
                        thereIsError();
                })
}


//update category and difficulty levels on results page
const updateCatDiffOnCheckResults = () => {
        document.querySelector(".catShow").innerHTML = "Question Category: " + apiResults[0].results[0].category;
        document.querySelector(".diffShow").innerHTML = "Difficulty Level: " + apiResults[0].results[0].difficulty;
        document.querySelector(".totalQues").innerHTML = "Total question: " + numberOfQuestions;

}


//funtion to mix options array
const mix = (arrayA) => {
        let currentIndex =  arrayA.length,
        temporaryValue, randomIndex;
        while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arrayA[currentIndex];
        arrayA[currentIndex] = arrayA[randomIndex];
        arrayA[randomIndex] = temporaryValue;
}
        return arrayA
}


//update test area
const testAreaFunction = () => {
        let array = apiResults[0].results;
        array.forEach((obj) => {
                let optionsArray = [];
                for (var key in obj) {
                        if (Array.isArray(obj[key])) {
                                optionsArray.push(obj[key]);
                        } else if (key === "question") {
                                let h = document.createElement("h6");
                                h.className = 'dynamicQuestionHeading'
                                h.innerHTML =obj[key];
                                testArea.appendChild(h);
                        } else if (key === "correct_answer") {
                                optionsArray.push(obj[key]);
                        } else {
                                // do nothing
                        }
                }
                

                let mixF = optionsArray.flat();

                let mixA = mix(mixF)

                mixA.forEach((item) => {

                        let random =() => {
                                return  Math.floor(Math.random () * 10);
                        }
                        
                        let a = random();
                        let b = random();
                        let c = random();
                        let d = random();
                        let e = random();
                        let f = random();
                        let g = random();
                        let h = random();
         
                        let randomNumForUniqId = a + b + c + d +e + f + g + h;

                        //create list element
                        let li = document.createElement("li");
                        li.innerHTML = `<input type="radio" name=${optionsArray.flat()} id=${randomNumForUniqId + item.split("").reverse().join("")} />
                                        <label for=${randomNumForUniqId + item.split("").reverse().join("")} id=${randomNumForUniqId + item.split("").reverse().join("")}>${item}</label>`
                                        testArea.appendChild(li);
                })
                // console.log(optionsArray.flat())
        })
        document.querySelector("#checkanswer").style.display = "block";
        document.querySelector("#sub").style.display = "none";
}

// update static Time and set count down minutes parameter
const updateTime = (error) => {
        if (diffLevel[0] === "easy" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 20 + " min left";
                timer(20);
                timeGiven = 20;
                numberOfQuestions = 15;
        } else if (diffLevel[0] === "medium" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 30 + " min left";
                timer(30);
                timeGiven = 30;
                numberOfQuestions = 30;
        } else if (diffLevel[0] === "hard" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 35 + " min left";
                timer(35);
                timeGiven = 35;
                numberOfQuestions = 45
        }
}

// update the input areas
const inputBox = (error) => {
        if (diffLevel[0] === "easy" && !(error)) {
                document.querySelector("#category").disabled = true;
                document.querySelector("#difficulty").disabled = true;
        } else if (diffLevel[0] === "medium" && !(error)) {
                document.querySelector("#category").disabled = true;
                document.querySelector("#difficulty").disabled = true;
        } else if (diffLevel[0] === "hard" && !(error)) {
                document.querySelector("#category").disabled = true;
                document.querySelector("#difficulty").disabled = true;
        }
}


//show loading button
const loading = () => {
        if (error) {
                document.querySelector(".rules").style.display = "none";
                document.querySelector(".error").textContent = 'Sorry, an Error occurred. Check your Internet connection and try again';
        }
}


// if there is error
const thereIsError = () => {
        diffLevel = [];
        diffCat = [];
}


const loader = () => {setInterval(() => {
        if(testArea.innerHTML.length > 200 && document.querySelector("#timeUI").innerHTML.length > 5){
        loadIcon.style.display = 'none';
        testArea.style.display = 'block';
        document.querySelector("#timeUI").style.display = "block";
        } else if (document.querySelector(".error").innerHTML.length > 10){
                loadIcon.style.display = 'none';
                testArea.style.display = 'none';
                document.querySelector("#timeUI").style.display = "none";
                document.querySelector(".error").style.display = "block";
        } else  { 
        loadIcon.style.display = 'block';
        document.querySelector(".rules").style.display = "none";
        }
}, 100)
}

// submit button
submitButton.addEventListener("click", () => {
        loader();
        //set  parameters for the api to use
        if (diffLevel[0] === "easy") {
                apiCall(numberOfQuestions, diffCat[0], diffLevel[0]);
                updateNumberOfQuestions();
        } else if (diffLevel[0] === "medium") {
                apiCall(numberOfQuestions, diffCat[0], diffLevel[0]);
                updateNumberOfQuestions();
        } else if (diffLevel[0] === "hard") {
                apiCall(numberOfQuestions, diffCat[0], diffLevel[0]);
                updateNumberOfQuestions();
        }
})




//check for correct answers and close the results dialog box

const markAns  = () => {
        let getLabelText = document.querySelectorAll("label");
        let inputRad = document.querySelectorAll("input[type=radio]");
        inputRad.forEach((inputItem) => {
                inputItem.disabled = true;
        })
        let array2 = apiResults[0].results;
        array2.forEach((obj) => {       
        let correctAns = [];
                for (var key in obj) {
                         if (key === "correct_answer") {
                               correctAns.push(obj[key]);
                        } else {
                                // do nothing
                        }
                }   

                getLabelText.forEach((item) => {
                        if(item.innerHTML.includes(correctAns)) { 
                        item.style.color = 'white'      
                        item.style.backgroundColor = 'green'
                        item.style.fontWeight = 'bold'} else { }
                })
        })
        document.querySelector("#timeUI").style.display = 'none'
        document.querySelector(".modalBody").style.display = 'none'
        document.querySelector("#checkanswer").style.display = "none";
        document.querySelector("#sub").style.display = "none";
        document.querySelector("#startNew").style.display = 'block'
}


checkCorrectAnswer.addEventListener("click", markAns)


document.querySelector("#startNew").onclick = () => {
        window.location.reload(true)
}