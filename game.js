//Variables to use

var APIKey = "IXHrCW7HbVSkilRoks118mHFZJi08MKa";
var limit = 10;

//initial array of disney giphys
var topics = ["Elsa", "Rapunzel", "Belle", "Cinderella", "Ariel", "Jasmine", "Anna", "Ursula", "Tigger", "Moana", "Megara", "Simba"];

var index = 0; // for empty search result 

var move = {}; // for still & moving 
var addPair = function (myKey, myValue) {
    move[myKey] = myValue;
};
var giveValue = function (myKey) {
    return move[myKey];
};

//when the images are clicked
$('body').on('click', 'img', function (e) {
    var imgObj = e.currentTarget;
    const imageid = imgObj.getAttribute('id');
    var moveValue = giveValue(imageid);
    if (moveValue === undefined || moveValue === null) {
        addPair(imageid, 0); //default which is still
    }
    moveValue = giveValue(imageid);

    //still to move
    if (moveValue === 0) {
        imgObj.setAttribute('src', imgObj.getAttribute('animateUrl'));
        addPair(imageid, 1);

        //move to still
    } else if (moveValue === 1) {
        imgObj.setAttribute('src', imgObj.getAttribute('stillUrl'));
        addPair(imageid, 0);
    }
});


//when the submit button is clicked
function displayDisney(searchedQuery) {
    index = 0;
    $("#graphics-view").empty();

    if (searchedQuery === undefined || searchedQuery === '' || searchedQuery === null) {
        searchedQuery = $("#giphy-input").val();
    }

    if (searchedQuery === '') {
        return;
    }

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchedQuery + "&api_key=" + APIKey + "&limit=" + limit;


    if (!(topics.map(function (item) { return item.toLowerCase() }).indexOf(searchedQuery.toLowerCase()) != -1)) {
        topics.push(searchedQuery);
        const buttonSearched = "<button style='margin-top:10px;' onClick=displayDisney('" + searchedQuery + "') type='button' class='btn btn-primary'>" + searchedQuery + "</button>";
        $("#buttons-view").append(buttonSearched).append('&nbsp;');
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(element => {
            index++;
            const gif_image_object = element.images;
            const gif_image_still_src = gif_image_object.original_still.url;
            const gif_image_anim_src = gif_image_object.original.url;
            const rating = element.rating;
            const imgid = element.id;
            $("#graphics-view").append(`${rating} ➡️  <img id=${imgid} animateUrl=${gif_image_anim_src} stillUrl=${gif_image_still_src} src=${gif_image_still_src} height='100' width='100' />`);
        });
        if (index === 0) { //if nothing was returned
            const buttonSearched = "<button onClick=displayDisney('" + searchedQuery + "') type='button' class='btn btn-secondary'>No Result Found For: " + searchedQuery + " </button>";
            $("#graphics-view").append(buttonSearched).append('&nbsp;');
        }
    });
    return false; //Using forms submit always return false so that the page would not refresh on Submit event
};


//when page is loaded shows the initial array displays
$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        const btnName = topics[i];
        const buttonSearched = "<button style='margin-top:10px;' onClick=displayDisney('" + btnName + "'); type='button' class='btn btn-primary'>" + btnName + "</button>";
        $("#buttons-view").append(buttonSearched).append('&nbsp;');
    }
});