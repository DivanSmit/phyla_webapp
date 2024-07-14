<script>
// @ts-nocheck

    import { onMount, onDestroy } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    import 'chartjs-adapter-date-fns';
  
    Chart.register(...registerables);
  
    export let data = [];
  
    let charts = {};
    let canvasElements = {};
  
    onMount(() => {
      updateCharts();
    });
  
    onDestroy(() => {
      Object.values(charts).forEach(chart => chart.destroy());
    });
  
    $: if (data.length > 0) {
      updateCharts();
    }
  
    function updateCharts() {
      // Clear existing charts
      Object.values(charts).forEach(chart => chart.destroy());
      charts = {};
  
      const processedData = processData(data);
  
      // Create new charts
      Object.keys(processedData.sensorData).forEach(sensorType => {
        const canvas = canvasElements[sensorType];
        if (canvas) {
          const ctx = canvas.getContext('2d');
          charts[sensorType] = new Chart(ctx, {
            type: 'line',
            data: {
              datasets: [{
                label: sensorType,
                data: processedData.sensorData[sensorType],
                borderColor: getRandomColor(),
                fill: false
              }]
            },
            options: {
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'minute'
                  },
                  title: {
                    display: true,
                    text: 'Time'
                  },
                  min: processedData.minTime,
                  max: processedData.maxTime
                },
                y: {
                  title: {
                    display: true,
                    text: 'Value'
                  },
                  min: processedData.minValue[sensorType],
                  max: processedData.maxValue[sensorType]
                }
              }
            }
          });
        }
      });
    }
  
    function processData(data) {
      // Sort the data by time in ascending order
      data.sort((a, b) => a[0] - b[0]);
  
      const sensorData = {};
      let minTime = Infinity;
      let maxTime = -Infinity;
      let minValue = {};
      let maxValue = {};
  
      data.forEach(([time, sensortype, value]) => {
        const date = new Date(parseInt(time));
        const sensorTypeStr = typeof sensortype === 'string' ? sensortype : new TextDecoder().decode(sensortype);
        const floatValue = parseFloat(value);
  
        if (!sensorData[sensorTypeStr]) {
          sensorData[sensorTypeStr] = [];
          minValue[sensorTypeStr] = Infinity;
          maxValue[sensorTypeStr] = -Infinity;
        }
        sensorData[sensorTypeStr].push({ x: date, y: floatValue });
  
        // Update min and max time
        if (date < minTime) minTime = date;
        if (date > maxTime) maxTime = date;
  
        // Update min and max value for this sensor type
        if (floatValue < minValue[sensorTypeStr]) minValue[sensorTypeStr] = floatValue;
        if (floatValue > maxValue[sensorTypeStr]) maxValue[sensorTypeStr] = floatValue;
      });
  
      return { sensorData, minTime, maxTime, minValue, maxValue };
    }
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  </script>
  
  <div class="charts-container">
    {#each Object.keys(processData(data).sensorData) as sensorType}
      <div class="chart">
        <canvas bind:this={canvasElements[sensorType]}></canvas>
      </div>
    {/each}
  </div>
  
  <style>
    .charts-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .chart {
      flex: 1;
      min-width: 300px;
      max-width: 600px;
    }
    canvas {
      max-width: 100%;
      height: auto;
    }
  </style>
  