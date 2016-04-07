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

        this.nbDay = this.endDate.diff(this.startDate, 'days')
        this.nbMonth = this.endDate.date(0).diff(this.startDate.clone().date(0), 'months') + 1
    },
    display : function()
    {
        var html = '<div class="bars">'
        for(var i= 0; i < this.data.length; i++)
        {
            var project = this.projects[i]
            project.calcul(this.startDate,this.nbDay)
            html += project.display()
        }
        html += '</div>'
        html += this.displayTable()
        $(this.container).html(html)
    },
    displayTable : function()
    {
        var tbody   = ""
        var thead   = ""
        var start = this.startDate.clone()

        for(var i= 0; i <= this.data.length; i++)
        {
            var row = ""
            for(var j= 0; j < this.nbMonth; j++)
            {
                if(i==0){
                    if(j>0){
                        var monthValue = start.month()
                        start = start.month(monthValue + 1).date(1)

                    }
                    end = start.endOf('month')
                    if(j==this.nbMonth-1){
                        end = this.endDate
                    }
                    var width = start.diff(end,'Days')/ this.nbDay * 100
                    row += '<th width="' + width + '%">' + start.format("MMMM")+ '</th>'
                }else{
                    row += '<td>-</td>'
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
    this.width = 0
    this.left = 0
    this.color = data.color
}

project.prototype = {
    calcul : function(startDate,nbDay)
    {
        console.log(this)
        console.log(nbDay)
        console.log(startDate)
        console.log(this.endDate.diff(this.startDate, 'days'))
        console.log(this.startDate.diff(startDate, 'days'))
        console.log("----------")
        this.width = this.endDate.diff(this.startDate, 'days') / nbDay * 100
        this.left = this.startDate.diff(startDate, 'days') / nbDay * 100 
    },
    display : function()
    {
        return '<div class="bar" style="'
        + 'width:' + this.width + '%;'
        + 'margin-left:' + this.left + '%;'
        + 'background-color:' + this.color + ';"></div>'
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
var dataUT = [{"title":"titre 1","color":"#CDDC39","startDate":"15/04/2016","endDate":"05/05/2016"},
            {"title":"titre 2","color":"#FFC107","startDate":"01/05/2016","endDate":"15/05/2016"},
            {"title":"titre 3","color":"#F44336","startDate":"12/05/2016","endDate":"12/06/2016"}]

$("#macroPlanning").macroPlanning(dataUT)


