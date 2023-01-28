#include<iostream>
#include<bits/stdc++.h>
using namespace std;
class Graph{
    public:
    void shortestPath(int V,vector<int> adj[],int dest)
    {
        // to print the list
        // for(int i=0;i<V;i++)
        // {
        //     for(auto it:adj[i])
        //     {
        //         cout<<it<<" ";
        //     }
        //     cout<<endl;
        // }
        vector<int> where(V);
        vector<int> cost(V);
        queue<int> q;
        vector<int> traversal;
        vector<int> visited(V,0);
        visited[0]=1;
        cost[0]=0;
        where[0]='#';
        q.push(0);
        int found=0;
        while(!q.empty())
        {
            if(found)break;
            int Y = q.front();
            q.pop();
            traversal.push_back(Y);
            for(auto it:adj[Y])
            {
                if(!visited[it])
                {
                    visited[it] =1;
                    q.push(it);
                    where[it] = Y;
                    cost[it] = cost[Y]+ 1;
                }
                if(it==dest)
                {
                    found=1;
                    break;
                }
            }
        }
        // for(auto i:where)
        // {
        //     cout<<i<<" ";
        // }
        // cout<<endl;
        // for(auto i:cost)
        // {
        //     cout<<i<<" ";
        // }
        // cout<<endl;
        // for(auto i:traversal)
        // {
        //     cout<<i<<" ";
        // }
        // cout<<endl;
        vector<int> path;
        int next=dest;
        while(where[next]!=35)
        {
            path.push_back(next);
            next = where[next];
        }
        path.push_back(0);
        reverse(path.begin(),path.end());
        for(auto i:path)
        {
            cout<<"->"<<i;
        }
        cout<<endl;

    }
        
};
int main()
{
    int V=16,E=22;
    vector<int> adj[V];
    for(int i=0;i<V;i++)
    {
        adj[i].push_back(i);
    }
    for(int i=0;i<E;i++)
    {
        int u,v;
        cin>>u>>v;
        adj[u].push_back(v);  
        adj[v].push_back(u);  

    }
    Graph g;

    g.shortestPath(V,adj,11);//passing destination only
    return 0;
}