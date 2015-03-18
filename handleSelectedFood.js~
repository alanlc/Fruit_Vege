function handleSelectedFood(data, index){
  var selection = data[index];

  if (!selected_foods[index]) {
    selected_foods[index] = 1;
    var element = d3.select("#selected")
      .append("div")
      .attr("id", "selected-"+selection.food)
      .attr("value", 1)
      .attr("class", "selected-food-item")
      .text(selection.food);

    element.append("div")
      .attr("id", "selected-serving-control")
      .attr("class", "selected-food-control");

    element.select("#selected-serving-control")
      .append("div")
      .attr("id", "plus")
      .attr("class", "selected-plusminus")
      .text("+")
      .on("click", function()
      {
          element.attr("value", +element.attr("value")+1)
              .select("#amount")
              .text(element.attr("value"));

          calculateGDA(data, index, true);
      });

    element.select("#selected-serving-control")
      .append("div")
      .attr("id", "minus")
      .attr("class", "selected-plusminus")
      .text("-")
      .on("click", function()
      {
          element
              .attr("value", +element.attr("value")-1)
              .select("#amount")
              .text(element.attr("value"));

          if (element.attr("value") == "0")
          {
              element.remove();
              element = null;
              selected_foods[index] = null;
          }

          calculateGDA(data, index, false);
      });

    element
      .append("span")
      .attr("id", "amount")
      .attr("class", "selected-food-serving")
      .text(element.attr("value"));
    
  } else {
    
    var element = d3.select("#selected-"+selection.food);
    
    element.attr("value", +element.attr("value")+1)
      .select("#amount")
      .text(element.attr("value"));
    
    selected_foods[index] += 1;
  }
}