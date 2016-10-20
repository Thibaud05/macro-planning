 
//////////////////////////////////////////
//
//  PROJECT SCREEN CLASS
//
//////////////////////////////////////////

function projectScreen(projectsJsonData){
  this.nbCol = 3;
  this.projectsData = [];
  this.mapData(projectsJsonData);
}

projectScreen.prototype = {
    dispayMyProject: function()
    {
        html = '<div class="container"><div class="starter-template"><h1>Projets';
        html += ' <a id="addUser" href="#" class="btn btn-success" title="Ajouter un projet"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>';
        html += '</h1></div>';
        var nbCol = 0;
        var row = "";
        this.projectsData.forEach(function(p,i) {
            nbCol ++;
            row += '<div class="col-md-4">' + p.display() + '</div>';
            if(nbCol % this.nbCol == 0){
                html += '<div class="row">' + row + '</div>';
                row = "";
            }
        },this);
        if(row != ""){
            html += '<div class="row">' + row + '</div>';
        }
        $("#screenContainer").html('<div class="container">' + html + '</div>');
        var self = this;
        $(".project").click(function(){
            var id = $(this).parents(".card").attr("projectId");
            self.displayDetails(id);
        });
        $(".btnFav").click(function(){
            var id = $(this).parents(".card").attr("projectId");
            self.selectFav(id);
        });
    },
    selectFav: function (id)
    {
        this.projectsData.forEach(function(p) {
            if(p.id==id){
                p.select()
            }else{
                p.unSelect(); 
            }
        });
    },
    displayDetails: function(id)
    {
        var p = this.projectsData[id];
        $("#screenContainer").html(p.displayDetails());
        $("#addUser").click(function(){
            console.log("click btn add")
            $("#addUser").hide()
            $("#addUser").after('<input type="text" class="form-control" id="acUser" placeholder="User">')
            $("#acUser").focus()
        });

    },
    mapData: function(projectsJsonData){
        projectsJsonData.forEach(function(projectData) {
            var p = new project(projectData);
            this.projectsData[p.id] = p;
        },this);
    }
}/*
 Structurer et standardiser la gestion de ces activités
 Partager une vision centralisée et consolidée
 Suivre de manière opérationnelle l’exécution des activités
 Assurer le reporting et le suivi de la performance*/
var projectsData = [
        {id:'1',name:'IBP',img:'ibp.png',color:"",selected:0,desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu accumsan tortor, sit amet lobortis quam. '},
        {id:'2',name:'WIF',img:'wif.png',color:"#2196F3",selected:0,desc:'WIF est un support opérationnel pour la planification et l’exécution des processus & projets'},
        {id:'3',name:'PMI',img:'',color:"",selected:0,desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu accumsan tortor, sit amet lobortis quam. '},
        {id:'4',name:'LPM',img:'lpm.png',color:"#3F51B5",selected:1,desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu accumsan tortor, sit amet lobortis quam. '},
        {id:'5',name:'GEEK',img:'geek.png',color:"#1a237e",selected:0,desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu accumsan tortor, sit amet lobortis quam. '},
        {id:'6',name:'Comunauté running',color:"",selected:0,img:'run.png',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu accumsan tortor, sit amet lobortis quam. '}];

;(function( $ ) {
    $("#btnProject").click(function(){
        var ps = new projectScreen(projectsData);
        ps.dispayMyProject();
    });
})( jQuery );