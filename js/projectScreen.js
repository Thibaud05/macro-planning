 
//////////////////////////////////////////
//
//  PROJECT SCREEN CLASS
//
//////////////////////////////////////////

function projectScreen(projectsJsonData,usersById){
  this.nbCol = 3;
  this.projectsData = [];
  this.usersById = usersById
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
        var self = this
        var p = this.projectsData[id];
        $("#screenContainer").html(p.displayDetails());
        $("#addUser").click(function(){
            console.log("click btn add")
            $("#addUser").hide()
            $("#addUser").after('<input type="text" class="form-control" id="acUser" placeholder="User">')
            $("#acUser").focus()
            var myAcUser = new acUser("#acUser",self.usersById);
            myAcUser.init()
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


var usersById = [];
usersById[0] = {id:0,prenom: 'jean', nom: 'paul',ville:'paris',societe:'',poste:''};
usersById[1] = {id:1,prenom: 'jean', nom: 'range',ville:'lyon'};
usersById[2] = {id:2,prenom: 'paul', nom: 'palu',ville:'lyon'};
usersById[3] = {id:3,prenom: 'jean paul', nom: 'barto',ville:'lyon'};
usersById[4] = {id:4,prenom: 'thibaud', nom: 'granier',ville:'lyon'};
usersById[5] = {id:5,prenom: 'jack', nom: 'pariche',ville:'paris',societe:'',poste:''};
usersById[6] = {id:6,prenom: 'jimmy', nom: 'bilou',ville:'paris',societe:'',poste:''};





;(function( $ ) {
    $("#btnProject").click(function(){
        var ps = new projectScreen(projectsData,usersById);
        ps.dispayMyProject();
    });
})( jQuery );