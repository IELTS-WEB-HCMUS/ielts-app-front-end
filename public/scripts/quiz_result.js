function renderChart(chartId, yValues) {
    const xValues = ["Đúng", "Sai", "Chưa làm"];
    const barColors = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
    ];
    const titleText = "Tổng số câu: " + yValues.reduce((sum, value) => sum + value, 0);

    new Chart(chartId, {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                label: 'Số câu',
                backgroundColor: barColors,
                data: yValues,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: titleText
                }
            }
        }
    });
}

renderChart("chart", [5, 2, 3]);
