// loader
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#custom-loader").style.visibility = "visible";
    } else {
        const cl = document.querySelector("#custom-loader");

        setInterval(function() {
            cl.style.visibility = "hidden";
        }, 1000);

        document.querySelector("body").style.visibility = "visible";
    }
};

// country api
// $.get('https://ipapi.co/country/', function(data) {

//     if (data.status == 429) {
//         $('#tt').attr("src", "public/img/flags/svg/us.svg");
//         $('#dtt').attr("src", "public/img/flags/svg/us.svg");

//     } else {

//         var dat = data.toLowerCase();
//         $('#tt').attr("src", "./public/img/flags/svg/" + dat + ".svg");
//         $('#dtt').attr("src", "../public/img/flags/svg/" + dat + ".svg");
//     }

// });

$.ajax({
    url: "https://ipapi.co/country/",
    crossDomain: true,
    success: function(data, textStatus, xhr) {
        var dat = data.toLowerCase();
        var myprotocol = document.location.protocol;
        var myhostname = document.location.host;

        $('#tt').attr("src", "./public/img/flags/svg/" + dat + ".svg");
        $('#dtt').attr("src", "" + myprotocol + "//" + myhostname + "/public/img/flags/svg/" + dat + ".svg");
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('#tt').attr("src", "public/img/flags/svg/us.svg");
        $('#dtt').attr("src", "" + myprotocol + "//" + myhostname + "public/img/flags/svg/us.svg");
    }
});

$(document).ready(function() {

    // button loader
    $("button[data-processing='true']").click(function() {
        // disable button
        $(this).prop("disabled", true);
        // add spinner to button
        $(this).html(
            `<span style="width: 1.3rem; height: 1.3rem;" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
        );
        this.form.submit();
    })

});

// navbar
$('#app-sidebar-overlay').on('click', function() {
    // hide sidebar
    $('#app-sidebar').removeClass('active');
    // hide overlay
    $('#app-sidebar-overlay').removeClass('active');
});

$('#app-sidebar-toggle').on('click', function() {
    // open sidebar
    $('#app-sidebar').addClass('active');
    // fade in the overlay
    $('#app-sidebar-overlay').addClass('active');

});

// header
const header = document.getElementById('sticky-nav');
addClassHeader = () => {
    header.classList.add("nav-translucent");
}

removeClassHeader = () => {
    header.classList.remove("nav-translucent");
}

window.addEventListener('scroll', function() {
    var myprotocol = document.location.protocol;
    var myhostname = document.location.host;
    var brand = document.getElementById('branding');
    let getScrollposition = window.scrollY;

    if (getScrollposition > 0) {
        addClassHeader();
        brand.src = "" + myprotocol + "//" + myhostname + "public/img/logo/oraimo-dark.png";
    } else {
        removeClassHeader();
        brand.src = "" + myprotocol + "//" + myhostname + "public/img/logo/oraimo-light.png";
    }
});

var doughnut = document.getElementById("yy").innerHTML;
doughnut = doughnut.replace(/\D/g, '');
interval = Math.floor(Math.random() * (40000 - 8000 + 1) + 8000);

window.setInterval(
    function() {
        doughnut = +doughnut + 1;
        formatted = new Intl.NumberFormat().format(doughnut);
        document.getElementById("yy").innerHTML = formatted;

    }, interval);