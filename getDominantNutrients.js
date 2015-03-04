var dNutrientChart = d3.select("body").append("div")
    .attr("class", "dominant-nutrients");

//enter dummy data here to allow for indexing
d3.select(".dominant-nutrients")
    .selectAll("div")
    .data([0,0,0,0])
    .enter().append("div")
    .text(function(d,i) 
    {
        if (i==0) return ("Main Nutrients: (100g)");
        else return ("0g")
    });

//Maximum amounts are measured in grams. Can be altered to compare by percentages when implementing micro-nutrients 
function getDominantNutrients(data,foodIndex)
{
    d3.select(".dominant-nutrients")
        .selectAll("div")
        .remove();

    var datum = data[foodIndex].nutrients;
    var first = 0, second = 0, third = 0;

    for (i=0;i<datum.length;i++)
    {
        if ((datum[i].amount > first.amount) || (first.amount == undefined))
        {
            third = second;
            second = first;
            first = datum[i];
        }
        else if ((datum[i].amount > second.amount) || (second.amount == undefined))
        {
            third = second;
            second = datum[i];
        }
        else if ((datum[i].amount > third.amount) || (third.amount == undefined))
        {
            third = datum[i];
        }
    }

    var exDatum = [];
    exDatum[1] = first;
    exDatum[2] = second;
    exDatum[3] = third;

    d3.select(".dominant-nutrients")
        .selectAll("div")
        .data(exDatum)
        .enter().append("div")
        .text(function(d,i) 
        {
            if (i==0) return ("Main Nutrients: "+data[foodIndex].food +" (100g)");
            else return (exDatum[i].nutrient + ": " + exDatum[i].amount + "g ")
        });
}