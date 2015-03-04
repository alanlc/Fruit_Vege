//function creates food scale based on the nutrient selection
function getScale(data,svg,selection,yHeight)
{
    var width = 700,
        height = 500;
    
    var margin = 
    {
		top: 20,
		bottom: 50,
		left: 70,
		right: 100
	};
    
    var color = d3.scale.category20b();
    
    var maxElement = d3.max(d3.values(data),function(i){
        return i.nutrients[selection].amount;});
    var minElement = d3.min(d3.values(data),function(i){
        return i.nutrients[selection].amount;});
    
    var scale = d3.scale.linear()
        .range([margin.left, width-margin.right])
        .domain([minElement,maxElement]);

    var exData = extractSelected();
    
    var foci = [];
    
    for(i=0;i<exData.length;i++)
    {
        foci[i] = {x: d3.values(exData)[i].x, y: yHeight};
    }
    
    var force = d3.layout.force()
        .nodes(exData)
        .size([width/2,
               height-(margin.top+margin.bottom)])
        .gravity(.001)
        .charge(0)
        .start();
    
    var nodes = svg.selectAll(".force-scale-node")
        .data(force.nodes())
        .enter()
        .append("g")
        .attr("class", "force-scale-node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);
        //.call(force.drag);
    
    nodes.append("circle")
        .attr("r", 20)
        .attr("fill", function(d, i) 
        {
            return color(i);
        })
        .transition()
        .duration(1000)
        .attrTween("r", function(d) {
          var i = d3.interpolate(0, 20);
          return function(t) { return i(t); };
        });
    
    force.on("tick", function(e)
    {   
        svg.selectAll("circle")
            .each(cluster(10*e.alpha*e.alpha))
            .each(collide(0.5))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });
    
    svg.on("mousemove", function()
    {
        force.resume();
    });
    
    function mouseover(d)
    {
        var dd = d3.select(this)[0];
        d3.select(this)
            .select("circle")
            .transition()
            .duration(150)
            .attr("r", 23);
        
        getDominantNutrients(data,d.index);
        
    };
    
    function mouseout()
    {
        d3.select(this)
            .select("circle")
            .transition()
            .duration(150)
            .attr("r", 20);
    };
    
    function extractSelected()
    {
        var dd = [];
        var x = [];
        
        for (i=0;i<data.length;i++)
        {
            dd[i] = {x: data[i].nutrients[selection].amount, y: yHeight};
        }
        return dd;
    }
    
    function cluster(alpha) 
    {
      return function(d) 
      {
        var cluster = foci[d.index];
        if (scale(cluster.x) == d.x) return;
        var x = d.x - scale(cluster.x),
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = 23 + 0;
        if (l != r) 
        {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
        }
      };
    }
    
    function collide(alpha) 
    {
        var quadtree = d3.geom.quadtree(exData);
        return function(d) 
        {
            var r = 23+20,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) 
            {
                if (quad.point && (quad.point !== d)) 
                {
                    var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = 21 + 21;
                    if (l < r) 
                    {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }
}