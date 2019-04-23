//Variables to use
var APIKey = "IXHrCW7HbVSkilRoks118mHFZJi08MKa";
var limit = 10;
var keyword = $("#typeBaby").val().trim();


$('body').on('click', 'img', function (e) {
    var imgObj = e.currentTarget;
    imgObj.setAttribute('src', imgObj.getAttribute('animateurl'));
});

$("#look").click(function (e) {
    e.preventDefault();
    var name = $("#typeBaby").val().trim();
    $("#list").append(`<button class="baby-btn" style="margin-right:10px; margin-top:10px;" >${name}</button>`);
    $("#typeBaby").val("");

    //use our AJAX Call
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + APIKey + "&limit=" + limit;
    $.ajax(
        {
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var data = response.data;
            $(data).each(function (i, value) {
                var imageId = value.id,
                    imageUrlStill = value.images.original_still.url,
                    imageUrlAnim = value.images.original.url,
                    rating = value.rating;
                $("#graphics").append(`${rating}<img animateUrl=${imageUrlAnim} src=${imageUrlStill} height="100" width="100">`);

            });

        });



});





