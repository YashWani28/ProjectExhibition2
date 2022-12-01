// import * as bubble from "./assets/js/bubbleSort.js";
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

//?-------VARIABLES AND DECLARATIONS---------
class barobj{
    constructor(value,color)
    {
        this.value = value;
        this.color = color;
    }
}
var arr2 =[

    // {
    //     value: 45,
    //     color: "blue",
    // },
    // {
    //     value: 78,
    //     color: "blue",
    // },
    // {
    //     value: 36,
    //     color: "blue",
    // },
    // {
    //     value: 4,
    //     color: "blue",
    // },
    // {
    //     value: 44,
    //     color: "blue",
    // },
    // {
    //     value: 77,
    //     color: "blue",
    // },
    // {
    //     value: 13,
    //     color: "blue",
    // },
    // {
    //     value: 3,
    //     color: "blue",
    // },
    // {
    //     value: 7,
    //     color: "blue",
    // },
    // {
    //     value: 26,
    //     color: "blue",
    // },
    // {
    //     value: 44,
    //     color: "blue",
    // },
    // {
    //     value: 14,
    //     color: "blue",
    // },
    // {
    //     value: 27,
    //     color: "blue",
    // },
    // {
    //     value: 89,
    //     color: "blue",
    // },
    // {
    //     value: 67,
    //     color: "blue",
    // },
    // {
    //     value: 16,
    //     color: "blue",
    // },
    // {
    //     value: 44,
    //     color: "blue",
    // },
    // {
    //     value: 10,
    //     color: "blue",
    // },
    // {
    //     value: 65,
    //     color: "blue",
    // },
    // {
    //     value: 73,
    //     color: "blue",
    // },
    // {
    //     value: 82,
    //     color: "blue",
    // },
    // {
    //     value: 91,
    //     color: "blue",
    // },
    // {
    //     value: 11,
    //     color: "blue",
    // },
    
]

//?-------DOM ELEMENTS SELECTED HERE---------
var barcontainer = document.querySelector(".barcontainer");

var bubblebtn = document.querySelector(".bubblesortbtn");
var insertionbtn = document.querySelector(".insertionsortbtn");
var selectionbtn = document.querySelector(".selectionsortbtn");
var mergebtn = document.querySelector(".mergesortbtn");
var heapbtn = document.querySelector(".heapsortbtn");

var SpeedSliderVal = document.querySelector("#slider1");
var ElementsSliderVal = document.querySelector("#slider2");
var RandomArrBtn = document.querySelector("#generatearrbtn");

var tobedisabled = document.querySelectorAll(".disenable");


//? ------EXECUTION--------------------------
// arr2.push(new barobj(99,"blue"));
window.addEventListener("load",function(){
    console.log("loaded successfully");
    SetZoomSort();
    renderInitialBars(ElementsSliderVal.value);
    renderBars();
});
RandomArrBtn.addEventListener("click",function(){
    arr2 = [];
    clearbars();
    renderInitialBars(ElementsSliderVal.value);
    // console.log(arr2);
    renderBars();
})
bubblebtn.addEventListener("click",function(){
    bubbleSort();
})
ElementsSliderVal.addEventListener("change",function(){
    arr2 = [];
    clearbars();
    renderInitialBars(ElementsSliderVal.value);
    // console.log(arr2);
    renderBars();

})


//? COLOR CHANGING-----------------------------
function turnyellow(bara,barb)
{
    bara.color= "yellow";
    barb.color= "yellow";
    renderBars();
    
}
function turnblue(bara,barb)
{
    bara.color= "blue";
    barb.color= "blue";
    renderBars();
    
}
function turngreen(bara,barb)
{
    bara.color= "green";
    barb.color= "green";
    renderBars();
    
}
function turnred(bara,barb)
{
    bara.color= "red";
    barb.color= "red";
    renderBars();
    
}
function turnpurple(bar)
{
    bar.color= "purple";
   
    renderBars();
    
}

//? --FUNCTIONS---------------------------------
function renderInitialBars(barcount) //function to generate random valued bars...only modifies arr2 with random values
{
    for(let i=0;i<barcount;i++)
    {
        arr2.push(new barobj(Math.floor((Math.random()*100+1)),"blue"))
    }
    console.log(arr2);
}
async function bubbleSort()
{
    disable();
    var currsize = arr2.length;
    for(let i=0;i<arr2.length;i++)
    {
        currsize--;
        for(let j=0;j<currsize;j++)
        {
            let speedval = 505 - (SpeedSliderVal.value);//*it will change ar runtime but will lag a little
            //while comparing them both turn yellow
            turnyellow(arr2[j],arr2[j+1]);
            await sleep(speedval);
            if(arr2[j].value>arr2[j+1].value)
            {
                turnred(arr2[j],arr2[j+1]);
                await sleep(speedval);
                
                [arr2[j].value,arr2[j+1].value] = [arr2[j+1].value,arr2[j].value];
                clearbars();
                renderBars();
                await sleep(speedval);
                
            }
            turngreen(arr2[j],arr2[j+1]);
            await sleep(speedval);
            turnblue(arr2[j],arr2[j+1]);
            await sleep(speedval);
        }
        turnpurple(arr2[arr2.length-1-i]);
        
    }
    enable();

};
async function renderBars() {
    clearbars();
    for(let i=0;i<arr2.length;i++) {
        renderSinglebar(arr2[i]);
      
        // let barheight = setHeight(arr[i]);
        // console.log(barheight);
        // let bar = document.createElement("div");
        // bar.classList.add("bars");
        // bar.style.height = `${barheight}px`;
        // barcontainer.appendChild(bar);
    }
};
function renderSinglebar(barnumber)
{
    let barheight = setHeight(barnumber.value);
    // console.log("hi");
    let bar = document.createElement("div");
    bar.textContent = "     "+barnumber.value;
    bar.classList.add("bars");
    // bar.classList.add("blue");
    bar.style.height = `${barheight}px`;
    bar.style.backgroundColor = `${barnumber.color}`;
    barcontainer.appendChild(bar);
};
async function clearbars()
{
    barcontainer.innerHTML="";
};
function setHeight(bar)
{
    return bar*4;
};
function disable()
{

    tobedisabled.forEach(element => {
        element.disabled = true;
        element.classList.add("disable")
    });
}
function enable()
{
    tobedisabled.forEach(element => {
        element.disabled = false;
        element.classList.remove("disable")

    });
}
function SetZoomSort()
{
    var Page = document.getElementById('Body');
    var zoom = "100%";
    Page.style.zoom = zoom;
    return false;
}



//? UTILITY FUNCTIONS for understanding and debugging---------
function printarr()
{
    arr2.forEach(element => {
        console.log(element.value);
    });
};
function calltest()
{
    console.log("called successfully");
};
