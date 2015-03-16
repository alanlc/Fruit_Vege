function calculateGDA(data,selectedFood)
{
    var gdaProtein = 45;
    var gdaFat = 70;
    var gdaCarb = 230;

    var totalProtein = 0, totalFat = 0, totalCarb = 0;
    var percentProtein, percentFat, percentCarb;

    for (i=0; i<selectedFood.length; i++)
    {
        if (selectedFood[i] != null)
        {
            totalProtein += data[i].nutrients.protein * +selectedFood[i].attr("value");
            totalFat += data[i].nutrients.fat * +selectedFood[i].attr("value");
            totalCarb += data[i].nutrients.carbohydrate * +selectedFood[i].attr("value");
        }
    }
    
    percentProtein = Math.round((totalProtein/gdaProtein)*100);
    percentFat = Math.round((totalFat/gdaFat)*100);
    percentCarb = Math.round((totalCarb/gdaCarb)*100);
    
    var width = 200;
    
    var scale = d3.scale.linear()
        .range([105, 200])
        .domain([0,100]);
    
    d3.select("#Fat-Progress")
        .style("width", Math.min(scale(percentFat),width) + "px")
        .style("background-color", "#5A4747")
        .selectAll("span")
            .text(percentFat + "%");
    
    d3.select("#Carbohydrate-Progress")
        .style("width", Math.min(scale(percentCarb),width) + "px")
        .style("background-color", "#5A4747")
        .selectAll("span")
            .text(percentCarb + "%");
            
    d3.select("#Protein-Progress")
        .style("width", Math.min(scale(percentProtein),width) + "px")
        .style("background-color", "#5A4747")
        .selectAll("span")
            .text(percentProtein + "%");
}
