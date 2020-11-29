
$(document).ready(function () {
    $.ajax({
        url: 'api/products',
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

            let clothing_products = [];
            let other_products = [];
            let clothing_quantities = [];
            let other_quantities = [];

            try {
                $.each(data, function (i, v) {
                    if (v.category === "Clothing") {
                        clothing_products.push(v.productName);
                        clothing_quantities.push(v.quantity);
                    } else if (v.category === "Shipping") {
                        other_products.push(v.productName);
                        other_quantities.push(v.quantity);
                    }
                });
                console.log(clothing_products);
                console.log(clothing_quantities);
                console.log(other_products);
                console.log(other_quantities);
                let chartdata = {
                    labels: [...clothing_products, ...other_products],
                    datasets: [
                        {
                            label: 'Clothing',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)'
                            ,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            overBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                            hoverBorderColor: 'rgba(200, 200, 200, 1)',
                            data: [...clothing_quantities],
                            order:1
                        },
                        {
                            label: 'Others',
                            backgroundColor:
                                    'rgba(0, 255, 0, 0.2)'
                            ,
                            borderColor:
                                    'rgba(0, 255, 9, 1)'
                            ,
                            hoverBackgroundColor:
                                    'rgba(0, 255, 0, 0.2)'
                            ,
                            hoverBorderColor: 'rgba(200, 200, 200, 1)',
                            data: [["Boxes", 56]],
                            order:2
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

