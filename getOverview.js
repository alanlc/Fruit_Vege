function getOverview(data, foodIndex)
{
    var serving = data[foodIndex].serving;
    var food = data[foodIndex].food;
    
    food = food.charAt(0).toUpperCase() + food.slice(1)
    
    d3.select("#foodOverview")
        .html("<span class=\"food-overview-food\">"
            + food + "</span><br>"
            + "Serving Size: "
            + "<span class=\"food-overview-serving\">"
            + serving + "</span>");
        
    var xPos = d3.event.pageX;
    var yPos = d3.event.pageY;
    d3.select(".food-overview")
        .style("left", xPos + "px")
        .style("top", yPos + "px")    
    
    d3.select(".food-overview").classed("hidden", false);
}
