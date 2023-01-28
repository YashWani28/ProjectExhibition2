var Q = require("./queue.js");
var userInput = [0 ,1 ,2 ,3 ,0 ,4 ,2 ,6 ,3 ,7 ,4 ,5, 5 ,6 ,6 ,7, 4, 8 ,5 ,9 ,6 ,10 ,7 ,11 ,8 ,9 ,9 ,10 ,10 ,11 ,8 ,12 ,9 ,13, 10 ,14, 11 ,15 ,12 ,13,13 ,14 ,14 ,15]
/*
q.push();
let ele = q.shift();
q.isEmpty();
q.front();
*/ 


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

let V= 16;
let E=22;
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
shortestPath(V,adj,1,2);


