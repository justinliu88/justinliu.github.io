$(document).ready(function() {
    $.ajax({
        url: "https://justin-course-project.herokuapp.com/course",
        success: function(courses) {
            cardFunction(courses);
        }
    });

    $.ajax({
        url: "https://yushi-food-api.herokuapp.com/people",
        success: function(people) {
            nameTagFunction(people);
        }
    });

    $("#display-forum__result").click(function() {
        //console.log($("#result-forum").css('display'))
        if ($("#result-forum").css('display') == "none") {
            $("#result-forum").slideToggle();
        };

    });

    $(document.body).mouseup(function(element) {
        //console.log($("#result-forum").css('display'))
        if ($("#result-forum").css('display') == "block") {
            if (!$(element.target).is("#display-forum__result")) {
                $("#result-forum").slideToggle("slow");
            }
        }
    });
});

function cardFunction(courses) {
    courses.map(course => {
        console.log(course.id)
        $('#cardsContainer').append('<div class="card"> \
        <a id=' + course.id + ' class="card-color" href="#courseDetail"\
        onclick="cardDescription(\'' + course.id + '\')"> </a> \
        <div class="card-content"> \<h2>' + course.title + '</h2> \
        <div class="card-content__other"> \
        <div class="card-content__other--text">' + course.description + '</div> \
        <button class="card-button">+</button></div></div></div>');
        $("#" + course.id).css('background', course.color)
    })
};

function nameTagFunction(people) {
    people.map(item => {
        $("#nameCard").append("<div class='container-card__content__individual'> \
        <div class='container-name__banner'> \
        <h3>" + item.title + "" + '&nbsp' + "" + item.name + "</h3></div> \
        <div class='container-namecard'> \
        <div id=" + item.id + " class='container-namecard__color'></div> \
        <div class='container-namecard__content'> \
        <p>" + item.username + "</p> </div> </div></div></div>");
        $("#" + item.id).css('background', item.color)
    })
};

function cardDescription(detail) {
    $.ajax({
        url: "https://justin-course-project.herokuapp.com/course/" + detail,
        success: function(detailPage) {
            $(".container-card__detail").remove();
            $(".container-main").after("<div id='courseDetail' class='container-card__detail'> \
            <div class = 'card-detail__color'> </div> \
            <div class = 'card-detail__content'> \
            <div class = 'card-detail__title'> " + detailPage.title + " </div> \
            <div class = 'card-detail__description' > " + detailPage.detailDescription + " </div> \
            </div> </div>");
            $('#courseDetail').css('background', detailPage.color);
            var color = detailPage.color;
            // console.log(color)
            // console.log(color.localeCompare("black"))
            if ((color.localeCompare("black") == 0) || (color.localeCompare("red") == 0)) {
                $('.card-detail__title').css('color', 'white')
                $('.card-detail__description').css('color', 'white')
            } else if (color.localeCompare("white") == 0) {
                $('.card-detail__title').css('color', 'black')
                $('.card-detail__description').css('color', 'black')
            }
        }
    })
};

function displayValueAll() {
    var title = $("#input-title").val();
    $("#result-title").html(title);
    var description = $("#input-description").val();
    $("#result-description").html(description);
    var category = $("#input-category").val();
    $("#result-category").html(category);
    var color = $("#input-color").val();
    $("#result-color").html(color);
    var detailedDescription = $("#input-detailed-description").val();
    $("#result-detailed-description").html(detailedDescription);
    var user = $('input[name=user]:checked').val()
    $("#result-user").html(user);

    $.post("https://justin-course-project.herokuapp.com/course", {
        "title": title,
        "description": description,
        "detailDescription": "un phénomène inexpliqué et inexplicable que personne n’a sans doute oublié. Sans parler des rumeurs qui agitaient les populations des ports et surexcitaient l’esprit public à l’intérieur des continents, les gens de mer furent particulièrement émus. ",
        "color": color
    })
}