function initialise(data, svg) {    
  
  // Create the defailed nutrition box
  var nutrientchart = d3.select("#overview")
        .append("div")
        .attr("class", "food-overview")
        .attr("id", "foodOverview")
        .classed("hidden", true);
  
  // Create GDA fulfillment box
  var gda = d3.select("#gda")
        .append("div")
        .attr("class", "gda")
        .text("Guidline Amount Fulfillment");
  
  // Create the selection menu, defailed info box, GDA fulfillment box
  for (var i = 0; i < nutrients.length; i++) {
    
    // Create selection menu sections
    if ((nutrients[i] == "fat") ||
        (nutrients[i] == "carbohydrate") ||
        (nutrients[i] == "protein"))
    {
        var div = d3.select("#menu")
          .append("div")
          .text(nutrients[i].charAt(0).toUpperCase() + nutrients[i].slice(1))
          .attr
          ({
            id: nutrients[i],
            class: "menu-item"
          })
          .on("click", mouseclick);
          if(nutrients[i] == selected_nutrient)
            div.style("color", "#FF3030");
    }
    
    
    // Create GDA Fulfillment sections
    gda.append("div")
      .attr("id", nutrients[i])
      .attr("class", "gda-nutrient")
      .append("div")
      .text(nutrients[i].charAt(0).toUpperCase() + nutrients[i].slice(1))
      .attr("id", nutrients[i] + "-progress")
      .append("span")
      .attr("class", "gda-percentage")
      .text("0%");
  }
  
  gda.append("div").attr("id", "selected");

  // Fired when a menu box is selected
  function mouseclick() {
    if (this.id != selected_nutrient) {
      
      // Set all backgrounds to default
      d3.selectAll(".menu-item")
        .style("color", "#fff");

      // Set selected box to highlighted color
      d3.select("#" + this.id)
        .transition()
        .duration(100)
        .style("color", "#FF3030");
      
      // Update the selection variable with the new id
      selected_nutrient = this.id;
      
      // Remove all displayed nodes and regenerate graph
      d3.selectAll(".force-scale-node").remove();
      getScale(data, svg, selected_nutrient);
    }
  }  
}
