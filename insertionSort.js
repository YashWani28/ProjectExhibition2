let arr = [32,1];
function swap(arr,a,b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
function insertionSort(arr)
{
    for(let i=0;i<arr.length;i++)
    {
        let j=i;
        while(i>0 && arr[j-1]>arr[j])
        {
            swap(arr,j-1,j);
            j--;

        }
    }
}
console.log(arr);
insertionSort(arr);
console.log(arr);
