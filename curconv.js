const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const exBtn=document.querySelector(".exBtn");
const fromCur=document.querySelector(".from select");
const toCur=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(curCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curCode;
        newOption.value = curCode;
        if(select.name === "from" && curCode==="USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && curCode==="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
};

const updateFlag = (element)=>{
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src = newsrc;
};

exBtn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate =async ()=>{
    let amt=document.querySelector(".amount input");
    let amtVal = amt.value;
    if(amtVal === "" || amtVal<1){
        amtVal = 1;
        amt.value = "1";
    }
const URL = `${baseURL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate =data[toCur.value.toLowerCase()];
let finalAmt = amtVal * rate;
msg.innerText = `${amtVal} ${fromCur.value} = ${finalAmt} ${toCur.value}`;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});