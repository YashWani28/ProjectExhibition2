// var arr = [5,10,6,1,9];
// var barcontainer = document.querySelector(".barcontainer");
// /*
// async function functionn_name(){
//     await sleep(time_in_millisecs);
// }
//  */
// function renderBars() {
//     for(let i=0;i<arr.length;i++) {
//       renderSinglebar(arr[i]);
//         // let barheight = setHeight(arr[i]);
//         // console.log(barheight);
//         // let bar = document.createElement("div");
//         // bar.classList.add("bars");
//         // bar.style.height = `${barheight}px`;
//         // barcontainer.appendChild(bar);
//     }
// }
// function renderSinglebar(barnumber)
// {
//     let barheight = setHeight(barnumber);
//     // console.log(barheight);
//     let bar = document.createElement("div");
//     bar.classList.add("bars");
//     bar.style.height = `${barheight}px`;
//     barcontainer.appendChild(bar);
// }
// const sleep = (time) => {
//     return new Promise((resolve) => setTimeout(resolve, time))
//   }

// //? -------------------------------------------
//   renderBars();
//   findBarpositions();
//   bubbleSort();
// //? -------------------------------------------

// function findBarpositions()
// {
//     var barslist = document.querySelectorAll(".bars");
//     var positionlist = [];
//     barslist.forEach(element => {
//         let givenbar = element.getBoundingClientRect();
        
//         positionlist.push(givenbar.x);
//     });
//     positionlist.forEach(element => {
//         console.log(element);
    
//     });
// }
// function setHeight(bar)
// {
//     return bar*50;
// }
// function bubbleSort()
// {
//     var currsize = arr.length;
//     for(let i=0;i<arr.length;i++)
//     {
       
//         currsize--;
//         for(let j=0;j<currsize;j++)
//         {
//             if(arr[j]>arr[j+1])
//             {
                
                
//                 [arr[j],arr[j+1]] = [arr[j+1],arr[j]];

//             }
//         }
//     }

// }
// function printarr()
// {
//     arr.forEach(element => {
//         console.log(element);
//     });
// }
