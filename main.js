$(document).ready(function() {
    $("#container-navbar__burgerIcon").click(function() {
        navMobileView();
    });

    $(document.body).mouseup(function(element) {
        if ((!$(element.target).hasClass('container-navbar__burgerIcon')) && (!$(element.target).hasClass('container-navbar__options__link'))) {
            $(".container-navbar__options").removeClass("container-navbar__expand")
        }
    });

    $.ajax({
        url: "https://personal-website-justin.herokuapp.com/briefDescription/",
        success: function(brief) {
            IntroPageBrief(brief);
        }
    });

    $(".container-introPage__sideMenu__content").click(function() {
        TagContentSelector(this);
    });
});

function navMobileView() {
    if ($(".container-navbar__options").hasClass("container-navbar__expand")) {
        //console.log("YES");
        $(".container-navbar__options").removeClass("container-navbar__expand")
    } else {
        //console.log("NO");
        $(".container-navbar__options").addClass("container-navbar__expand")
    }

    $(".container-navbar__options__buttons").each(function(index, listItem) {
        //console.log(`div${index}: ${this.id}`);

        if (!$("#" + this.id).is(":animated")) {
            $("#" + this.id).animate({
                opacity: '1',
                transform: 'translateX(0%)'
            }, 3000);
        }
    })
};

function IntroPageBrief(brief) {
    brief.map(briefDescription => {
        //console.log(briefDescription.content)
        $('#briefIntro').text(briefDescription.content)
    })
}

function TagContentSelector(entity) {
    if (entity.id == ("firstTag")) {
        $(".container-introPage__aboutTag").children().show();
        $(".container-introPage__eduTag").children().empty();
        $(".container-introPage__expTag").children().empty();
        $(".container-introPage__codeTag").css("display", "none");
    } else if (entity.id == ("eduTag")) {
        $.ajax({
            url: "https://personal-website-justin.herokuapp.com/education/",
            success: function(eduHistory) {
                $(".container-introPage__aboutTag").children().hide();
                $(".container-introPage__eduTag").children().empty();
                $(".container-introPage__expTag").children().empty();
                $(".container-introPage__codeTag").css("display", "none");
                eduHistory.map(education => {
                    $("#eduList").append("<li class='container-introPage__eduTag__item__title'>" + education.title + "</li> \
                    <li class='container-introPage__eduTag__item__description'>" + education.description + "</li> \
                    <li class='container-introPage__eduTag__item__detail'>" + education.detailedDescription + "</li>")
                })
            }
        })
    } else if (entity.id == ("expTag")) {
        $.ajax({
            url: "https://personal-website-justin.herokuapp.com/experience/",
            success: function(workExp) {
                $(".container-introPage__aboutTag").children().hide();
                $(".container-introPage__eduTag").children().empty();
                $(".container-introPage__expTag").children().empty();
                $(".container-introPage__codeTag").css("display", "none");
                workExp.map(experience => {
                    $("#expList").append("<li class='container-introPage__expTag__item__company'>" + experience.company + "</li> \
                    <li class='container-introPage__expTag__item__duration'>" + experience.duration + "</li> \
                    <li class='container-introPage__expTag__item__title'>" + experience.title + "</li> \
                    <li class='container-introPage__expTag__item__duty'>" + experience.duty + "</li>")
                })
            }
        })
    } else if (entity.id == ("codeTag")) {
        $(".container-introPage__aboutTag").children().hide();
        $(".container-introPage__eduTag").children().empty();
        $(".container-introPage__expTag").children().empty();
        $(".container-introPage__codeTag").css("display", "flex");
    }
}