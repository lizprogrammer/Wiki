    function link() {
        var link_s = document.getElementById('link_id').value;
        document.getElementById('link_str').innerHTML = link_s.link()
      //  window.open("https://en.wikipedia.org/wiki/" + link_s)

        console.log(link_s);

        //$.getJSON('https://en.wikipedia.org/w/api.php?action=query&format=json&limit=15&callback=?&titles=' + link_s, processResult);

        $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=15&search=' + link_s, processResult);


        //$.getJSON('http://en.wikipedia.org/w/api.php?action=parse&format=json&callback=?', {page:link_s, prop:'text|images', uselang:'en'}, wikipediaHTMLResult);

        //callWikipediaAPI('link_s');

    }

var wikipediaHTMLResult = function(data) {
    var readData = $('<div>' + data.parse.text["*"] + '</div>');
    // handle redirects


    var redirect = readData.find('li:contains("REDIRECT") a').text();

    console.log(redirect);

    if(redirect != '') {
    	callWikipediaAPI(redirect);
        return;
    }

    //console.log(data.parse.text["*"]);

    var box = readData.find('.infobox');

    var binomialName    = box.find('.binomial').text();
    var fishName        = box.find('th').first().text();
    var imageURL        = null;
    // Check if page has images
    if(data.parse.images.length >= 1) {
        imageURL        = box.find('img').first().attr('src');
    }

    $('#insertTest').append('<div><img src="'+ imageURL + '"/>'+ fishName +' <i>('+ binomialName +')</i></div>');
};





    function link2() {
        var link_s = document.getElementById('link_id').value;
        document.getElementById('link_id').value = link_s + " Good Job!"

        $('#btn').click(function() {
            $.ajax({
                url: 'http://en.wikipedia.org/w/api.php',
                data: { action: 'query', list: 'search', srsearch: $("input[name=Wikipedia]").val(), format: 'json' },
                dataType: 'jsonp',
                success: processResults
            });

        });

       window.open("https://en.wikipedia.org/wiki/Special:Random");

        //console.log(link_s);
    }


function processResult(apiResult){

    console.log(apiResult);

    //console.log(apiResult.query);
    //console.log(apiResult.query.pages.pageid);
    document.getElementById('insertTest').innerHTML = "Paragraph changed!";

     for (var i = 0; i < apiResult[1].length; i++){
          $('#insertTest').append('<p><a href = ' + apiResult[3][i] + ' target="_blank">' +apiResult[1][i] + '</a></p>');
          console.log(apiResult[1][i]);
          //console.log(apiResult[2][i]);
          console.log(apiResult[3][i]);
          //document.getElementById('insertTest').innerHTML = apiResult[1][i];

     }
  }