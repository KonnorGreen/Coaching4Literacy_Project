$(document).ready(function () {
    $.ajax({
        url: 'api/products',
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

            let products = [];
            let quantities = [];

            try {
                $.each(data, function (i, v) {

                    products.push(v.productName);
                    quantities.push(v.quantity);

                });

                let chartdata = {
                    labels: [...products],
                    datasets: [
                        {
                            label: 'Inventory',
                            backgroundColor: poolColors(data.length)
                            ,
                            borderColor: poolColors(data.length),
                            overBackgroundColor: poolColors(data.length),
                            hoverBorderColor: poolColors(data.length),
                            data: [...quantities],
                            order: 1
                        }
                    ]
                };

                let ctx = document.getElementById('canvas').getContext('2d');

                let barGraph = new Chart(ctx, {
                    type: 'bar',
                    data: chartdata,
                    options: {
                        title: {
                            display: true,
                            text: 'Inventory'
                        },
                        barValueSpacing: 20,
                        scales: {
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        responsive: false,
                                        maintainAspectRatio: true
                                    }
                                }]
                        }
                    }
                });

            } catch (error) {
                console.log('Error parsing JSON data', error);
            }

        },
        error: function () {
            alert('Network Communication Error');
        }
    });
});

function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

function poolColors(a) {
    var pool = [];
    for(i = 0; i < a; i++) {
        pool.push(dynamicColors());
    }
    return pool;
}

