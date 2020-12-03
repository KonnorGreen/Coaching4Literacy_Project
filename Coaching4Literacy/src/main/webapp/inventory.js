$(document).ready(function () {
    $.ajax({
        url: 'api/products',
        type: 'get',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success: function (data) {
            let table_data = '';
            $.each(data, function (i, v) {
                table_data += '<tr>';
                table_data += '<td>' + v.category + '</td>';
                table_data += '<td>' + v.productName + '</td>';
                table_data += '<td>' + v.quantity + '</td>';
                table_data += '<td><button class="delButton" id="delete' + i + '"><i class="fas fa-trash-alt"></i></button><button class="editButton" id="edit' + i + '"><i class="fas fa-edit"></i></button></td></tr>';
            });
            $('#invTable').append(table_data);
            $('#invTable').DataTable({
                dom: 'Bfrtipl',
                buttons: [
                    {
                        extend: 'print',
                        text: 'Print Table',
                        className: 'btn btn-success',
                        exportOptions: {
                            columns: 'th:not(:last-child)'
                        }
                    },
                    {
                        extend: 'pdf',
                        text: 'Download PDF',
                        exportOptions: {
                            columns: 'th:not(:last-child)'
                        }
                    },
                    {
                        extend: 'csv',
                        text: 'Download CSV',
                        exportOptions: {
                            columns: 'th:not(:last-child)'
                        }
                    },
                    {
                        extend: 'excel',
                        text: 'Download Excel',
                        exportOptions: {
                            columns: 'th:not(:last-child)'
                        }
                    },
                    {
                        text: 'Add Item',
                        className: 'btn btn-success',
                        action: function () {
                            (async () => {
                        const {value: formValues} = await Swal.fire({
                            title: 'Add Item',
                            icon: 'info',
                            width: '500px',
                            showCancelButton: true,
                            html:
                                    '<label>Category</label><input id="category" class="swal2-input" placeholder="Category"required>' +
                                    '<label>Name</label><input id="productName" class="swal2-input" placeholder="Name" required>' +
                                    '<label>Quantity</label><input id="quantity" class="swal2-input" placeholder="Quantity" required>',
                            focusConfirm: false,
                            preConfirm: () => {
                                return [
                                    document.getElementById('category').value,
                                    document.getElementById('productName').value,
                                    document.getElementById('quantity').value
                                ];
                            }
                        });
                        if (formValues) {
                            let category = JSON.stringify(formValues[0]).slice(1, -1);
                            let productName = JSON.stringify(formValues[1]).slice(1, -1);
                            let quantity = JSON.stringify(formValues[2]).slice(1, -1);
                            $.post('Products', {category, productName, quantity}, function (result) {
                            });
                            location.reload();
                        }

                    })();
                        }
                    }

                ]
            });
            $(".buttons-html5").addClass("btn");
            $(".buttons-html5").addClass("btn-success");
            $.each(data, function (i, v) {
                const swal = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-danger',
                        cancelButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                });
                $("body").delegate("#delete" + i, "click", function () {
                    swal.fire({
                        title: "Confirm Action",
                        text: "Once deleted, you will not be able to recover Product Name: " + v.productName + ", #: " + v.quantity + ".",
                        icon: "warning",
                        width: '700px',
                        showCancelButton: true,
                        confirmButtonText: 'Delete'

                    })
                            .then((willDelete) => {
                                if (willDelete.isConfirmed) {
                                    $.ajax({
                                        url: 'api/products/' + v.id,
                                        type: 'DELETE',
                                        dataType: 'json',
                                        success: function () {
                                            location.reload();
                                        },
                                        error: function () {
                                            console.log(data[i]);
                                            alert('Error occured!');
                                        }
                                    });
                                }
                            });
                });
                $("body").delegate("#edit" + i, "click", function () {
                    (async () => {
                        const {value: formValues} = await Swal.fire({
                            title: 'Edit Fields',
                            icon: 'info',
                            width: '500px',
                            showCancelButton: true,
                            html:
                                    '<label>Category</label><input id="category1" class="swal2-input" value="' + v.category + '" required>' +
                                    '<label>Name</label><input id="productName1" class="swal2-input" value="' + v.productName + '"required>' +
                                    '<label>Quantity</label><input id="quantity1" class="swal2-input" value="' + v.quantity + '"required>',
                            focusConfirm: false,
                            preConfirm: () => {
                                return [
                                    document.getElementById('category1').value,
                                    document.getElementById('productName1').value,
                                    document.getElementById('quantity1').value
                                ];
                            }
                        });
                        if (formValues) {
                            let category1 = JSON.stringify(formValues[0]).slice(1, -1);
                            let productName1 = JSON.stringify(formValues[1]).slice(1, -1);
                            let quantity1 = JSON.stringify(formValues[2]).slice(1, -1);
                            $.post('Edit', {id: v.id, category: category1, productName: productName1, quantity: quantity1}, function (result) {
                                alert('Value changed.');
                            });
                            location.reload();
                        }

                    })();
                });
            });
        },
        error: function ()
        {
            alert('Network Communication Error!');
        }
    });
});