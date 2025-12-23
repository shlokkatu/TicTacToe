let boxes=document.querySelectorAll(".box");
let ResetButton=document.querySelector(".reset");
let HiddenResetButton=document.querySelector(".hiddenreset");
let NewGameButton=document.querySelector(".newgame");
let WinnerContainer=document.querySelector(".Winner-Container");
let submit1=document.querySelector("#submit1");
let submit2=document.querySelector("#submit2");
let inputs=document.querySelectorAll('input');
let user1name=document.getElementById('user1-name');
let user2name=document.getElementById('user2-name');
let symbol1name=document.getElementById('symbol1-name');
let symbol2name=document.getElementById('symbol2-name');
let msg=document.querySelector(".msg");
let scoremsg1=document.querySelector(".scoremsg1");
let scoremsg2=document.querySelector(".scoremsg2");
let turn0=true;
let count=0;
let score1=0;
let score2=0;
let player = {};
let name1 = null;
let name2 = null;
let symbol1 = null;
let symbol2 = null;
const WinningPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turn0=true;
    count=0;
    score1 = score2 = 0;
    name1 = name2 = symbol1 = symbol2 = null;
    enableBoxes();
    inputs.forEach(input => input.value='');
    WinnerContainer.classList.add("hide");
};

const playAgain=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    WinnerContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText=symbol1;
            turn0=false;
        } else{
            box.innerText=symbol2;
            turn0=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            GameDraw();
        }
    });
});

const GameDraw=()=>{
    msg.innerText=`Game was a Draw.`;
    WinnerContainer.classList.remove("hide");
    disableBoxes();
};

const scores=(Winner)=>{
    if(player[Winner]==name1){
        score1++;
    } else if (player[Winner]==name2){
        console.log("score2 increased")
        score2++;
    }
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(Winner) =>{
    scores(Winner);
    msg.innerText=`Congratulations, The Winner is ${player[Winner]}.`;
    scoremsg1.innerText=`${name1}'s score is ${score1}.`;
    scoremsg2.innerText=`${name2}'s score is ${score2}.`;
    WinnerContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () =>{
    for (let pattern of WinningPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != ""){
            if (pos1val===pos2val && pos2val===pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};

submit1.addEventListener("click", () => { 
    name1 = document.querySelector(".Player1name").value;
    symbol1 = document.querySelector("#input1").value;
    player[symbol1] = name1;
});

submit2.addEventListener("click", () => {
    name2 = document.querySelector(".Player2name").value;
    symbol2 = document.querySelector("#input2").value;
    player[symbol2] = name2;
});

function addTask(){
    if(user1name.value==="" || user2name.value===" " || symbol1name.value===" " || symbol2name.value===" " || user1name.value==="" || user2name.value==="" || symbol1name.value==="" || symbol2name.value===""){
        alert("Enter Your Details to Continue");
        location.reload();
    }
}

HiddenResetButton.addEventListener("click",resetGame);
ResetButton.addEventListener("click",resetGame);
NewGameButton.addEventListener("click",playAgain);