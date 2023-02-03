const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
class Stack {
 
    // Array is used to implement stack
    constructor()
    {
        this.items = [];
    }
 
    // Functions to be implemented
    push(element)
    {
        this.items.push(element);
    }
    pop()
    {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek()
    {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    }
    isEmpty()
    {
        // return true if stack is empty
        return this.items.length == 0;
    }
    printStack()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}
var Q = require("./queue.js");
var click = document.querySelector(".generateGridbtn");
var container = document.querySelector(".grid-container");
var clear = document.querySelector(".clear");
var start = document.querySelector(".start");
var destination = document.querySelector(".destination");
var BFS = document.querySelector(".BFS");
var random = document.querySelector('.random');
var DFS = document.querySelector(".DFS");
var startclickedonce =false;
var destclickedonce = false;
var userInput = [];

window.addEventListener("load",function(){
    initialize();
    startclickedonce=false;
    destclickedonce=false;
    container.innerHTML="";
    for(let i=0;i<990;i++)//should be multiple of 45
    {

        const box = document.createElement('div');
        box.setAttribute('x',`${i%45}`);//horizontal is X
        box.setAttribute('y',`${Math.floor(i/45)}`);//vertical is y..both are (0,0) ay upper left corner
        box.classList.add('grid-item'); 
        container.appendChild(box);
    }
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.addEventListener("click",event=>{
            let currbar = event.currentTarget;
            // if(currbar.classList.contains("startnode"))
            // {
            //     alert("marked as start already!!");
            //     return;
            // }
            currbar.classList.toggle("black");
        })
    });
    initialize();

})
function initialize()
{
    userInput = [];
    startclickedonce=false;
    destclickedonce=false;
    container.innerHTML="";
    let gridlen = 45;
    let gridwid = 22;
    // createlist(gridlen,gridwid);
    for(let i=0;i<gridlen*gridwid;i++)//should be multiple of 45
    {

        let box = document.createElement('div');
        box.id = `${i}`;
        // box.innerHTML=`${i}`;
        // box.setAttribute('id',`${i%45}`);
        box.setAttribute('x',`${i%45}`);//horizontal is X
        box.setAttribute('y',`${Math.floor(i/45)}`);//vertical is y..both are (0,0) ay upper left corner
        
        box.classList.add('grid-item'); 
        container.appendChild(box);
    }
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.addEventListener("click",event=>{
            let currbar = event.currentTarget;
            // if(currbar.classList.contains("startnode"))
            // {
            //     alert("marked as start already!!");
            //     return;
            // }
            currbar.classList.toggle("black");
        })
    });
}
click.addEventListener("click",initialize);
/*clear.addEventListener("click",function(){
    var boxes=document.querySelectorAll('.grid-item');
    startclickedonce=false;
    destclickedonce=false;
    boxes.forEach(element=>{
        element.classList.remove("black");
        element.classList.remove("startnode");
        element.classList.remove("destnode");
        
        element.innerHTML="";
    })
})*/
destination.addEventListener("click",function(){
    if(destclickedonce)
    {
        alert("You have already assigned a destination node!!!");
        return;
    }
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(function(element){
        element.addEventListener("click",function(events){
            
            if(destclickedonce)
            {
                return;
            }
            events.currentTarget.classList.remove("black");
            events.currentTarget.innerHTML="D";
            events.currentTarget.classList.add("destnode");
            destclickedonce = true;
        })
    })
})
start.addEventListener("click",function(){
    if(startclickedonce)
    {
        alert("You have already assigned a start node!!!");
        return;
    }
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(function(element){
        element.addEventListener("click",function(evente){
            
            if(startclickedonce)
            {
                return;
            }
            evente.currentTarget.classList.remove("black");
            evente.currentTarget.innerHTML="S";
            evente.currentTarget.classList.add("startnode");
            startclickedonce = true;
        })
    })
})
BFS.addEventListener("click",function(){
    let start = document.querySelector(".startnode");
    let dest = document.querySelector(".destnode");
    start = parseInt(start.id);
    dest = parseInt(dest.id)
    let gridlen = 45;
    let gridwid = 22;
    for(let i=0;i<gridlen*gridwid;i++)
    {
        let box = document.getElementById(i);
        box.classList.remove("yellow");
        box.classList.remove("maroon2");

    }
    createlist(gridlen,gridwid);
    let adj = adjlist();
    let V = 990;
    let answer = shortestPath(V,adj,start,dest);
    
  
    // highlightPath(answer[0]);
    animatetraveral(answer[1],answer[0]);
})
DFS.addEventListener("click",function(){
    let start = document.querySelector(".startnode");
    let dest = document.querySelector(".destnode");
    start = parseInt(start.id);
    dest = parseInt(dest.id)
    let gridlen = 45;
    let gridwid = 22;
    for(let i=0;i<gridlen*gridwid;i++)
    {
        let box = document.getElementById(i);
        box.classList.remove("yellow");
        box.classList.remove("maroon2");

    }
    createlist(gridlen,gridwid);
    let adj = adjlist();
    let V = 990;
    let answer = dfs(V,adj,start,dest);
    
  
    // highlightPath(answer[0]);
    animatetraveral(answer[1],answer[0]);
})
random.addEventListener("click",function(){
    let grid = generateMaze(22,45);
    console.log(grid);
})
async function highlightPath(path)
{
    for(let i=1;i<path.length-1;i++)
    {
        let tempid = path[i];
        let tempbox = document.getElementById(tempid);
        tempbox.classList.remove('maroon2');
        tempbox.classList.add('yellow');
        await sleep(40);

    }
}
async function animatetraveral(traversal,path)
{
    for(let i=1;i<traversal.length;i++)
    {
        let temp = document.getElementById(traversal[i]);
        if(!temp.classList.contains("black"))
        {

            temp.classList.add("maroon");
        }
        await sleep(20);
        temp.classList.remove("maroon");
        temp.classList.add("maroon2");
        await sleep(0.1);     
    }
    if(!(path==-1))
    {

        highlightPath(path);
    }
    else{
        alert("no path exists!!");

    }

}
function createlist(len,wid)
{
    console.log("hi");
    let n = len*wid;
    //* adding horizontal connections
    // for(let i=0;i<n-1;i++)
    // {
    //     let temp = document.getElementById(i);
    //     if(temp.classList.contains("black"))
    //     {
    //         console.log(temp);
    //         userInput.pop();
    //         userInput.pop()
    //         continue;
    //     }
    //     else if(!(i===(Math.floor(i/len)+1)*len-1))
    //     {
    //         userInput.push(i);
    //         userInput.push(i+1); 
            
    //     }
        
    // }
    for(let i=0;i<wid;i++)
    {
        let temp1=i*len;
        let temp2=temp1+1;
        while(temp2<(i+1)*len)
        {
            let tempa = document.getElementById(temp1);
            let tempb = document.getElementById(temp2);
            if(tempa.classList.contains("black") || tempb.classList.contains("black"))
            {
                temp1++;
                temp2++;

            }
            else{
                userInput.push(temp1);
                userInput.push(temp2);
                
                // temp1= temp2;
                // temp2=temp2+len;
                temp1++;
                temp2++;
            }
        }
    }
    //* adding vertical connections
    for(let i=0;i<len;i++)//((i+1)*len)-1
    {
        let temp1 = i;
        let temp2 = i+len;
        while(temp2<n){
            let tempa = document.getElementById(temp1);
            let tempb = document.getElementById(temp2);

            if(tempa.classList.contains("black") || tempb.classList.contains("black"))
            {
                temp1+=len;
                temp2+=len;

            }
            else{
                userInput.push(temp1);
                userInput.push(temp2);
                
                // temp1= temp2;
                // temp2=temp2+len;
                temp1+=len;
                temp2+=len;
            }
        }
    }
    // console.log(userInput);
}

