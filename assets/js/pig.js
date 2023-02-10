(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var removeMark = document.querySelector(".RemoveMarkings");
var maze = document.querySelector(".maze");
var contentbox = document.querySelector(".hellocontent");
var tobedisabled = document.querySelectorAll(".btn");
var dfsmodal = document.querySelector(".dfsmodal_container");
var dfsmodalbody = document.querySelector(".dfsmodalbody");
var dfsmodalheader = document.querySelector(".dfsmodalheader");
var translayer = document.querySelector(".searchtrans_layer");
var dfsmodalclosebtn = document.querySelector(".dfsclosebtn");
var startclickedonce =false;
var destclickedonce = false;
var userInput = [];

window.addEventListener("load",function(){
    initialize();
    hidedfsInfo();
    startclickedonce=false;
    destclickedonce=false;
    container.innerHTML="";
    contentbox.innerHTML="Select ADD START option and click one of the boxes to assign it as start node. Do the same for ADD DESTINATION. You can also click on any box to mark it as an obstacle. After this you can click on any of the search algorithms to see the animation !!!";
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
    contentbox.innerHTML="Select ADD START option and click one of the boxes to assign it as start node. Do the same for ADD DESTINATION. You can also click on any box to mark it as an obstacle. After this you can click on any of the search algorithms to see the animation !!!";


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
    // boxes.forEach(element => {
    //     element.addEventListener("click",event=>{
    //         let currbar = event.currentTarget;
            
    //         currbar.classList.toggle("black");
    //     })
    // });
    boxes.forEach(element => {
        element.addEventListener("click",toggleblack);
    });
}
function toggleblack(event)
{
    let currbar = event.currentTarget;
    currbar.classList.toggle("black");
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
    if(startclickedonce===false || destclickedonce===false)
    {
        alert("Please assign start and destination nodes first");
        return;
    }
    contentbox.innerHTML=`Breadth-first search is an unweighted search technique and guarantees shortest path<br><br>Time Complexity:O(V+E) || Auxillary Space:O(V)<br> <button id="bfsinfobtn" style="color:lightblue;text-decoration:underline italics;background-color: transparent">CLICK FOR MORE INFO</button>`;
    disable();
    //?to disable stop the boxes from being clicked during execution, we will remove their event listners. Highlight path function will add it back
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.removeEventListener("click",toggleblack);
    });
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
    if(startclickedonce===false || destclickedonce===false)
    {
        alert("Please assign start and destination nodes first");
        return;
    }
    contentbox.innerHTML=`Depth-first search is an unweighted search technique but DOES NOT guarantee shortest path<br><br>Time Complexity:O(V+E) || Auxillary Space:O(V)<br> <button id="dfsinfobtn" style="color:lightblue;text-decoration:underline italics;background-color: transparent">CLICK FOR MORE INFO</button>`;
    disable();
    //?to disable stop the boxes from being clicked during execution, we will remove their event listners. Highlight path function will add it back
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.removeEventListener("click",toggleblack);
    });
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
removeMark.addEventListener("click",function(){
    contentbox.innerHTML="Select ADD START option and click one of the boxes to assign it as start node. Do the same for ADD DESTINATION. You can also click on any box to mark it as an obstacle. After this you can click on any of the search algorithms to see the animation !!!";


    gridlen=45;
    gridwid=22;
    let blackarr=[];
    for(let i=0;i<gridlen*gridwid;i++)
    {
        let temp = document.getElementById(i);
        if(temp.classList.contains("black"))
        {
            blackarr.push(i);
        }  
    }
    initialize();
    blackarr.forEach(element => {
        let temp = document.getElementById(element);
        temp.classList.add("black");
    });
    
})
random.addEventListener("click",function(){
    let grid = generateMaze(22,45);
    console.log(grid);
})
maze.addEventListener("click",async function()
{
    initialize();
    let gridlen = 45;
    let gridwid = 22;
    let n = gridlen*gridwid;
    for(let i=0;i<gridlen;i++)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=gridlen-1;i<n;i+=gridlen)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=n-1;i>n-gridlen;i--)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=n-gridlen;i>0;i-=gridlen)
    {
        let temp = document.getElementById(i);
        temp.classList.add("black");
        await sleep(7);

    }
    for(let i=0;i<gridlen;i+=2)
    {

        for(let j =i;j<n;j+=gridlen)
        {
            let temp  = document.getElementById(j);
            let todo = Math.random();
            if(todo>0.3)
            {
                temp.classList.add("black");

            }
            await sleep(1);

        }
        
    }
    // for(let i=2;i<gridlen-1;i+=2)
    // {
    //     for(let k=0;k<5;k++)
    //     {
          
    //         let id = (Math.floor(Math.random()*100)%gridwid)*gridlen + i;
    //         if(id==0 || id==gridwid-1)
    //         {
    //             k--;
    //         }
    //         else{

    //             let temp = document.getElementById(id);
    //             temp.classList.remove("black");
    //             await sleep(20);
    //         }
    //     }
    // }
})
contentbox.addEventListener("click",function(event){
    if(event.target.tagName=="BUTTON")
    
    {
        if(event.target.id==="dfsinfobtn")
        {
            showdfsInfo();
        }
        if(event.target.id==="bfsinfobtn")
        {
            showbfsInfo();
        }
    }
})
dfsmodalclosebtn.addEventListener("click",hidedfsInfo);

