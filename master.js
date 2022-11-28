// import * as bubble from "./assets/js/bubbleSort.js";
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

//?-------VARIABLES AND DECLARATIONS---------

var arr2 =[
    {
        value: 45,
        color: "blue",
    },
    {
        value: 78,
        color: "blue",
    },
    {
        value: 36,
        color: "blue",
    },
    {
        value: 4,
        color: "blue",
    },
    {
        value: 44,
        color: "blue",
    },
    {
        value: 77,
        color: "blue",
    },
    {
        value: 13,
        color: "blue",
    },
    {
        value: 3,
        color: "blue",
    },
    {
        value: 7,
        color: "blue",
    },
    {
        value: 26,
        color: "blue",
    },
    {
        value: 44,
        color: "blue",
    },
    {
        value: 14,
        color: "blue",
    },
    {
        value: 27,
        color: "blue",
    },
    {
        value: 89,
        color: "blue",
    },
    {
        value: 67,
        color: "blue",
    },
    {
        value: 16,
        color: "blue",
    },
    {
        value: 44,
        color: "blue",
    },
    {
        value: 10,
        color: "blue",
    },
    {
        value: 65,
        color: "blue",
    },
    {
        value: 73,
        color: "blue",
    },
    {
        value: 82,
        color: "blue",
    },
    {
        value: 91,
        color: "blue",
    },
    {
        value: 11,
        color: "blue",
    },
    
]

//?-------DOM ELEMENTS SELECTED HERE---------
var barcontainer = document.querySelector(".barcontainer");
var bubblebtn = document.querySelector(".bubblesortbtn");
var SpeedSliderVal = document.querySelector("#slider1");


//? ------EXECUTION--------------------------
window.addEventListener("load",function(){
    renderBars();
});
bubblebtn.addEventListener("click",function(){
    bubbleSort();
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

//? -------------------------------------------
async function bubbleSort()
{
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
    }

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
    return bar*5;
};

//? GENERATE NEW ARRAY FEATURE----------
function generateNewArray(size)
{
    

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
