function createScale(data)
{
    console.log(data);
    
    var svg = d3.select("body").append("svg")
        .attr("class", "force-scale");
    var selection = 0;
    var yHeight = 300;
    
    svg.append("g")
        .attr("class", "nutrient-bar");
    
    getScale(data,svg,selection,yHeight)
    
    var scaleSelect = "fats";
    
    var bars = svg.selectAll(".nutrient-bar");
    
    bars.append("g");
    
    var barGroup = bars.selectAll("g");
    
    //TODO collapse hard coded bar selections
    barGroup.append("rect")
        .attr
        ({
            x: 0,
            y: 0,
            height: 100,
            width: 50,
            transform: "translate(20,80) rotate(-90) ",
            id: "fats",
            class: "nutrient-bar",
            fill: "red"
        })
        .on
        ({
            click: mouseclick
        });
    
    barGroup.append("text")
        .text("Fats")
        .attr
        ({
            x: 40,
            y: 65,
            height: 100,
            width: 50,
            class: "nutrient-bar-text"
        });
    
    bargroup = bars.append("g");
    barGroup.append("rect")
        .attr
        ({
            x: 0,
            y: 0,
            height: 140,
            width: 50,
            transform: "translate(121,80) rotate(-90) ",
            id: "proteins",
            class: "nutrient-bar",
            fill: "steelblue"
        })
        .on
        ({
            click: mouseclick
        });
    
    barGroup.append("text")
        .text("Proteins")
        .attr
        ({
            x: 135,
            y: 65,
            height: 100,
            width: 50,
            class: "nutrient-bar-text"
        });
    
    bargroup = bars.append("g");
    barGroup.append("rect")
        .attr
        ({
            x: 0,
            y: 0,
            height: 220,
            width: 50,
            transform: "translate(262,80) rotate(-90) ",
            id: "carbohydrates",
            class: "nutrient-bar",
            fill: "steelblue"
        
        })
        .on
        ({
            click: mouseclick
        });
    
    barGroup.append("text")
        .text("Carbohydrates")
        .attr
        ({
            x: 270,
            y: 65,
            height: 100,
            width: 50,
            class: "nutrient-bar-text"
        });

    function mouseclick()
    {
        if (this.id != scaleSelect)
        {
            d3.selectAll(".nutrient-bar")
                .attr("fill","steelblue");
            
            d3.select(this)
                .transition()
                .duration(100)
                .attr("fill", "red");
            scaleSelect = this.id;
        }
        
        if (this.id == "fats") selection = 0;
        if (this.id == "carbohydrates") selection = 1;
        if (this.id == "proteins") selection = 2;
        
        d3.selectAll(".force-scale-node").remove();
        getScale(data,svg,selection,yHeight);
    }
    
    
}