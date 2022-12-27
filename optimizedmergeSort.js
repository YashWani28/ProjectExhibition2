let arr2=[42,9,32,85,41,44,27,20,55];
console.log(arr2);
mergeSort(arr2,0,arr2.length-1);
console.log(arr2); 

async function merge(arr2,left,mid,right){
    let temparr = [];
    temparr = temparr.concat(arr2);
    let p1= left;
    let p2=mid+1;
    let temp= [];
    // let indx =0 ;
    let indx = p1;
    while(p1<=mid && p2<=right)
    {
        if(temparr[p1]<=temparr[p2])
        {
            
            indx++;
            p1++;
        }
        else{
            let temp = arr2[p2];
            for(let i=p2;i>indx;i--)
            {
                arr2[i]=arr2[i-1];
            }
            arr2[indx]=temp;
            p2++;
            indx++;
        }
        
    }
    // while(p2<=right)
    // {
    //     temp.push(arr2[p2]);
    //     p2++;
    // }
    // while(p1<=mid)
    // {
    //     temp.push(arr2[p1]);
    //     p1++;

    // }
   
    
    return;
}
async function mergeSort(arr,left,right)
{
   
    if(left>=right)
    {
        return ;
    }
    let mid = Math.floor(left +(right-left)/2);
    
    mergeSort(arr,left,mid);
    
    mergeSort(arr,mid+1,right);
    
    merge(arr,left,mid,right);

    
}

