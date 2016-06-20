var searchurl = 'http://ec2-52-37-75-79.us-west-2.compute.amazonaws.com:5000/search';
var constraints = {};

$(document).ready(function () {
    $(document).bind('keypress', function (e) {
        if (e.keyCode == 13) {
            $('#search-button').trigger('click');
        }
    });

    $('#add-button').click(function () {
        $('#filter').clone().insertAfter('#filter');
    });

    $('#search-button').click(function () {
        search = {};

        var query = $('#query-input').val();
        console.log(query);
        if (query != undefined && query != '') {
            search['query'] = query;
        }
        console.log(search);

        //add search count. TODO: get from dropdown
        search['results_count'] = 50;

        $('.search-param').each(function (index) {
            var param = $(this).find('select').val();
            var value = $(this).find('input').val();
            if (param != undefined && value != undefined && value != '') {
                search[param] = value;
            }
        });

        var data = {};
        data['search'] = search;
        $.ajax({
            xhr: function () {
                var options = {
                    classname: 'my-class',
                    id: 'my-id',
                };

                var nanobar = new Nanobar(options);
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total)*100)/2;
                        nanobar.go(percentComplete);
                    }
                }, false);
                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (((evt.loaded / evt.total) * 100)/2) + 50;
                        nanobar.go(percentComplete);
                    }
                }, false);
                return xhr;
            },

            url: searchurl,
            data: JSON.stringify(search),
            type: 'POST',
            contentType: 'application/json;charset=UTF-8',
            statusCode: {
                200: function (response) {
                    $('#results').empty();
                    var elem = $('<div />', {id: "results-subdiv"});

                    constraints = response['constraints'];
                    delete response['constraints'];

                    if (Object.keys(response).length === 0) {
                        $('<p />', {text: "No Results Found"}).appendTo('#results');
                    }
                    else {
                        $.each(response, function (key, obj) {
                            var title = obj['title'];
                            var info = $('</div />');
                            var links = $('</div />', {class:'third'});

                            console.log('appending info and links to elem');
                            info.appendTo(elem);
                            links.appendTo(elem);


                            //make it all pretty :p
                            if (title.indexOf(',') >= 0) {
                                console.log('good title');
                                var arr = title.split(',');
                                var title_elem = $('<span />');
                                $.each(arr, function (index, value) {
                                    var data = value.split('=');
                                    var name = data[0];
                                    //Capitalize
                                    name = name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                                        return letter.toUpperCase();
                                    });
                                    var value = data[1];
                                    if (index < arr.length - 1) {
                                        value += ', '
                                    }

                                    var name_elem = $('<span />', {text: name + ': '});
                                    name_elem.addClass('title-word');
                                    name_elem.appendTo(title_elem)
                                    $('<span />', {text: value, class: 'title-word'}).appendTo(title_elem);
                                });

                                title_elem.appendTo(info);
                            }
                            else {
                                console.log('bad title');
                                $('<div />', {text: title}).appendTo(info);
                            }

                            var button = $('<button />', {text: 'Script', class:'small-button', id:''});
                            $('<i />', {class:'fa fa-cloud-download dl-icon'}).prependTo(button);
                            button.appendTo(links);

                            console.log('appending hr to elem');
                            $('<hr />').appendTo(elem)
                        });
                        console.log('appending elem to results');
                        elem.appendTo($('#results'));
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
})
;

