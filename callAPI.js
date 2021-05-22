var colArray = [
    [0, "false"],
    [1, "Type"],
    [2, "Number/Link"],
    [3, "Description"],
    [4, "State"],
    [5, "Location/City"],
    [6, "Remarks"],
    [7, "Assignee"]];

$(document).ready(function () {


    var t = $('#example').DataTable({

        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]],

        dom: 'Blfrtip',

        buttons: [
            {
                text: 'Delete',
                action: function ( e, dt, node, config ) {
                    alert( 'Button activated' );
                }
            },
            {
                text: 'Add',
                action: function ( e, dt, node, config ) {
                    alert( 'Button activated' );
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
                var fieldArr = new Array(8);
                for (i = 0; i < colArray.length; i++) {
                    if (typeof element.fields[colArray[i][1]] === 'undefined') {
                        fieldArr[i] = "";
                    } else {
                        fieldArr[i] = element.fields[colArray[i][1]];
                    }
                }
                t.row.add(fieldArr).draw(false);
            });

        }
    });


});