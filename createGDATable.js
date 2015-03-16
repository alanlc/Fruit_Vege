function createGDATable()
{

    var gda = d3.select("#GDA")
        .append("div")
        .attr("class", "gda")
        .text("Guidline Amount Fulfilment");
        
    var fat = gda.append("div")
        .attr("id", "Fat")
        .attr("class", "gda-nutrient");
        
    var carb = gda.append("div")
        .attr("id", "Carbohydrate")
        .attr("class", "gda-nutrient");
        
    var protein = gda.append("div")
        .attr("id", "Protein")
        .attr("class", "gda-nutrient");
        
    fat.append("div")
        .text("Fat")
        .attr("id", "Fat-Progress")
    .append("span")
        .attr("class", "gda-percentage")
        .text("0%");
        
    protein.append("div")
        .text("Protein")
        .attr("id", "Protein-Progress")
    .append("span")
        .attr("class", "gda-percentage")
        .text("0%");
        
    carb.append("div")
        .text("Carbohydrate")
        .attr("id", "Carbohydrate-Progress")
    .append("span")
        .attr("class", "gda-percentage")
        .text("0%");
}
