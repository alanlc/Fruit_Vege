function calculateGDA(data, index, insert) {
    
  var width = 200;

  var scale = d3.scale.linear()
      .range([105, 200])
      .domain([0,100]);
  
  // Initialise the nutrient data variables
  var nutrientdata = data[index].nutrients;
  var nutrientkeys = d3.keys(nutrientdata);
  
  for (var i = 0; i < nutrients.length; i++) {

    if (nutrientdata[nutrientkeys[i]] != null){
      var elem = d3.select("#" + nutrientkeys[i] + "-progress");
      var oldvalue = elem.selectAll("span");
      var newvalue = +oldvalue.text().slice(0, - 1) + ((insert ? 1 : -1)
                        * Math.round((nutrientdata[nutrientkeys[i]] / gda[i]) * 100));
      elem.style("width", Math.min(scale(newvalue), width) + "px")
          .style("background-color", "#5A4747");
      oldvalue.text(newvalue + "%");
    }
  }
}
