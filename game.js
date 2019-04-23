$("#look").click(function (e) {
    e.preventDefault();
    var name = $("#typeBaby").val().trim();
    $("#list").append(`<button class="baby-btn" style="margin-right:10px; margin-top:10px;" >${name}</button>`);
    $("#typeBaby").val("");

});