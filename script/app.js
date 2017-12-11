'use strict';

var prevJoke = [];
var currentJoke = -1;
var countJoke = 0;

$(document).ready(function () {

    $('span').hide();
    $('#btn__previous').hide();
    $('#btn__next').hide();

    $("#btn__random").click(function () {
        getJoke();
        changeImages();

        $('span').show();
        
        $('#btn__previous').show();

        $('#div__textballoon').textfill({
            explicitHeight: 100
        });
        currentJoke += 1;
        countJoke += 1;
    });

    $("#btn__previous").click(function () {
        changeImages();
        $('#btn__next').show();

        currentJoke = (countJoke + currentJoke - 1) % countJoke;
        $("#div__textballoon").text(prevJoke[currentJoke]);
        var lengthJoke = prevJoke[currentJoke].length;
        adaptTextsize(lengthJoke);

        $('span').show();

        $('#div__textballoon').textfill({
            explicitHeight: 100
        });
    });

    $("#btn__next").click(function () {
        changeImages();

        $('#btn__next').show();

        currentJoke = (currentJoke + 1);
        $("#div__textballoon").text(prevJoke[currentJoke]);
        var lengthJoke = prevJoke[currentJoke].length;
        adaptTextsize(lengthJoke);

        $('span').show();

        $('#div__textballoon').textfill({
            explicitHeight: 100
        });
    });
});

function changeImages() {
    var bgImages = ['BG_Trump.jpg', 'BG_SteveJobs.jpg', 'BG_MrBean.jpg', 'BG_SheldonCooper.jpg', 'BG_BartDePauw.jpg'];
    var fgImages = ['FG_Trump.png', 'FG_SteveJobs.png', 'FG_MrBean.png', 'FG_SheldonCooper.png', 'FG_BartDePauw.png'];

    var index = Math.floor(Math.random() * bgImages.length);
    var randomBgImage = bgImages[index];
    var randomFgImage = fgImages[index];

    $('body, html').css({
        'background': 'url(media/' + randomBgImage + ') no-repeat center center fixed',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
    });

    $('#img__chucknorris__pic').attr('src', 'media/' + randomFgImage);
}

function  getJoke() {
    var categories = ["explicit","dev","movie","food","celebrity","science","political","sport","religion","animal","music","history","travel","career","money","fashion"];
    var index = Math.floor(Math.random() * categories.length);
    var currCategory = categories[index];

    $.getJSON('https://api.chucknorris.io/jokes/random?category=' + currCategory, function(json) {
        var lengthValue = json.value.length;
        prevJoke.push(json.value);
        adaptTextsize(lengthValue);

        $("#div__textballoon").text(json.value);

        $('#category').attr('data-tooltip', capitalizeFirstLetter(currCategory));
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function adaptTextsize(length){
    var textballoon = document.getElementById("div__textballoon");

    if(length <= 60){
        textballoon.className = "div__textballoon__kleine";
    } else if(length <= 140) {
        textballoon.className = "div__textballoon__grote";
    } else if(length <= 240) {
        textballoon.className = "div__textballoon__superdupergrote";
    } else {
        textballoon.className = "div__textballoon__superduperdupergrote";
    }
}