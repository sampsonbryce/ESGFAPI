var url = 'http://ec2-52-37-75-79.us-west-2.compute.amazonaws.com:5000/search';
$(document).ready(function () {
    $('#search-button').click(function () {
        data = {};
        data['project'] = $('#project option:selected').val();
        data['query'] = $('#query').val();
        data['model'] = $('#model').val();
        data['experiment'] = $('#experiment').val();
                $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            statusCode: {
                200: function (response) {
                    $('#results').empty();
                    var elem = $('<select />');
                    //elem = ('#results-combobox');
                    var data = JSON.parse(response);
                    console.log(data);

                    if(data['_SearchContext__facet_counts'] == null) {
                       $('<p />', {text: "No Results Found"}).appendTo('#results');
                    }
                    else {
                        var list = data['_SearchContext__facet_counts']['cf_standard_name']
                        console.log(list)

                        for (var val in list) {
                            console.log(val, $.type(val));
                            $('<option />', {value: val, text: val + "\tHITS:" + list[val]}).appendTo(elem);
                        }
                        elem.appendTo($('#results'));
                    }
                },
                500: function (response) {
                    alert('fail');
                }
            },
        });
    });
});
