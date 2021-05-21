var colArray = [
    [0, "Type"],
    [1, "Number/Link"],
    [2, "Description"],
    [3, "State"],
    [4, "Location/City"],
    [5, "Remarks"],
    [6, "Assignee"]];

$(document).ready(function () {


    var t = $('#example').DataTable();

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
                var fieldArr = new Array(7);
                for(i=0; i<colArray.length; i++)
                {
                    fieldArr[i] = element.fields[colArray[i][1]];
                }
                t.row.add(fieldArr).draw( false );
            });

        }
    });



});