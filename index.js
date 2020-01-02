// timer
const timer = (minutes) => {
        setInterval(() => {
                if (minutes === 0) {
                        // do nothing     
                } else {
                        let timeUI = document.querySelector("#timeUI");
                        timeUI.innerHTML = Number(--minutes) + " Minutes left";
                }
        }, 1000)
}


window.onload = function () {
let submitButton = document.querySelector("#sub");
let btnArray = [];
let diffLevel = [];
let diffCat = [];

// get select options value
let difficulty = document.querySelector("#difficulty");
difficulty.addEventListener("change", function () {
        let diff = this.value;
        btnArray.push(diff);
        diffLevel.push(diff)
        setInterval(btnUI(), 400)
}, false);

let category = document.querySelector("#category");
category.addEventListener("change", function () {
       let  cat = this.value;
       btnArray.push(cat);
       diffCat.push(cat);
       setInterval(btnUI(), 400)
}, false);


// update button UI
const btnUI = () => {
        if(btnArray.length > 1) {
        document.querySelector("#sub").disabled = false;
        document.querySelector("#sub").className = 'btnact'
} else {
        document.querySelector("#sub").disabled = true;
        document.querySelector("#sub").className = 'btndis'
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

//show loading button
const loading = (shouldShowLoading) => {
        if(shouldShowLoading) {
        document.querySelector(".rules").textContent = 'Loading...';
        document.querySelector(".rules").className = 'loading';
} else {
        document.querySelector(".rules").style.display = "none";
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".rules").className = 'rules';
}
}


// getting data from api
const apiCall = (cat, diff) => {
        loading(true);
        let api = `https://opentdb.com/api.php?amount=50&category=${cat}&difficulty=${diff}&type=multiple`
        fetch(api)
        .then((res) => {
               if(res.status = 200){
                res.json().then((data) => showQuestions(data.results))
        } else if (res.status > 200) {
     console.log("an error occured");
        }
})
}


// updateTime
const updateTime = () => {
        // remove rules and Loading... 
        loading(false);
        if(diffLevel[0] === "easy") {
        document.querySelector("#timeUI").innerHTML = 50 + " Minutes left";
        } else if (diffLevel[0] === "medium") {
                document.querySelector("#timeUI").innerHTML = 40 + " Minutes left";
        } else if (diffLevel[0] === "hard") {
                document.querySelector("#timeUI").innerHTML = 45 + " Minutes left";
        }
}

// submit button
submitButton.addEventListener("click", () => {
if(diffLevel[0] === "easy") {
document.querySelector("#category").disabled = true;
document.querySelector("#difficulty").disabled = true;
timer(50);
apiCall(diffCat[0], diffLevel[0]);
} else if (diffLevel[0] === "medium") {
        document.querySelector("#category").disabled = true;
        document.querySelector("#difficulty").disabled = true;
        timer(40);
        apiCall(diffCat[0], diffLevel[0]);
} else if (diffLevel[0] === "hard") {
        document.querySelector("#category").disabled = true;
        document.querySelector("#difficulty").disabled = true;
        timer(45);
        apiCall(diffCat[0], diffLevel[0]);
}
})
}