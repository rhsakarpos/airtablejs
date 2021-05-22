var colArray = [
    [0, ""],
    [1, "Id"],
    [2, "Type"],
    [3, "Number/Link"],
    [4, "Description"],
    [5, "State"],
    [6, "Location/City"],
    [7, "Remarks"],
    [8, "Assignee"]];

$(document).ready(function () {


    var t = $('#example').DataTable({

        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        },
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            }],
        select: {
            style: 'multi',
            selector: 'td:first-child'
        },
        order: [[1, 'asc']],

        dom: 'Blfrtip',

        buttons: [
            {
                text: 'Delete',
                action: function (e, dt, node, config) {
                    for (var i = 0; i < t.rows('.selected').data().length; i++) {
                        console.log(t.rows('.selected').data()[i]);
                        $.ajax({
                            url: 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Beds?api_key=key1TJZtE720NcvkV&records[]=' +
                                t.rows('.selected').data()[i][1],
                            type: 'DELETE',
                            success: function (result) {
                                console.log('data deleted');
                            }
                        });
                    }
                    t.rows('.selected').remove().draw(false);
                }
            },
            {
                text: 'Add',
                action: function (e, dt, node, config) {
                    alert('Button activated');
                }
            }
        ]
    });


    $.ajax({
        url: 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Beds?maxRecords=3&view=Grid%20view&api_key=key1TJZtE720NcvkV',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        /*beforeSend: function (xhr) {
            xhr.setRequestHeader("Authentication", "Basic ZnJvbWFwcGx********uOnRoM24zcmQ1UmgzcjM=") //Some characters have been replaced for security but this is a true BASE64 of "username:password"
        },*/
        success: function (data) {
            data.records.forEach(function (element, index) {
                console.log("bed index : ", index);
                var fieldArr = new Array(9);
                for (i = 0; i < colArray.length; i++) {

                    if (i === 1) {
                        fieldArr[i] = element.id;
                    } else {
                        if (typeof element.fields[colArray[i][1]] === 'undefined') {
                            fieldArr[i] = "";
                        } else {
                            fieldArr[i] = element.fields[colArray[i][1]];
                        }
                    }
                }
                t.row.add(fieldArr).draw(false);
            });

        }
    });


});