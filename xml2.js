$(function () {

  //  var Feed = require('rss-to-json');
 /*
    Feed.load('https://medium.com/feed/@nqx', function(err, rss){
        console.log(JSON.stringify(rss, null, 3));
    });
    */
 

    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var data = {
            rss: 'https://medium.com/feed/@coqqos'
        };


        $.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.boxingnews24.com%2Ffeed%2F',
            data,
            function (response) {
                if (response.status == 'ok') {
                   
                    var display = '';
                    $.each(response.items, function (k, item) {
                        display +=
                            `<div class="card mb-3 mx-auto mr-5 " style="width: 20rem; height: 425px; border: none;">`;
                        var src = item["thumbnail"]; // use thumbnail url

                        display +=
                            `<div class="red-heading">
                                <h5 class="card-title"><a class="white" href="${item.link}">${item.title}</a></h5>
                            </div>`;

                        display +=
                            //`<img src="${src}" class="card-img-top" alt="Cover image">`;
                            `<div style="background-image: url(${src}); width: 100%; height: 50%; background-size: cover;"></div>`
                            

                        display += `<div class="card-body">`;
                        
                        var yourString = item.description.replace(/<img[^>]*>/g,
                        ""); //replace with your string.
                        

                        yourString = yourString.replace('h4', 'p');
                        yourString = yourString.replace('h3', 'p');
                            console.dir(item)
                        display += `<p style="text-decoration: none; font-size: 12px;">${item.pubDate.replaceAll('-','/').slice(0,-3)}</p>`;

                        var maxLength =
                        120; // maximum number of characters to extract
                        //trim the string to the maximum length
                        var trimmedString = yourString.substr(0, maxLength);
                        //re-trim if we are in the middle of a word
                        trimmedString = trimmedString.substr(0, Math.min(
                            trimmedString.length, trimmedString.lastIndexOf(
                                " ")))
                        display += `<p class="card-text">${trimmedString}...</p>`;

                        display +=
                            `<a href="${item.link}" target="_blank" class="btn btn-outline-danger" >Read More</a>`;
                        display += '</div></div>';
                        return k < 10;
                    });

                    resolve($content.html(display));
                }
            });
    });

    mediumPromise.then(function () {
        //Pagination
        pageSize = 4;

        var pageCount = $(".card").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(
                `<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".card").hide();
            $(".card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});