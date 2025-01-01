const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const drop=document.querySelectorAll(".options select");
const BTN =document.getElementById("submit");
const fromCur=document.getElementById("from");
const toCur=document.getElementById("to");
const PARA=document.getElementById("answer");
let amount = document.getElementById("number");
let amountVal= document.getElementById("number").value;

drop.forEach(select => {
    for(const code in countryList) {
        let element=document.createElement('option');
        element.value=code;
        element.innerHTML=code;
        if(select.name==="from" && code==="USD") {
            element.selected="selected";
        }
        if(select.name==='to' && code==='PKR') {
            element.selected="selected";
        }
        select.appendChild(element);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
});

BTN.addEventListener("click",async (e)=> {
    e.preventDefault();
    let fromVal=fromCur.value.toLowerCase();
    const URL=`${BASE_URL}/${fromCur.value.toLowerCase()}.json`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    console.log(response);
    console.log(data);
    let toVal= toCur.value.toLowerCase();
    console.log(toVal);
    console.log(data[fromVal][toVal]);
    let amtVal=document.getElementById("number").value;
    let final=amtVal* data[fromVal][toVal];
    PARA.innerText=`${amtVal} ${fromCur.value} = ${final} ${toCur.value}`;
})

let updateFlag=(element)=> {
    let value=element.value;
    let code=countryList[value];
    let image=element.parentElement.querySelector("img");
    let newSrc=`https://flagsapi.com/${code}/flat/64.png`;
    image.src=newSrc;
}