translayer.addEventListener("click",hidedfsInfo);


 

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
    enable();
    //?adding the event listners back to grid items to allow them to turn black upon clicking after the current execution is finished.
    var boxes=document.querySelectorAll('.grid-item');
    boxes.forEach(element => {
        element.addEventListener("click",toggleblack);
    });
}
async function animatetraveral(traversal,path)
{
    for(let i=1;i<traversal.length;i++)
    {
        let interval = setspeed();
        let temp = document.getElementById(traversal[i]);
        if(!temp.classList.contains("black"))
        {

            temp.classList.add("maroon");
        }
        await sleep(interval);
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
        enable();
        //?adding the event listners back to grid items to allow them to turn black upon clicking after the current execution is finished.
        var boxes=document.querySelectorAll('.grid-item');
        boxes.forEach(element => {
            element.addEventListener("click",toggleblack);
        });
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
function setspeed()
{
    var speedtoggle = document.getElementById("gridspeedtoggle");

    if(speedtoggle.value==="FAST")
    {
 
        return 7;
    }
    else if(speedtoggle.value==="MEDIUM")
    {


        return 20;

    }
    else if(speedtoggle.value==="SLOW")
    {
        return 150;
    }
    else if(speedtoggle.value==="VSLOW")
    {
        return 400;
    }

}
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
function showdfsInfo()
{
    dfsmodalbody.innerHTML="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis corrupti illo repellendus odit vero sunt aliquam eveniet expedita ut! Porro illum ducimus inventore, quo eos est numquam reiciendis cupiditate sit quos dolores impedit ad minima obcaecati iste veniam suscipit accusantium nesciunt asperiores. Labore enim blanditiis corrupti incidunt dolor sequi obcaecati praesentium ut, ab voluptas amet repellendus laudantium quidem facilis, pariatur vitae! Saepe earum dicta debitis ad, quos fuga esse accusamus maxime unde nihil dignissimos tempore quidem fugit illum harum aperiam quibusdam deserunt mollitia adipisci id eveniet quam voluptas alias modi. Expedita quibusdam nobis et, consectetur quod accusantium molestias fuga est. Expedita quos quibusdam aliquid perspiciatis libero placeat quaerat minus quidem, maiores amet qui. Nostrum amet vel aperiam doloribus earum, inventore recusandae quidem porro similique quisquam, nemo eius voluptatum, deleniti libero facilis praesentium non quas saepe eveniet nihil ex aut voluptas officiis. Hic, atque laborum! Quasi in laudantium eos! Nobis eveniet in quos id! Laborum id praesentium nisi unde facilis ducimus et adipisci eos veritatis ipsa perspiciatis ipsum modi earum dolorum similique voluptatibus totam laudantium sunt pariatur, exercitationem, enim debitis deleniti numquam alias. Maxime eum dolorem illo ab voluptate repellat id magnam quos sed ex hic odit, temporibus ad rem corrupti incidunt officia. Fugiat placeat voluptatum ea, praesentium iusto quidem! Cupiditate odio, obcaecati perspiciatis corporis quas quidem alias voluptatibus nisi, accusamus accusantium sequi reprehenderit, non autem quisquam quo aliquid veritatis id omnis assumenda officiis! Consequuntur numquam ut natus et iure. Tempore explicabo deleniti quam in iusto sunt atque ipsam, est illum natus dolorum, architecto ipsa dolores qui excepturi. Magni, maxime consequatur autem, earum labore quod libero ex alias sed fuga harum. Ipsam natus voluptatem pariatur qui libero ipsa sit vel amet, soluta repudiandae sapiente minima molestias aliquam nostrum laboriosam impedit veritatis nobis fuga quod? Accusamus deleniti nulla libero quam placeat quod vero deserunt delectus tenetur, enim ad vel illum quaerat perspiciatis aliquid. Voluptatem, beatae nostrum. Sed quos architecto dignissimos unde consequatur, earum adipisci magni, voluptatum modi, assumenda repellat nisi quibusdam nobis asperiores quae! Totam laborum placeat quo quas, iusto libero, illo exercitationem nulla, quaerat voluptatibus minus tempora maxime perspiciatis consequatur quia deleniti atque nam necessitatibus incidunt non dolores soluta voluptas. Eligendi provident eos deleniti! Quod sint dolores, rerum esse eligendi quis consectetur facilis provident alias id mollitia molestiae consequatur ea totam minima temporibus dignissimos odit beatae aliquam ipsum reprehenderit amet architecto necessitatibus facere? Est quasi cumque adipisci ab, facilis debitis ea incidunt vitae officia consectetur dignissimos non nemo fugit minus! Commodi, ducimus nesciunt! Quia possimus quidem fugit voluptate aspernatur voluptates distinctio explicabo rerum eius excepturi, sed dolores ducimus! Reprehenderit, illum non veniam aspernatur minima accusamus molestias enim perferendis. Recusandae dignissimos voluptates fugiat! Corporis, ratione a non similique iusto expedita repellat omnis id. Excepturi ullam perspiciatis at tempore libero iusto incidunt earum temporibus necessitatibus fugit ipsa vel quo repudiandae molestiae nostrum facilis, sed nulla aliquid autem dolore deserunt quasi. Eos commodi obcaecati voluptas tempore provident nam blanditiis necessitatibus dolores consequuntur. Consequatur facilis illum assumenda, nemo nulla architecto esse nesciunt. Quod, ex eligendi.";
    dfsmodalheader.innerHTML="Depth First Search";
    dfsmodal.classList.remove("hide_display");
    translayer.classList.remove("hide_display");
    document.body.style.overflow="hidden";
    // let dfsmodalbody = document.querySelector(".dfsmodalbody");
    
}
function hidedfsInfo()
{
    dfsmodal.classList.add("hide_display");
    translayer.classList.add("hide_display");
    document.body.style.overflow="auto";

}
function showbfsInfo()
{
    dfsmodalbody.innerHTML="bfs content";
    dfsmodalheader.innerHTML="Breadth First Search";
    dfsmodal.classList.remove("hide_display");
    translayer.classList.remove("hide_display");
    document.body.style.overflow="hidden";
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

  




    

},{"./queue.js":2}],2:[function(require,module,exports){
function createQueue(intialCapacity) {
	var that = {};
	var head = 0;
	var tail = 0;
	var length = 0;
	var initialCapacity = initialCapacity;
	var currentSize = (typeof initialCapacity === undefined) ? initialCapacity : 200;
	var container = [];
	container.length=currentSize;

	function doubling() {
		var currentSource = head;
		var currentTarget = 0;
		var newContainer = [];
		newContainer.length = 2*currentSize;

		while (currentTarget < currentSize) {
			newContainer[currentTarget] = container[currentSource];
			currentSource++;
			currentTarget++;
			if (currentSource == currentSize) {
				currentSource = 0;
			}
		}
		container = newContainer;
		head = 0;
		tail = currentSize;
		currentSize *= 2;
	}

	function shrink() {
		var currentSource = head;
		var currentTarget = 0;
		var newContainer = [];
		newContainer.length = currentSize/4;

		while (currentTarget < currentSize) {
			newContainer[currentTarget] = container[currentSource];
			currentSource++;
			currentTarget++;
			if (currentSource == currentSize) {
				currentSource = 0;
			}
		}
		container = newContainer;
		head = 0;
		tail = currentSize;
		currentSize /= 4;
	}

	that.push = function(element) {
		if (length == currentSize) {
			doubling();
		}
		container[tail] = element;
		length++;
		tail++;
		if (tail == currentSize) {
			tail = 0;
		}
	};

	that.shift = function() {
		if (length === 0) {
			return null;
		}
		tmp = container[head];
		head++;
		length--;
		if (head == currentSize) {
			head = 0;
		}
		if (length == currentSize/4 && length > initialCapacity) {
			shrink();
		}
		return tmp;
	};


	that.front = function() {
		if (length === 0) {
			return null;
		}
		return container[head];
	};

	that.length = function() {
		return length;
	};

	that.isEmpty = function() {
		return length === 0;
	};

	return that;
}

module.exports = {
	createQueue : createQueue
};
},{}]},{},[1]);
