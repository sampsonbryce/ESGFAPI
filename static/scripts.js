var searchurl = 'http://ec2-52-37-75-79.us-west-2.compute.amazonaws.com:5000/search';

var $loading = $('#loading-bar').hide();

$(document)
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $loading.hide();
    });

$(document).ready(function () {
    $('#loading-bar').hide();

    $('#add-button').click(function () {
        $('#filter').clone().appendTo('#filter');
    });

    $('#search-button').click(function () {
        search = {};
        search['project'] = $('#project option:selected').val();
        search['query'] = $('#query').val();
        search['model'] = $('#model').val();
        search['experiment'] = $('#experiment').val();
        search['realm'] = $('#realm').val();
        search['ensemble'] = $('#ensemble').val();
        var data = {};
        data['search'] = search;
        $.ajax({
            url: searchurl,
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            beforeSend: function (XMLHttpRequest) {
                var options = {
                    classname: 'my-class',
                    id: 'my-id'
                };

                var nanobar = new Nanobar(options);
                //Upload progress
                XMLHttpRequest.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with upload progress
                    }
                }, false);
                //Download progress
                XMLHttpRequest.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        //Do something with download progress
                        nanobar.go(percentComplete)
                    }
                }, false);
            },
            statusCode: {
                200: function (response) {
                    $('#results').empty();
                    var elem = $('<div />');
                    //elem = ('#results-combobox');
                    var data = JSON.parse(response);
                    console.log(data);

                    if (data == null) {
                        $('<p />', {text: "No Results Found"}).appendTo('#results');
                    }
                    else {
                        var list = data['cf_standard_name'];
                        console.log(list);

                        for (var val in list) {
                            console.log(val, $.type(val));
                            if (val != '') {
                                $('<p />', {text: val + "\tHITS:" + list[val]}).appendTo(elem);
                            }
                        }
                        elem.appendTo($('#results'));
                        var url_list = $('#urls');
                        var urls = data['urls'];
                        console.log(urls);
                        $(url_list).empty();
                        $.each(urls, function (index, value) {
                            console.log(value);
                            $('<a /> ', {href: value, text: value, class: "url-link"}).appendTo($(url_list));
                            $('<br />').appendTo(url_list)
                        });
                        $('#urls').append(url_list);
                    }
                },
                400: function (response) {
                    $('#results').empty();
                    $('<p />', {text: "No Results Found"}).appendTo('#results');
                },
                500: function (response) {
                    console.log('fail');
                }
            },
        });
    });
});

