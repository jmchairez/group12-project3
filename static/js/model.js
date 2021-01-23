var predictionNumber = data["Prediction"][1];

if (data['Success']) {
  switch(predictionNumber) {
      case '0':
        prediction = "The area is damage";
        break;
      case '1': 
        prediction = "The area is no damage";
        break;
     
      default: 
        prediction = "upps something not working!"; }
  console.log(prediction);
  document.getElementById("prediction").innerHTML=prediction;

  console.log(data['Values'])
  var graph_array=data['Values'][0]
  graph_array.push(data['Values'][0][0])
  console.log(graph_array)

  var graph = [{
    
  }]
  var layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0,1]
      }
    },
    showlegend: false
  }
  Plotly.newPlot("graph",graph_data,layout)
}
else{
  document.getElementById("prediction").innerHTML=''
}