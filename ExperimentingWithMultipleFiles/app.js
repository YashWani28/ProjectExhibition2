// import * as helper from "./app2.js";
// helper.func();
// // function include(file) {

// //     var script = document.createElement('script');
// //     script.src = file;
// //     script.type = 'text/javascript';
// //     script.defer = true;
    
// //     document.getElementsByTagName('head').item(0).appendChild(script);
    
// //     }
    
// //     /* Include Many js files */
// //     include('app2.js');
// alert("hi");
class barobj{
    constructor(value,color){
        this.value = value;
        this.color = color;
    }
}
var list = [];
list.push(new barobj(12,"blue"));
list.push(new barobj(13,"orange"));

console.log(list[0].color);
console.log(list[1].color);
