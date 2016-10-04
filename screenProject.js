 var projects = [
        {id:'1',name:'IBP'},
        {id:'2',name:'WIF'},
        {id:'3',name:'PMI'},
        {id:'4',name:'LPM'},
        {id:'5',name:'CE'},
        {id:'6',name:'Comunauté running'}]

function dispayMyProject()
{
    html = '<div class="starter-template"><h1>Mes projets</h1></div>';
    var nbCol = 0;
    for(var i = 0; i < projects.length; i++){
        var p = projects[i]
        nbCol += 1;
        
        if(nbCol == 1){
            html += '<div class="row">';
        }
        html += '<div class="col-md-6"><a href="#" projectId="' + p.id + '" class="project">' + p.name+ '</a></div>';
        if(nbCol == 2){
            html += '</div>';
            nbCol = 0;
        }
    }
    if(nbCol == 1){
        html += '</div>';
    }

    $("#screenContainer").html(html);
    $(".project").click(function(){
        console.log($(this).attr("projectId"))
        var id = $(this).attr("projectId");
        displayProjectDetails(id);
    });
}
function displayProjectDetails(id)
{
    var p = projects[id-1];
    var html = '<div class="row"><div class="col-md-12"><div class="project">' + p.name + '</div></div></div>';
    html += '<div class="row">';
    html += '   <div class="col-md-6">' + displayUser() + '</div>';
    html += '   <div class="col-md-6"><h2>Description</h2>' + p.desc  + '</div>';
    html += '</div>';
    $("#screenContainer").html(html);
}

function displayUser(){
    var html = '<h2>Coolaborateurs ';
    html += '<a id="addUser" href="#" class="btn btn-success" title="Ajouter un coolaborateur"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>'
    html += '</h2>';
    html +='<div class="users"><div class="user"></div><div class="user"></div></div>';
    return html;
}




;(function( $ ) {
    $("#btnProject").click(function(){
        dispayMyProject()
    });
})( jQuery );


