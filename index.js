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
let timeSpent = [];
let timeGiven = 0;
let checkForSubmitButtonClicked = false;

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
                        timeUI.innerHTML = tt + " minutes left";
                        timeSpent.push(tt);
                }
        }, 1000)

        if (checkForSubmitButtonClicked === true) {
                clearInterval(looper);
        }
}


// get selected difficulty option
difficulty.addEventListener("change", function () {
        let diff = this.value;
        checkForTwoSelection.push(diff);
        diffLevel = [];
        diffLevel.push(diff)
        setInterval(buttonUpdate(), 400)
}, false);


// get selected category option
category.addEventListener("change", function () {
        let cat = this.value;
        checkForTwoSelection.push(cat);
        diffCat = [];
        diffCat.push(cat);
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
}
// assign computeResults function to checkanswersbutton

checkanswerbutton.addEventListener("click", computeResults);


//update test area
const testAreaFunction = () => {
        let array = apiResults[0].results;
        array.forEach((obj) => {
                let optionsArray = [];
                for (var key in obj) {
                        if (Array.isArray(obj[key])) {
                                optionsArray.push(obj[key]);
                        } else if (key === "question") {
                                let h = document.createElement("h5");
                                h.appendChild(document.createTextNode(obj[key]))
                                testArea.appendChild(h);
                        } else if (key === "correct_answer") {
                                optionsArray.push(obj[key]);
                        } else {
                                // do nothing
                        }
                }
                optionsArray.flat().forEach((item) => {
                        let li = document.createElement("li");
                        li.appendChild(document.createTextNode(item));
                        testArea.appendChild(li);
                })
                // console.log(optionsArray.flat())
        })
        updateCatDiffOnCheckResults();
        document.querySelector("#checkanswer").style.display = "block";
        document.querySelector("#sub").style.display = "none";
}



//show questions
// const showQuestions = () => { 
//         let doc = document.querySelector(".questions");
//         let headingQue = document.createElement("h6");
//         apiResults[0].results.map((que) => { 
//                 document.querySelector("#checkanswer").style.display = "block";
//                 document.querySelector("#sub").style.display = "none";
//                 console.log(apiResults);
//                 headingQue.appendChild(document.createTextNode(que.question));
//                 doc.appendChild(headingQue);
//         });                 
//         updateCatDiffOnCheckResults();

// }

const updateCatDiffOnCheckResults = () => {
        document.querySelector(".catShow").innerHTML = "Question Category: " + apiResults[0].results[0].category;
        document.querySelector(".diffShow").innerHTML = "Difficulty Level: " + apiResults[0].results[0].difficulty;

}


// getting data from api
const apiCall = (cat, diff) => {
        let api = `https://opentdb.com/api.php?amount=5&category=${cat}&difficulty=${diff}&type=multiple`
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


// update static Time and set count down minutes parameter
const updateTime = (error) => {
        if (diffLevel[0] === "easy" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 50 + " minutes left";
                timer(50);
                timeGiven = 50;
        } else if (diffLevel[0] === "medium" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 40 + " minutes left";
                timer(40);
                timeGiven = 40;
        } else if (diffLevel[0] === "hard" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 45 + " minutes left";
                timer(45);
                timeGiven = 45;
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


// submit button
submitButton.addEventListener("click", () => {
        //set  parameters for the api to use
        if (diffLevel[0] === "easy") {
                apiCall(diffCat[0], diffLevel[0]);
        } else if (diffLevel[0] === "medium") {
                apiCall(diffCat[0], diffLevel[0]);
        } else if (diffLevel[0] === "hard") {
                apiCall(diffCat[0], diffLevel[0]);
        }
})