document.getElementById("btn").onclick= function()
{
    var ph=document.getElementById("phoneInput").value;
    if(isNaN(ph)==false && ph.length==10)
        window.location.href = "Pages/burgers.html";
    else
    {
        document.getElementById("phoneInput").value=null;
        document.getElementById("phoneInput").placeholder= "Enter a valid phone number!";
    }
}