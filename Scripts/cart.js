window.onload = showCart();

var items = new Array();
var totalQuantity, totalPrice, cartSize;

function showCart() {
    items = localStorage.getItem("itemArray");
    items = JSON.parse(items);
    console.log(localStorage.getItem("ias"));
    console.log(items);
    calculateTotal();
    displayCart();
}

function calculateTotal() {
    var Q = 0, P = 0
    for (i = 0; i < items.length; i++) {
        Q += parseInt(items[i].quantity);
        P += parseInt(items[i].total);
    }
    totalQuantity = Q;
    totalPrice = P;
    cartSize=items.length;
}

function displayCart() {
    if (items.length > 0) {
        document.getElementsByClassName('noItem')[0].style.display = 'none';
        document.getElementById('columns').style.display = 'inherit';

        var btn = document.getElementById('placeOrderBtn');

        for (i = 0; i < items.length; i++) {
            var div = document.createElement('div');
            div.className += 'item';
            div.innerHTML = "<span>" + items[i].type + "</span>\
            <span>"+ items[i].category + "</span>\
            <span>"+ items[i].price + "</span>\
            <span>"+ items[i].quantity + "</span>\
            <span>"+ items[i].total + "</span>\
            <span class=\"material-icons\">clear</span>";

            document.getElementsByClassName('cart')[0].appendChild(div);
        }

        var div = document.createElement('div');
        div.id='totals'
        div.className += 'item';
        div.innerHTML = "<span>The total quantity is "+ totalQuantity + " and the total Price is "+ totalPrice+ "</span>";
        document.getElementsByClassName('cart')[0].appendChild(div);

        document.getElementsByClassName('cart')[0].appendChild(btn);
    }
    else {
        document.getElementById('placeOrderBtn').style.display = 'none';
    }

}

var removeItems = document.getElementsByClassName("material-icons");
for(var i=0; i<removeItems.length; i++){
    removeItems[i].addEventListener("click",function(event){remove(event);})
}

function remove(event){
    var elem= event.target;

    let removeQuantity= elem.parentNode.children[3].innerHTML;
    let removePrice= elem.parentNode.children[4].innerHTML;
    totalQuantity-= removeQuantity;
    totalPrice-= removePrice;
    
    document.getElementById('totals').innerHTML = "<span>The total quantity is "+ totalQuantity + " and the total Price is ₹"+ totalPrice+ "</span>";

    elem.parentNode.parentNode.removeChild(elem.parentNode);
    cartSize--;
    if(cartSize==0)
    {
        document.getElementsByClassName('noItem')[0].style.display = 'inherit';
        document.getElementById('columns').style.display = 'none';
        document.getElementById('placeOrderBtn').style.display = 'none';
        document.getElementById('totals').style.display='none';
    }
}

document.getElementById('placeOrderBtn').onclick= function(){
    var xmlHttp= new XMLHttpRequest();
    xmlHttp.open("POST","http://localhost:9876/orders",true);
    xmlHttp.setRequestHeader("Content-Type","application/json");

    xmlHttp.send(JSON.stringify({totalQuantity: totalQuantity, totalPrice: totalPrice}));

    xmlHttp.onreadystatechange= function()
    {
        if(xmlHttp.readyState==4 && xmlHttp.status==200){
            responseDiscount= JSON.parse(xmlHttp.responseText).discount;
            responsePrice= JSON.parse(xmlHttp.responseText).price;

            alert("You get a "+responseDiscount+"% Discount on your purchase and now you pay ₹"+responsePrice+" !!");
        }
    }
}

