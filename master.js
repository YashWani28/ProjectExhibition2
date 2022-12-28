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
var animations={
    red : [],
    arrOfarr :[],
    green : [],
    sequence: [],
}
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

/*Modal variables*/
var modalcontainer = document.querySelector(".sortmodal_container");
var visbtn = document.querySelector(".startvisbtn");
var translayer = document.querySelector(".trans_layer");


//? ------EXECUTION--------------------------
// arr2.push(new barobj(99,"blue"));
window.addEventListener("load",function(){
    console.log("loaded successfully");
    showmodal();
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
ElementsSliderVal.addEventListener("change",function(){
    arr2 = [];
    clearbars();
    renderInitialBars(ElementsSliderVal.value);
    // console.log(arr2);
    renderBars();
    
})
visbtn.addEventListener("click",function(){
    hidemodal();
})
bubblebtn.addEventListener("click",function(){
    bubbleSort();
})
mergebtn.addEventListener("click",function(){
    disable();
    // console.log(arr2);
    animations.green=[];
    animations.red=[];
    animations.arrOfarr=[];
    animations.sequence=[];
    printarr();
    console.log("");
    var auxarr = JSON.parse(JSON.stringify(arr2));
    mergeSort(auxarr,0,arr2.length-1);
    console.log("");
    console.log(animations);
   
    AnimateMergeSort(animations);
        
    

})


//? COLOR CHANGING AND ANIMATION FUNCTIONS-----------------------------
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
    if(renderBars())
    {
        return true;
    }
    
    
}
function turngreen(bara,barb)
{
    bara.color= "green";
    barb.color= "green";
    if(renderBars())
    {
        return true;
    }
    
    
}
function turnred(bara,barb)
{
    bara.color= "red";
    barb.color= "red";
    if(renderBars())
    {
        
        return true;
    }
    
}
function turnpurple(bar)
{
    bar.color= "purple";
   
    renderBars();
    
}
async function AnimateMergeSort(instructions){
    let speedval = 505 - (SpeedSliderVal.value);//*it will change at runtime but will lag a little
    let redptr=0;
    let greenptr = 0;
    let arrptr=0;
    for(let x=0;x<instructions.sequence.length;x++)
    {
        let instruct = instructions.sequence[x];
        if(instruct === "r")
        {
            let red1=instructions.red[redptr];
            let red2=instructions.red[redptr+1];
            turnred(arr2[red1],arr2[red2]);
            await sleep(speedval);
            turnblue(arr2[red1],arr2[red2]);
            redptr+=2;
        }
        else if(instruct === "g")
        {
            let green1=instructions.green[greenptr];
            let green2=instructions.green[greenptr+1];
            turngreen(arr2[green1],arr2[green2]);
            await sleep(speedval);
            turnblue(arr2[green1],arr2[green2]);
            greenptr+=2;
        }
        else if(instruct === "a")
        {
            // for(let i=0;i<instructions.arrOfarr.length;i++)
            // {
                arr2 = JSON.parse(JSON.stringify(instructions.arrOfarr[arrptr]));
                renderBars();
                await sleep(speedval);
                arrptr++;
            // }

        }

    }
    enable();
    return true;
    
    
}

//? --FUNCTIONS---------------------------------
function renderInitialBars(barcount) //function to generate random valued bars...only modifies arr2 with random values
{
    
    // arr2=[
    //     {
    //         value: 6,
    //         color: "blue",
    //     },
    //     {
    //         value: 5,
    //         color: "blue",
    //     },
    //     {
    //         value: 4,
    //         color: "blue",
    //     },
    //     {
    //         value: 3,
    //         color: "blue",
    //     },    
    // ]
    for(let i=0;i<barcount;i++)
    {
        arr2.push(new barobj(Math.floor((Math.random()*100+1)),"blue"))

    }
    console.log(arr2);
}
async function bubbleSort()
{
    disable();// disables all the other buttons 
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
// async function merge(arr2,left,mid,right){
//     let speedval = 505 - (SpeedSliderVal.value);//*it will change ar runtime but will lag a little
    
//     let p1= left;
//     let p2=mid+1;
//     let temp= [];
//     while(p1<=mid && p2<=right)
//     {
//         if(arr2[p1].value<arr2[p2].value)
//         {
//             temp.push(arr2[p1].value);
//             p1++;
//         }
//         else{
//             temp.push(arr2[p2].value);
//             p2++;
//         }
        
//     }
//     while(p2<=right)
//     {
//         temp.push(arr2[p2].value);
//         p2++;
//     }
//     while(p1<=mid)
//     {
//         temp.push(arr2[p1].value);
//         p1++;

//     }
//     let index = 0;
//     for(let i=left;i<=right;i++)
//     {
//         arr2[i].value=temp[index];
//         index++;
        
       
//     }
//     return;
// }
// async function mergeSort(arr,left,right)
// {
//     let speedval = 505 - (SpeedSliderVal.value);//*it will change ar runtime but will lag a little
//     if(left>=right)
//     {
//         return ;
//     }
//     let mid = Math.floor(left +(right-left)/2);
    
//     mergeSort(arr,left,mid);
    
//     mergeSort(arr,mid+1,right);
    
//     merge(arr,left,mid,right);
//     await sleep(speedval);
    
// }
async function merge(auxarr,left,mid,right){
    // //clearing all animations 
    
    let temparr = JSON.parse(JSON.stringify(auxarr));
    let p1= left;
    let p2=mid+1;

    let temp= [];
    
    let indx = p1;
    while(p1<=mid && p2<=right)
    {
        let greendeterminer = 0;//just to solve the greencolor bug
        animations.red.push(p1);
        animations.red.push(p2);
        animations.sequence.push("r"); //stands for read next 2 values from red array
        if(temparr[p1].value<=temparr[p2].value)
        {    
            
            indx++;
            p1++;
        }
        else{
            greendeterminer=1;
            let temp = auxarr[p2].value;
            for(let i=p2;i>indx;i--)
            {
                auxarr[i].value=auxarr[i-1].value;
            }
            auxarr[indx].value=temp;
            p2++;
            indx++;
        }
        //! we will need to create deep copy of arr2 and then push it inside arrofarr
        let topushIn_arrofarr = JSON.parse(JSON.stringify(auxarr));
        animations.arrOfarr.push(topushIn_arrofarr);
        animations.sequence.push("a");//stands for read next 2 values from arrofarr
        //? the following if else snippet is done to avoid the greencolor problem...the value of p1 or p2 is already increamented by the time green is pushed in instruction sequence. so we decrement it based on whether if or else was executed
        if(greendeterminer===0)
        {
            animations.green.push(p1-1);
            animations.green.push(p2);
        }
        else{
            animations.green.push(p1);
            animations.green.push(p2-1);
        }
        animations.sequence.push("g");//stands for read next 2 values from green array
    }
    // console.log(auxarr);
    while(p2<=right)
    {
        temp.push(auxarr[p2].value);
        p2++;
    }
    while(p1<=mid)
    {
        temp.push(auxarr[p1].value);
        p1++;

    }
    return;
}
async function mergeSort(auxarr,left,right)
{
   
    if(left>=right)
    {
        return ;
    }
    let mid = Math.floor(left +(right-left)/2);
    
    mergeSort(auxarr,left,mid);
    
    mergeSort(auxarr,mid+1,right);
    
    merge(auxarr,left,mid,right);
   
    
}
async function renderBars() {
    // console.log(arr2);
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
function showmodal(){
    modalcontainer.classList.remove("hide_display");
    translayer.classList.remove("hide_display");
}
function hidemodal()
{
    modalcontainer.classList.add("hide_display");
    translayer.classList.add("hide_display");
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
