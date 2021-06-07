var stateOptions = {"Karnataka": "Karnataka", "Bhopal": "Bhopal"};

var colArray = [
    [0, ""],
    [1, ""],
    [2, "Case ID"],
    [3, "Timestamp"],
    [4, "123Volunteer Password"],
    [5, "Patient Data (Copy paste from the input patient data as is)"],
    [6, "Name of the Case Referrer (Copy from input patient data - not attendant name)"],
    [7, "Phone number of the Case Referrer (Copy from input patient data - not attendant number)"],
    [8, "Case Owner Name (123Volunteer)"],
    [9, "Case Owner Number (123Volunteer)"],
    [10, "Status"],
    [11, "Help Needed"],
    [13, "BU Number / Govt Patient ID"],
    [14, "SRF ID"],
    [15, "Attendant Name"],
    [16, "Attendant Number"],
    [17, "Attendant Alternate Number"],
    [18, "Patient Location (State/City/Area with PINCODE)"],
    [19, "Progress / Closure Log (Please add all steps/info copied here. Even if you are editing the submission, please add complete info.)"],
    [20, "Remarks on the request"],
    [21, "Update Link (Submit first time--> Right click copy the link of \"Edit your response --> Click \"Edit your response\"--> Add the link here and submit again)"]
];

var columnDefs = [{
    "visible": false,
    type: "hidden"
}, {
    "visible": false,
    type: "hidden"
}, {
    title: "Case ID"

}, {
    title: "Timestamp",
    type: "text"
}, {
    title: "123Volunteer Password"
    //no type = text
}, {
    title: "Patient Data (Copy paste from the input patient data as is)\""
    //no type = text
}, {
    title: "Name of the Case Referrer (Copy from input patient data - not attendant name)"
    //no type = text
}, {
    title: "Phone number of the Case Referrer (Copy from input patient data - not attendant number)"
    //no type = text
}, {
    title: "Case Owner Name (123Volunteer)"
    //no type = text
}, {
    title: "Case Owner Number (123Volunteer)"
    //no type = text
}, {
    title: "Status"
    //no type = text
}, {
    title: "Help Needed"
    //no type = text
}, {
    title: "BU Number / Govt Patient ID."
}, {
    title: "SRF ID"
}, {
    title: "Attendant Name",
    type: "text"
}, {
    title: "Attendant Number",
    type: "text"
}, {
    title: "Attendant Alternate Number"
    //no type = text
}, {
    title: "Patient Location (State/City/Area with PINCODE)",
    type: "text"
},{
    title: "Progress / Closure Log (Please add all steps/info copied here. Even if you are editing the submission, please add complete info.)",
    type: "text"
},{
    title: "Remarks on the request",
    type: "text"
},{
    title: "Update Link (Submit first time--> Right click copy the link of \"Edit your response --> Click \"Edit your response\"--> Add the link here and submit again)",
    type: "text"
}];

