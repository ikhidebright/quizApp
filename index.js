// get and set key tags
let submitButton = document.querySelector("#sub");
let checkForTwoSelection = [];
let diffLevel = [];
let diffCat = [];
let error = [];
let difficulty = document.querySelector("#difficulty");
let category = document.querySelector("#category");


//dynamic timer count down
const timer = (minutes) => {
        setInterval(() => {
                if (minutes === 0) {
                        // do nothing     
                } else {
                        let timeUI = document.querySelector("#timeUI");
                        timeUI.innerHTML = Number(--minutes) + " minutes left";
                }
        }, 60000)
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

//show questions
const showQuestions = (results) => {
        let doc = document.querySelector(".questions");
        let headingQue = document.createElement("h5");
        results.map((que) => {
                headingQue.appendChild(document.createTextNode(que.question));
        });
        doc.appendChild(headingQue);
}


// getting data from api
const apiCall = (cat, diff) => {
        let api = `https://opentdb.com/api.php?amount=50&category=${cat}&difficulty=${diff}&type=multiple`
        fetch(api)
                .then((res) => {
                        if (res.status = 200) {
                                res.json().then((data) => showQuestions(data.results))
                        } else if (res.status > 200) {
                                console.log("an error occured");
                        }
                }).catch((err) => {
                        error.push(err.message);
                })
}


// update static Time and set count down minutes parameter
const updateTime = () => {
        if (diffLevel[0] === "easy" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 50 + " minutes left";
                timer(50);
        } else if (diffLevel[0] === "medium" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 40 + " minutes left";
                timer(40);
        } else if (diffLevel[0] === "hard" && !(error)) {
                document.querySelector("#timeUI").innerHTML = 45 + " minutes left";
                timer(45);
        }
}

// update the input areas
const inputBox = () => {
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
                document.querySelector(".rules").style.display = 'none';
                document.querySelector(".error").textContent = 'Sorry, an Error occurred. Check your Internet connection and try again';
        } else {
                document.querySelector(".error").style.display = "none";
                document.querySelector(".rules").style.display = "none";
        }
}


// if there is error
const thereIsError = () => {
        diffLevel = [];
        diffCat = [];
}


// update the UI
const UIcanInteract = () => {
        inputBox();
        updateTime();
        loading();
        thereIsError();
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
        UIcanInteract();
})