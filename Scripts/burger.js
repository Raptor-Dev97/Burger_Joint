var priceList= {
    Veg:100,
    Egg:150,
    Chicken:200 
}

class Item {
    constructor(type,category,quantity) {
      this.type = type;
      this.category = category;
      this.quantity= quantity;

      this.price = priceList[category];
      this.total=quantity*this.price;
    }
  }
var itemArray= new Array();

function add(event){
    var elem= event.target;
    elem= elem.parentNode;

    var newItem= new Item(elem.children[0].innerText,elem.children[1].value,parseInt(elem.children[2].value));
    console.log(newItem);

    itemNumber= elem.children[2].value;
    if(itemNumber>=1 && itemNumber<=5)
        itemArray.push(newItem);
    else
    {
        elem.children[2].value="";
        elem.children[2].placeholder="Item value should be 1-5";
    }

    console.log(itemArray);
}


var addButtons = document.getElementsByClassName("add");
for(var i=0; i<addButtons.length; i++){
    addButtons[i].addEventListener("click",function(event){add(event);})
}


document.getElementById('cartBtn').onclick= function() {
    localStorage.setItem("itemArray",JSON.stringify(itemArray));
    window.location.href = "cart.html";
}





 