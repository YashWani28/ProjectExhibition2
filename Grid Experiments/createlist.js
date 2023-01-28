let len = 5,wid=3;
createlist(len,wid);
function createlist(len,wid)
{
    userinput = [];
    let n = len*wid;
    for(let i=0;i<n-1;i++)
    {
        if(!(i===(Math.floor(i/len)+1)*5-1))
        {
            userinput.push(i);
            userinput.push(i+1); 
            
        }
        
    }
    for(let i=0;i<len;i++)//((i+1)*len)-1
    {
        let temp1 = i;
        let temp2 = i+len;
        while(temp2<n){
            userinput.push(temp1);
            userinput.push(temp2);
            
            temp1= temp2;
            temp2=temp2+len;
        }
    }
    console.log(userinput);
}