import React from 'react';
import ApexCharts from 'apexcharts'

const Line = ({ data }) => {
  var actuals = [];
  var estimate = [];
  var period = [];
  var symbol = ""
  for(var i = 0; i < data.length; i++) {
    actuals.push(data[i].actual)
    estimate.push(data[i].estimate)
    period.push(data[i].period)
    symbol = data[i].symbol
  }
  var options = {
    chart: {
      type: 'line'
    },
    stroke: {
      curve: 'smooth',
    },
    series: [{
      name: symbol,
      data: actuals,
    }],
    xaxis: {
      categories: period
    },
  }
  
  var chart = new ApexCharts(document.getElementById("chart"), options);
  chart.render()
  return(
    <div id="chart"></div>
  )
}

export default Line; 

