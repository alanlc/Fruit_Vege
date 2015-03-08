function createScale(data, svg) {    
  
  var nutrientchart = d3.select("#nutrients").append("div")
    .attr("class", "dominant-nutrients");
  
  // Add detailed nutrition info header
  nutrientchart.append("div")
      .text("Main Nutrients")
      .attr
      ({
        id: "main-nutrient-item",
        class: "nutrient-item"
      });
  
  // Create the selection menu and the detailed info box
  for (var i = 0; i < nutrients.length; i++) {
    
    // Create selection menu sections
    var div = d3.select("#menu")
      .append("div")
      .text(nutrients[i].charAt(0).toUpperCase() + nutrients[i].slice(1) + "s")
      .attr
      ({
        id: nutrients[i],
        class: "menu-item"
      })
      .on("click", mouseclick);
      if(nutrients[i] == selection)
        div.style("background-color", "darkgrey");
    
    // Create detailed info sections
    nutrientchart.append("div")
      .text(nutrients[i])
      .attr
      ({
        id: nutrients[i] + "-nutrient-item",
        class: "nutrient-item"
      });
  }

  // Fired when a menu box is selected
  function mouseclick() {
    if (this.id != selection) {
      
      // Set all backgrounds to default
      d3.selectAll(".menu-item")
        .style("background-color", "lightgrey");

      // Set selected box to highlighted color
      d3.select("#" + this.id)
        .transition()
        .duration(100)
        .style("background-color", "darkgrey");
      
      // Update the selection variable with the new id
      selection = this.id;
      
      // Remove all displayed nodes and regenerate graph
      d3.selectAll(".force-scale-node").remove();
      getScale(data, svg, selection);
    }
  }  
}