
var nodes = document.querySelector("ul");
alert(nodes);
for(var k=0; k <nodes.children.length; k++){
    var ch = nodes.children[k];
    ch.onclick = function(event){
        event.target.style.backgroundColor = "pink";
        console.log(k);
    }
}

let nodes = documet.querySelectorAll("li");
for (var node of nodes){

}