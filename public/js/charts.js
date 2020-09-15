
const data = JSON.parse(summaryForCharts);

// Vertical bar chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Passed rules', 'Minor errors', 'Critical errors'],
        datasets: [{
            data: [data[0], data[0.5], data[1]],
            // barThickness: 6,
            backgroundColor: [
                'rgba(37, 196, 69, 0.6)',
                'rgba(222, 152, 31, 0.6)',
                'rgba(217, 46, 46, 0.6)'
            ],
            borderColor: [
                'rgba(37, 196, 69, 1)',
                'rgba(222, 152, 31, 1)',
                'rgba(217, 46, 46, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        display: false
    },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
 
// Pie chart
    const chart = document.getElementsByClassName("progress-pie-chart")[0];
    const percent = parseInt(chart.dataset.percent);
    const degree = (360 * percent) / 100;
    if (percent > 50) {
      chart.classList.add("gt-50");
    }
    document.getElementsByClassName("ppc-progress-fill")[0].style.transform = "rotate(" + degree + "deg)";
    document.querySelector(".ppc-percents span").innerText = percent + "%"
  
  
      