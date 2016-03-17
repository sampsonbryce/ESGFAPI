var url = 'http://ec2-52-37-75-79.us-west-2.compute.amazonaws.com:5000/search';
data = {hello: 'hello world'}
$(document).ready(function() {
    $('#searchbutton).click(function() {
	    $.ajax({
		    url: url,
		    data: data,
		    type: 'POST',
		    statusCode: {
			    200: function(response) {
				    alert('success');
			    },
			    500: function(response) {
				    alert('fail');
			    }
		    },
	    });
    });
});