//* shortest path starts here


function shortestPath(V,adj,src,dest)
{
    let where = new Array(V);
    let cost = new Array(V);
    var q = Q.createQueue(5);
    let traversal  = [];
    let visited = new Array(V).fill(0);
    visited[src]=1;
    cost[src]=0;
    where[src]=-1;
    q.push(src);
    let found=0;
    while(!q.isEmpty())
    {
        if(found)
        {
            break;
        }
        let Y = q.shift() // in this queue implementation, the popped element is returned as well
        // if(!found)
        // {

        traversal.push(Y);
        // }

        adj[Y].forEach(it => {
            if(!visited[it])
            {
                visited[it]=1;
                q.push(it);
                where[it] = Y;
                cost[it] = cost[Y] + 1;
            }
            if(it==dest)
            {
                found=1;
                
            }
        });
    }
    if(!found)
    {
        return [-1,traversal];
        
    }
    let next = dest;
    var path = [];
    while(where[next]!=-1)
    {
        path.push(next);
        next=where[next];

    }
    path.push(src);
    path.reverse();
    console.log(path);
    return [path,traversal];

}
//*MAIN 
function adjlist()
{

    let V= 990;
    let E=1913;//edges = (len-1)*wid + (wid-1)*len
    let adj = new Array;
    for(let i=0;i<V;i++)
    {
        let temp = new Array;
        temp.push(i);
        adj.push(temp);
    }
    for(let i=0;i<userInput.length;i+=2)
    {
        let u = userInput[i];
        let v = userInput[i+1];
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
    // console.log(adj);
    // shortestPath(V,adj,start,dest);

}
function generateMaze(rows, cols) {
    initialize();
    let n = rows*cols;
    for(let i=0;i<n;i++)
    {
        let box=document.getElementById(i);
        if(Math.random()>0.7)
        {
            box.classList.add("black");
        }
    }
  }
function dfs(V,adj,src,dest)
{
    console.log(adj);
    let where = new Array(V);
    let cost = new Array(V);
    var stk = new Stack();
    let traversal  = [];
    let visited = new Array(V).fill(0);
    visited[src]=1;
    cost[src]=0;
    where[src]=-1;
    stk.push(src);
    let found=0;
    while(!stk.isEmpty())
    {
        if(found)
        {
            break;
        }
        let Y = stk.pop() // in this queue implementation, the popped element is returned as well
        // traversal.push(Y);
       console.log(adj[Y].length);
        // adj[Y].forEach(it => {
        //     if(!visited[it] )
        //     {   
                
                
        //         visited[it]=1;
        //         stk.push(it);
        //         traversal.push(it);
        //         where[it] = Y;
        //         cost[it] = cost[Y] + 1;
        //     }
            
        //     if(it==dest)
        //     {
        //         found=1;
               
        //     }
        // });
        if(visited[Y] == 0)
        {
            traversal.push(Y);
            visited[Y] = 1;
        }
        for(let i=0;i<adj[Y].length;i++)
        {
            if(!visited[adj[Y][i]])
            {
                // visited[adj[Y][i]]=1;
                stk.push(adj[Y][i]);
                // traversal.push(adj[Y][i]);
                where[adj[Y][i]]=Y;
                cost[adj[Y][i]]=cost[Y]+1;
               
            }
            if(adj[Y][i]==dest)
            {
                found=1;
            
            }
        }
    }
    let next = dest;
    var path = [];
    while(where[next]!=-1)
    {
        path.push(next);
        next=where[next];

    }
    path.push(src);
    path.reverse();
    console.log(path);
    console.log(traversal);
    return [path,traversal];
}
  




    
