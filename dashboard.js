// Fetch the sales data
function getDataFromDataModule() {
    // Replace this function with your actual data fetching logic
    return salesData;
  }
  
  // Get filter elements
  const productFilter = document.getElementById('productFilter');
  const yearFilter = document.getElementById('yearFilter');
  const monthFilter = document.getElementById('monthFilter');
  
  // Add event listeners
  productFilter.addEventListener('change', updateDashboard);
  yearFilter.addEventListener('change', updateDashboard);
  monthFilter.addEventListener('change', updateDashboard);
  
  // Function to update the dashboard
  function updateDashboard() {
    // Fetch the sales data
    const salesData = getDataFromDataModule();
  
    // Get selected options
    const selectedProduct = productFilter.value;
    const selectedYear = yearFilter.value;
    const selectedMonth = monthFilter.value;
  
    // Filter data based on selections
    const filteredData = filterData(salesData, selectedProduct, selectedYear, selectedMonth);
  
    // Update bar chart
    updateBarChart(filteredData);
  
    // Update line chart
    updateLineChart(filteredData);
  }
  
  // Function to filter data based on selections
  function filterData(data, selectedProduct, selectedYear, selectedMonth) {
    return data.filter(entry =>
      (selectedProduct === 'All' || entry.product === selectedProduct) &&
      (selectedYear === 'All' || entry.year.toString() === selectedYear) &&
      (selectedMonth === 'All' || entry.month === selectedMonth)
    );
  }
  
  // Function to update the bar chart
  function updateBarChart(filteredData) {
    const barCtx = document.getElementById('barChart').getContext('2d');
    const labels = [...new Set(filteredData.map(entry => entry.product))];
    const data = labels.map(product => {
      return filteredData.filter(entry => entry.product === product)
                         .reduce((sum, entry) => sum + entry.sales, 0);
    });
  
    if (window.barChart) {
      // If the chart already exists, update it
      window.barChart.data.labels = labels;
      window.barChart.data.datasets[0].data = data;
      window.barChart.update();
    } else {
      // Otherwise, create a new chart
      window.barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Monthly Sales',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }
  
  // Function to update the line chart
  function updateLineChart(filteredData) {
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const years = [...new Set(filteredData.map(entry => entry.year))];
    const datasets = years.map(year => {
      return {
        label: year.toString(),
        data: filteredData.filter(entry => entry.year === year)
                          .map(entry => entry.sales),
        borderColor: getRandomColor(),
        borderWidth: 2,
        fill: false
      };
    });
  
    if (window.lineChart) {
      // If the chart already exists, update it
      window.lineChart.data.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      window.lineChart.data.datasets = datasets;
      window.lineChart.update();
    } else {
      // Otherwise, create a new chart
      window.lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: datasets
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }
  
  // Function to generate random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Initial dashboard update
  updateDashboard();
  