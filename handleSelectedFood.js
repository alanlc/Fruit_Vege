function handleSelectedFood(data, foodTable, index)
{
    var selection = data[index];
    
    if (foodTable[index] == null)
        {
            foodTable[index] = d3.select("#selected")
                .append("div")
                .attr("id", "selected-"+selection.food)
                .attr("value", 1)
                .attr("class", "selected-food-item")
                .text(selection.food);
            
            
            foodTable[index]
                .append("div")
                .attr("id", "selected-serving-control")
                .attr("class", "selected-food-control");
                
            foodTable[index].select("#selected-serving-control")
                .append("div")
                .attr("id", "plus")
                .attr("class", "selected-plusminus")
                .text("+")
                .on("click", function()
                {
                    foodTable[index]
                        .attr("value", +foodTable[index].attr("value")+1)
                        .select("#amount")
                        .text(foodTable[index].attr("value"));
                        
                    calculateGDA(data,foodTable);
                });
                
            foodTable[index].select("#selected-serving-control")
                .append("div")
                .attr("id", "minus")
                .attr("class", "selected-plusminus")
                .text("-")
                .on("click", function()
                {
                    foodTable[index]
                        .attr("value", +foodTable[index].attr("value")-1)
                        .select("#amount")
                        .text(foodTable[index].attr("value"));
                        
                    if (foodTable[index].attr("value") == "0")
                    {
                        foodTable[index].remove();
                        foodTable[index] = null;
                    }
                        
                    calculateGDA(data,foodTable);
                });
                
            foodTable[index]
                .append("span")
                .attr("id", "amount")
                .attr("class", "selected-food-serving")
                .text(foodTable[index].attr("value"));
        }
        else 
        {
            foodTable[index]
                .attr("value", +foodTable[index].attr("value")+1)
                .select("#amount")
                .text(foodTable[index].attr("value"));
        }
    

}