$(document).ready(function () {


    var t = $('#example').DataTable({

        /*columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0,
            type: "text"
        },
            {
                "targets": [1],
                "visible": false,
                "searchable": false,
                type: "text"
            }],*/
        columns: columnDefs,
        /*select: {
            style: 'multi',
            selector: 'td:first-child'
        },*/
        select: {
            style: 'single',
            toggleable: false
        },
        order: [[1, 'asc']],

        dom: 'Blfrtip',
        altEditor: true,     // Enable altEditor
        buttons: []
        /*buttons: [
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
        ]*/
    });

    // thumbs up
    $(document).on('click', "[id^='example'] .thumbsup", 'tr', function (x) {
        var tableID = $(this).closest('table').attr('id');    // id of the table
        var that = $('#' + tableID)[0].altEditor;
        var row = that.s.dt.rows({
            selected: true
        });

        // get thumbs up count
        var tuc = row.data()[0][9];
        tuc++;

        // update the backend row
        var xhr = new XMLHttpRequest();

        console.log(row); //DEBUG

        var url = 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Cases?api_key=key1TJZtE720NcvkV';
        xhr.open("PUT", url);

        //xhr.setRequestHeader("Authorization", "Bearer YOUR_API_KEY");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };

        var rowid = row.data()[0][1];
        var type = row.data()[0][2];
        var numlink = row.data()[0][3];
        var desc = row.data()[0][4];
        var state = row.data()[0][5];
        var loccity = row.data()[0][6];
        var remarks = row.data()[0][7];
        var assignee = row.data()[0][8];
        var tdc = row.data()[0][10];

        row.data()[0][9] = tuc;
        row.invalidate();
        that.s.dt.draw(false);


        var data = `{"records": [{"id": "${rowid}",
                     "fields": {
                       "Type": "${type}",
                       "Number/Link": "${numlink}",
                       "Description": "${desc}",
                       "State": "${state}",
                       "Location/City": "${loccity}",
                       "Remarks": "${remarks}",
                       "Assignee": "${assignee}",
                       "upvotes": ${tuc},
                       "downvotes": ${tdc}
                     }
                   }
                 ]
               }`;

        console.log(data);
        xhr.send(data);


        x.stopPropagation(); //avoid open "Edit" dialog
    });

    // thumbs down
    $(document).on('click', "[id^='example'] .thumbsdown", 'tr', function (x) {
        var tableID = $(this).closest('table').attr('id');    // id of the table
        var that = $('#' + tableID)[0].altEditor;
        var row = that.s.dt.rows({
            selected: true
        });

        // get thumbs down count
        var tdc = row.data()[0][10];
        tdc++;

        // update the backend row
        var xhr = new XMLHttpRequest();

        console.log(row); //DEBUG

        var url = 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Cases?api_key=key1TJZtE720NcvkV';
        xhr.open("PUT", url);

        //xhr.setRequestHeader("Authorization", "Bearer YOUR_API_KEY");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };

        var rowid = row.data()[0][1];
        var type = row.data()[0][2];
        var numlink = row.data()[0][3];
        var desc = row.data()[0][4];
        var state = row.data()[0][5];
        var loccity = row.data()[0][6];
        var remarks = row.data()[0][7];
        var assignee = row.data()[0][8];
        var tuc = row.data()[0][9];

        row.data()[0][10] = tdc;
        row.invalidate();
        that.s.dt.draw(false);

        var data = `{"records": [{"id": "${rowid}",
                     "fields": {
                       "Type": "${type}",
                       "Number/Link": "${numlink}",
                       "Description": "${desc}",
                       "State": "${state}",
                       "Location/City": "${loccity}",
                       "Remarks": "${remarks}",
                       "Assignee": "${assignee}",
                       "upvotes": ${tuc},
                       "downvotes": ${tdc}
                     }
                   }
                 ]
               }`;

        console.log(data);
        xhr.send(data);


        x.stopPropagation(); //avoid open "Edit" dialog
    });

    // Edit
    $(document).on('click', "[id^='example'] tbody ", 'tr', function () {
        var tableID = $(this).closest('table').attr('id');    // id of the table
        var that = $('#' + tableID)[0].altEditor;
        that._openEditModal();
        $('#altEditor-edit-form-' + that.random_id)
            .off('submit')
            .on('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();
                that._editRowData();
            });
    });


    $.ajax({
        url: 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Cases?maxRecords=1000&view=Grid%20view&api_key=key1TJZtE720NcvkV',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        /*beforeSend: function (xhr) {
            xhr.setRequestHeader("Authentication", "Basic ZnJvbWFwcGx********uOnRoM24zcmQ1UmgzcjM=") //Some characters have been replaced for security but this is a true BASE64 of "username:password"
        },*/
        success: function (data) {
            data.records.forEach(function (element, index) {
                //console.log("bed index : ", index);
                var fieldArr = new Array(21);
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

    // Delete
    $('#delbutton').on('click', function () {
        for (var i = 0; i < t.rows('.selected').data().length; i++) {
            console.log(t.rows('.selected').data()[i]);
            $.ajax({
                url: 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Cases?api_key=key1TJZtE720NcvkV&records[]=' +
                    t.rows('.selected').data()[i][1],
                type: 'DELETE',
                success: function (result) {
                    console.log('data deleted');
                }
            });
        }
        t.rows('.selected').remove().draw(false);
    });

    // Add row
    $('#addbutton').on('click', function () {
        var that = $('#example')[0].altEditor;
        that._openAddModal();
        $('#altEditor-add-form-' + that.random_id)
            .off('submit')
            .on('submit', function (e) {
                e.preventDefault();
                e.stopPropagation();
                that._addRowData();
            });
        that.s.dt.draw(false);
    });
});