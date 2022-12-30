// var arr = [26,78,51,96,19,33,58,10,35,88];
var arr = [1,2,1,2,1,2];

console.log(arr);
quickSort(0,arr.length);
console.log(arr);



function partition(low,high)
{
    let pivot = arr[low];
    let i = low;
    let j = high-1;
    while(i<j)
    {
        while(arr[i]<=pivot)
        {
            i++;
        }
        while(arr[j]>pivot)
        {
            j--;
        }
        if(i<j)
        {
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }

    }
    let temp = arr[low];
    arr[low] = arr[j];
    arr[j] = temp;
    return j;
}
function quickSort(low,high)
{
    if(low<high)
    {
        let mid = partition(low,high);
        quickSort(low,mid);
        quickSort(mid+1,high);
        
    }
}