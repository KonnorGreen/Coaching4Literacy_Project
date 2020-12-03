$(document).ready(function () {
    $.ajax({
        url: 'api/products',
        method: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {

            let combo = document.getElementById("combo");
            let option = document.createElement("option");
            option.text = "All Items";
            try {
                combo.add(option, null);
            } catch (error) {
                combo.add(option);
            }
            let categories = [];
            $.each(data, function (i, v) {
                categories.push(v.category);
            });
            categories = categories.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            for (let i = 0; i < categories.length; i++) {
                let option = document.createElement("option");
                option.text = categories[i];
                try {
                    combo.add(option, null);
                    combo.value(i, null);
                } catch (error) {
                    combo.add(option);
                }
            }

            try {
                let products = [];
                let quantities = [];
                let all_categories = [];
                $.each(data, function (i, v) {
                    all_categories.push(v.category);
                });

                let selection = $("#combo  option:selected").text();
                if (selection === "All Items") {
                    $.each(data, function (i, v) {
                        products.push(v.productName);
                        quantities.push(v.quantity);
                    });
                }

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
                let myChart = new Chart(ctx, {
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
                                        maintainAspectRatio: false,
                                        responsive: true
                                    }
                                }]
                        }
                    }
                });

                $("#combo").change(function () {
                    products = [];
                    quantities = [];
                    let selection = $("#combo  option:selected").text();

                    if (selection === "All Items") {
                        $.each(data, function (i, v) {
                            products.push(v.productName);
                            quantities.push(v.quantity);
                        });
                    } else if (all_categories.includes(selection)) {
                        $.each(data, function (i, v) {
                            if (selection === v.category) {
                                products.push(v.productName);
                                quantities.push(v.quantity);
                            }
                        });
                    }
                    chartdata = {
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
                    myChart.destroy();
                    myChart = new Chart(ctx, {
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
                                            maintainAspectRatio: false,
                                            responsive: true
                                        }
                                    }]
                            }
                        }
                    });
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
    for (i = 0; i < a; i++) {
        pool.push(dynamicColors());
    }
    return pool;
}

function SetSelectedValue() {
    let e = document.getElementById("combo");
    let selected_value = e.options[e.selectedIndex].value;
    console.log(selected_value);
    return selected_value;
}
  