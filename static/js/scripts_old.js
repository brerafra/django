function descargaVideo() {
    url = $("#url").val()
    response = "Descargando ..."
    $("#response-download").text(response);
    eel.descarga_video(url);
}

function descargaMusica() {
    url = $("#url").val();
    response = "Descargando ..."
    $("#response-download").text(response);
    eel.descarga_song(url);
}

eel.expose(download_response)
function download_response(response){
    $("#response-download").text(response);
}

function downPage() {
    $("#main-container").load("down.html");
}

function videoPage() {
    $("#main-container").load("videoDown.html");
}

function displayRegister(events) {
    $("#tabla-registro").empty(); 
    for (let event of events) {
        displayRegistro(event)
    } 
}

function displayRegistro(event) {
    var line_data = "<tr><td>"+event[0]+"</td><td>"+event[1]+"</td><td>"+event[2]+"</td></tr>";
    $("#tabla-registro").append(line_data);
}

function historyPage(id) {
    register_data = '<section class="container main-form-table"><div class="form-group"><table class="table" id="table"><thead><th scope="col">#</th><th scope="col">Url</th><th scope="col">Canciones</th></thead><tbody id="tabla-registro"></tbody></table></div> </section><div class="response"><h3 id="response-download"></h3></div><div class="pagination" id="pagination"></div>'
    $("#main-container").html(register_data);
    
    eel.get_songs(id)(displayRegister)
    eel.get_pages()(countpages)
}

function countpages(paginas){
    pagination_data = ''
    for (var i = 1; i<=paginas; i++){
        if (paginas <= 10){
            data = '<a href="#" class="pages" id="page_'+i+'" onclick="changePage('+i+');' +'">'+i+'</a>'
            $('#pagination').append(data);
        }
        
    }
    
    $("#page_1").addClass("active");
}

function changePage(page) {
    eel.get_songs(page)(displayRegister)
    $(".pages").removeClass("active");
    $("#page_"+page).addClass("active");

}