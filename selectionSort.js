function swapelements(arr,a,b)
{
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b]= temp;
}
function selectionSort(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        let min = i;
        for(let j=i;j<arr.length;j++)
        {
            if(arr[j]<arr[min])
            {
                min = j;
            }
        }
        swapelements(arr,min,i);
        
    }
}
let arr = [5,4,3,2,1];
console.log(arr);
selectionSort(arr);
console.log(arr);


