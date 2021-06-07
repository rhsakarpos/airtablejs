var stateOptions = {"Karnataka": "Karnataka", "Bhopal": "Bhopal"};

var colArray = [
    [0, ""],
    [1, "Id"],
    [2, "Type"],
    [3, "Number/Link"],
    [4, "Description"],
    [5, "State"],
    [6, "Location/City"],
    [7, "Remarks"],
    [8, "Assignee"],
    [9, "upvotes"],
    [10, "downvotes"]
];

var columnDefs = [{
    title: "",
    "visible": false,
    type: "hidden"
}, {
    title: "Id",
    "visible": false,
    type: "hidden"
}, {
    title: "Type",
    "visible": false,
    type: "text"
}, {
    title: "Number/Link"
    //no type = text
}, {
    title: "Description.",
    type: "text"
}, {
    title: "State",
    type: "select",
    options: stateOptions,
    select2: {width: "100%"},
    render: function (data, type, row, meta) {
        if (data == null || !(data in stateOptions)) return null;
        return stateOptions[data];
    }
}, {
    title: "Location/City",
    type: "text"
}, {
    title: "Remarks",
    type: "text"
}, {
    title: "Assignee",
    type: "text"
},
    {
        title: "upvotes",
        render: function (data, type, row, meta) {
            if (type == "sort" || type == 'type')
                return data;
            return `<a class="thumbsup fa fa-thumbs-o-up btn" href="#"> ${data}</a>`;
        },
        type: "hidden"
    },
    {
        title: "downvotes",
        render: function (data, type, row, meta) {
            if (type == "sort" || type == 'type')
                return data;
            return `<a class="thumbsdown fa fa-thumbs-o-down btn" href="#"> ${data}</a>`;
        },
        type: "hidden"
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

        var url = 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Beds?api_key=key1TJZtE720NcvkV';
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

        var url = 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Beds?api_key=key1TJZtE720NcvkV';
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
        url: 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Beds?maxRecords=1000&view=Grid%20view&api_key=key1TJZtE720NcvkV',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json",
        /*beforeSend: function (xhr) {
            xhr.setRequestHeader("Authentication", "Basic ZnJvbWFwcGx********uOnRoM24zcmQ1UmgzcjM=") //Some characters have been replaced for security but this is a true BASE64 of "username:password"
        },*/
        success: function (data) {
            data.records.forEach(function (element, index) {
                //console.log("bed index : ", index);
                var fieldArr = new Array(11);
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
                url: 'https://api.airtable.com/v0/appYhaaeNjkSNvTiw/Beds?api_key=key1TJZtE720NcvkV&records[]=' +
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
        var that = $( '#example' )[0].altEditor;
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