(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Q = require("./queue.js");
var click = document.querySelector(".generateGridbtn");
var container = document.querySelector(".grid-container");
var clear = document.querySelector(".clear");
var start = document.querySelector(".start");
var destination = document.querySelector(".destination");
var find = document.querySelector(".shortest");
var startclickedonce =false;
var destclickedonce = false;
var userInput = [];

window.addEventListener("load",function(){
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
})
click.addEventListener("click",function(){
    startclickedonce=false;
    destclickedonce=false;
    container.innerHTML="";
    let gridlen = 45;
    let gridwid = 22;
    createlist(gridlen,gridwid);
    for(let i=0;i<gridlen*gridwid;i++)//should be multiple of 45
    {

        let box = document.createElement('div');
        box.id = `${i}`;
        box.innerHTML=`${i}`;
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

})
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
find.addEventListener("click",function(){
    adjlist();
})

function createlist(len,wid)
{
    console.log("hi");
    let n = len*wid;
    for(let i=0;i<n-1;i++)
    {
        if(!(i===(Math.floor(i/len)+1)*len-1))
        {
            userInput.push(i);
            userInput.push(i+1); 
            
        }
        
    }
    for(let i=0;i<len;i++)//((i+1)*len)-1
    {
        let temp1 = i;
        let temp2 = i+len;
        while(temp2<n){
            userInput.push(temp1);
            userInput.push(temp2);
            
            temp1= temp2;
            temp2=temp2+len;
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
    let traversal  = new Array(V);
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
        traversal.push(Y);

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
    // console.log(adj);
    shortestPath(V,adj,6,200);

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
