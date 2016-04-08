function macroPlanning(container,data,dateFormat)
{
    this.container = container
    this.data = data
    this.projects = []
    this.nbMonth = 0
    this.nbDay = 0
    this.startDate = null
    this.endDate = null
    this.dateFormat = dateFormat
    this.init()
}

macroPlanning.prototype = {
    init : function()
    {
        for(var i= 0; i < this.data.length; i++)
        {
            var p = new project(this.data[i],this.dateFormat)
            this.projects[i] = p

            if(!this.startDate)
            {
                this.startDate = p.startDate.clone()
                this.endDate = p.endDate.clone()
            }
            if(p.startDate.isBefore(this.startDate))
            {
                this.startDate = p.startDate.clone()
            }
            if(p.endDate.isAfter(this.endDate))
            {
                this.endDate = p.endDate.clone()
            }
        }

        this.nbDay = this.endDate.diff(this.startDate, 'days') + 1
        this.nbMonth = this.endDate.clone().date(0).diff(this.startDate.clone().date(0), 'months') + 1
    },
    display : function()
    {
        /*var html = '<div class="bars">'
        for(var i= 0; i < this.data.length; i++)
        {
            var project = this.projects[i]
            project.calcul(this.startDate,this.nbDay)
            html += project.display()
        }
        html += '</div>'
        */
        var html = this.displayTable()
        $(this.container).html(html)
    },
    displayTable : function()
    {
        var tbody   = ""
        var thead   = ""
        var start = this.startDate.clone()

        for(var i= 0; i <= this.data.length; i++)
        {
            if(i>0){
                var project = this.projects[i-1]
                project.calcul(this.startDate,this.nbDay)
            }
            var row = ""

            for(var j= 0; j < this.nbMonth; j++)
            {
                if(i==0){
                    if(j>0){
                        var monthValue = start.month()
                        start = start.clone().month(monthValue + 1).date(1)

                    }
                    end = start.clone().endOf('month')
                    if(j==this.nbMonth-1){
                        end = this.endDate.clone()
                    }
                    var width = (end.diff(start,'Days') + 1)/ this.nbDay * 100
                    row += '<th width="' + width + '%">' + start.format("MMMM")+ '</th>'
                }else{
                    if(j==0 && i>0){
                        row += '<td  colspan="' + this.nbMonth + '">' + project.display() + '</td>'
                    }
                }
            }
            row = "<tr>" + row + "</tr>"                
            if(i==0){
                thead += row
            }else{
                tbody += row
            }
        }
        return  '<table class="table table-bordered"><thead>' + thead + '</thead><tbody>' + tbody + '</tbody></table>'
    },
    getMonthHtml : function(increment)
    {
        var monthValue = this.startDate.month()
        var monthDate = this.startDate.month(monthValue + increment)
        var width = (monthDate.daysInMonth() - monthDate.day())  / this.nbDay
        return '<th width="' + width  + '%">' + monthDate.format(MMM) + '</th>' 
    }

}

function project(data,dateFormat)
{
    this.title = data.title
    this.startDate = moment(data.startDate,dateFormat)
    this.endDate = moment(data.endDate,dateFormat)
    this.duration = 0 // in day
    this.width = 0
    this.left = 0
    this.color = data.color
}

project.prototype = {
    calcul : function(startDate,nbDay)
    {
        this.duration = this.endDate.diff(this.startDate, 'days') + 1
        this.width = this.duration / nbDay * 100
        this.left = (this.startDate.diff(startDate, 'days')) / nbDay * 100 
    },
    display : function(){
        var unit = " jour" + ((this.duration > 1) ? "s":"");
        return '<a class="bar" href="#" style="'
        + 'width:' + this.width + '%;'
        + 'margin-left:' + this.left + '%;'
        + 'background-color:' + this.color + ';"'
        +' data-toggle="tooltip" data-placement="top" title="' + this.duration + unit + '" >' + this.title + '</a>'
    }
}

// Jquery Module
// 
;(function( $ ) {
    $.fn.macroPlanning = function(data) {
        var mp = new macroPlanning($(this),data,"DD/MM/YYYY")
        mp.display()
    }
})( jQuery );


// Use module
// 
var dataUT = [{"title":"titre 1","color":"#CDDC39","startDate":"01/04/2016","endDate":"05/05/2016"},
            {"title":"titre 2","color":"#FFC107","startDate":"01/05/2016","endDate":"15/05/2016"},
            {"title":"super long titre pour tester les bugs","color":"#F44336","startDate":"12/05/2016","endDate":"12/06/2016"}]

$("#macroPlanning").macroPlanning(dataUT)


