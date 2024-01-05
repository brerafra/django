let globalCost = 0;
let globalCountProducts = 0;

$(document).ready(function(){
    getProducts();
    $("#btn-gen-event").hide();

    var monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    var dayNames = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]

    setInterval(function() {
        //make single object and set the current time
        var newDate = new Date();
        var min = new Date().getMinutes();
        var minutes = ((minutes<10 ? "0":"")+min);
        var hou = new Date().getHours();
        var hours = ((hou<10?"0":"")+hou)
        $("#date").html(dayNames[newDate.getDay()]+" "+newDate.getDate()+" "+monthNames[newDate.getMonth()]+" "+newDate.getFullYear()+ " "+hours+":"+minutes);
        },1000);
})

function setClock(){
    var dt = new Date();
    var time = dt.getDay()+"/"+dt.getMonth()+"/"+dt.getFullYear()+"  "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
    $("#watch").text(time)
}


function getProducts(){
    $("#products div").remove();
    eel.get_products()
}

eel.expose(borrar_products)
function borrar_products(){
    $("#products").empty();
}

eel.expose(return_products)
function return_products(products){
    $("#products").empty();
    products.forEach(displayProduts);
}

function displayProduts(product) {
    var product_card = '<div class="card" id="card-product" onclick="addProductToCart('+product[0]+','+product[3]+','+"'"+product[1]+"'"+');"><img src="../image/'+product[4]+'" alt="Desayuno" class="card-product-img"><h6>'+product[1]+'</h6><p>Costo: $'+product[3]+'</p></div>'
    $("#products").append(product_card)
}

function addProductToCart(id,cost,title){
    globalCountProducts = globalCountProducts + 1;
    var cart_product_detail = '<div class="row" id="'+globalCountProducts+'"><p class="col-sm-4 h6">'+title+'</p><div class="col-sm-4">$'+cost+'</div><div class="col-sm-2 text-danger puntero" onclick="deleteProductFromCart_('+globalCountProducts+','+cost+');" >X</div></div>';
    $("#shopping-cart").append(cart_product_detail)
    globalCost = globalCost + cost;
    globalCost = Math.round(globalCost * 100)/100;
    $("#total-cost").text(globalCost);
    $("#btn-gen-event").show();
}

function deleteProductFromCart(id,cost) {
    
    console.log(id);
    dataId = "#"+id;
    console.log(dataId);
    $(dataId).remove();
    globalCost = globalCost - cost;
    globalCost = Math.round(globalCost * 100)/100;
    $("#total-cost").text(globalCost);
}

function deleteProductFromCart_(id,cost) {
    dataId = "#"+id;
    $(dataId).remove();
    globalCost = globalCost - cost;
    globalCost = Math.round(globalCost * 100)/100;
    $("#total-cost").text(globalCost);
    if (globalCost == 0) {
        $("#btn-gen-event").hide();
    }
}

function cerrarModal(){
    $("#eventModal").modal("hide");

}

function validateUser(){
    $("#target-message").text("PRESENTE TARJETA:");
    $("#target-name").text("");
    $("#target-num").text("");
    eel.verificaTarjeta();
}

eel.expose(return_tarjeta)
function return_tarjeta(response){
    if (response[3] != ""){
        genEvent(response[2])
    } 
    $("#target-message").text(response[0]);
    $("#target-name").text(response[1]);
    $("#target-num").text(response[2]);

    setTimeout('cerrarModal()', 1000);
}


function genEvent(user) {
    eel.saveEventKiosco(globalCost, user)
    $("#shopping-cart div").remove();
    globalCost = 0;
    globalCountProducts = 0;
    $("#total-cost").text(globalCost);
    $("#btn-gen-event").hide();
}

