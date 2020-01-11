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
let seconds = document.querySelector("#timeSec");
let questionAnswered = document.querySelector(".quesAns");
let questionAnsweredcorrectly = document.querySelector(".qa");
let queCorrect = [];
let numm = 0;


const updateHour = () => {
        if (diffLevel[0]) {
                numm = 20;
        } else if (diffLevel[0]) {
                numm = 30;
        } else if (diffLevel[0]) {
                numm = 35;
        }
}


let correctAns = [];
let  clickedCount = [];
let wrongCorrect = [];


// count number of questions answered
const count = () => {
        let inputRad = document.querySelectorAll("input");
        let array2 = apiResults[0].results;
       
                inputRad.forEach((inputItem) => {
                        if (inputItem.checked === true) {
                       clickedCount.push(inputItem.value)
                        } else {
                        // do nothing
                        }
        
                        array2.forEach((obj) => {    
                                        for (var key in obj) {
                                                 if (key === "correct_answer") {
                                                       correctAns.push(obj[key]);
                                                } else {
                                                        // do nothing
                                                }
                                        }  
                            
                        })    
                })
        
        
        questionAnswered.innerHTML = "Questions answered: " + clickedCount.length;  

       answeredCorrectly();
        }


        const answeredCorrectly = () => {
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
                        clickedCount.forEach((item) => {
                                // console.log(item.innerHTML.split(" ").join(""))
                                // let itemEach = item.innerHTML.split(" ").join("");
                                // let corEach = String(correctAns).split(" ").join("");
                                        if(item === String(correctAns).split(" ").join("")) { 
                                                wrongCorrect.push(item)
                                              
                                        } else {
                                        // do nothing
                                         }
                        })
                })
                questionAnsweredcorrectly.innerHTML = "Questions answered Correctly: " + wrongCorrect.length; 
               
                
                }


// const count = () => {
//         let inputRad = document.querySelectorAll("input");
//         inputRad.forEach((inputItem) => {
//                 if (inputItem.checked === true) {
//                clickedCount.push(inputItem.value)
//                 } else {
//                 // do nothing
//                 }
                 
//                 console.log(clickedCount)
//                 console.log(clickedCount.length)
//         })
// }



//dynamic seconds
const secondsFun = (sec) => {
        sec = 0;
        let et = "0";
        let d = ":";
        let looper = setInterval(() => {
                if (sec === 59) {
                   sec = 0; 
                   tt = 0;   
                   seconds.innerHTML =numm +  d + et + tt
                } else if (sec < 9) {
                        let tt = Number(++sec);
                        seconds.innerHTML =numm + d + et + tt
                } else {
                        let tt = Number(++sec);
                        seconds.innerHTML = numm +  d + tt
                }
        }, 1000)
}

let checkInt = setInterval(() => {
if(testArea.innerHTML.length > 50){            
        secondsFun();
        clearInterval(checkInt)
}
}, 100)


//dynamic timer count down
const timer = (minutes) => {     
        numm = minutes;      
        setInterval(() => {
                if (minutes === 5) {
                        document.querySelector(".fixed").style.color = 'red';
                }

        }, 100)
        let looper = setInterval(() => {
                if (minutes === 0) {
                        // do nothing
                        document.querySelector(".up").textContent = "Sorry, your time is up!";
                        document.querySelector(".up").style.color = 'red'
                        computeResults();
                        clearInterval(looper)

                } else {
                        // let timeUI = document.querySelector("#timeUI");
                        let tt = Number(--minutes);
                        // timeUI.innerHTML = tt;
                        timeSpent.push(tt);
                        numm = tt;
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
        let finaltime = timeGiven - timeSpent[timeSpent.length - 1];
        modalBody.style.display = 'block';
        timespent.innerHTML = 'Time spent: ' + finaltime + " minutes";
        checkForSubmitButtonClicked = true;
        updateCatDiffOnCheckResults();
        clearInterval(loader); 
        count();
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
                                testAreaFunction();
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
                        li.innerHTML = `<input type="radio" value=${item.split(" ").join("")} name=${optionsArray.flat()} id=${randomNumForUniqId + item.split("").reverse().join("")} />
                                        <label for=${randomNumForUniqId + item.split("").reverse().join("")} id=${randomNumForUniqId + item.split("").reverse().join("")}>${item}</label>`
                                        testArea.appendChild(li);
                })
                // console.log(optionsArray.flat())
        })
}

// update static Time and set count down minutes parameter
const updateTime = (error) => {
        if (diffLevel[0] === "easy" && !(error)) {
                // document.querySelector("#timeUI").innerHTML = 20;
                timer(20);
                timeGiven = 20;
                numberOfQuestions = 15;
        } else if (diffLevel[0] === "medium" && !(error)) {
                // document.querySelector("#timeUI").innerHTML = 30;
                timer(30);
                timeGiven = 30;
                numberOfQuestions = 30;
        } else if (diffLevel[0] === "hard" && !(error)) {
                // document.querySelector("#timeUI").innerHTML = 35;
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


const loader = () => {
        setInterval(() => {
        if(testArea.innerHTML.length > 50 ){  
        inputBox();
        updateTime(error);    
        loadIcon.style.display = 'none';
        testArea.style.display = 'block';
        document.querySelector("#timeSec").style.display = "block";
        // work on this later, makes the button still on marking page
        document.querySelector("#checkanswer").style.display = "block";
        document.querySelector("#sub").style.display = "none";
        } else if (document.querySelector(".error").innerHTML.length > 10){
                loadIcon.style.display = 'none';
                testArea.style.display = 'none';
                // document.querySelector("#timeUI").style.display = "none";
                document.querySelector(".error").style.display = "block";
        } else  { 
        loadIcon.style.display = 'block';
        document.querySelector(".rules").style.display = "none";
        // document.querySelector("#timeUI").style.display = "none";
        }
}, 100)
}

// submit button
submitButton.addEventListener("click", () => {
       
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

        loader();
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
                        let itemEach = item.innerHTML.split(" ").join("");
                                if(itemEach === String(correctAns).split(" ").join("")) { 
                                        item.style.color = 'white'      
                                        item.style.backgroundColor = 'green'
                                        item.style.fontWeight = 'bold';
                                } else {
                                // do nothing
                                 }
                })
        })
        document.querySelector("#timeSec").style.display = 'none'
        document.querySelector(".modalBody").style.display = 'none'
        document.querySelector("#checkanswer").style.display = "none";
        document.querySelector("#sub").style.display = "none";
        document.querySelector("#startNew").style.display = 'block';
        document.querySelector(".fixed").style.display = 'none';
        clearInterval(loader);

}


checkCorrectAnswer.addEventListener("click", markAns)


document.querySelector("#startNew").onclick = () => {
        window.location.reload(true)
}