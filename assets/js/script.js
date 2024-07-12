let eventDate = new Date("2024-10-14");
let intervalID;
let oldMessage = "";

$("document").ready(function () {
  intervalID = setInterval(timerCountdown, 1000);
  $(".details__singer p").each(function (index, element) {
    if (index == 0) {
      $(this).slideDown(500);
    } else {
      $(this).slideUp(0);
    }
  });
});

$(".home__sidenav-button").on("click", function () {
  $(":root").css({ "--sidenav-width": "15.625rem" });
});

$(".home__sidenav-close-button").on("click", function () {
  $(":root").css({ "--sidenav-width": "0" });
});

$(".details__singer h2").on("click", function () {
  $(this).next().slideToggle(500);
  $(".details__singer p")
    .not($(this).next())
    .each(function () {
      $(this).slideUp(500);
    });
});

$(".home__sidenav a").on("click", function (e) {
  $("html, body").animate(
    {
      scrollTop: $($(e.target).attr("href")).offset().top,
    },
    600,
    "swing"
  );
});

function timerCountdown() {
  let currentDate = new Date();

  let dateDifference = eventDate - currentDate;

  if (dateDifference <= 0) {
    $(".duration__expired").css({ opacity: "1" });
    clearInterval(intervalID);
    return;
  }

  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let days = Math.floor(dateDifference / day);
  let hours = Math.floor((dateDifference % day) / hour);
  let minutes = Math.floor((dateDifference % hour) / minute);
  let seconds = Math.floor((dateDifference % minute) / second);

  $(".duration__time-container-day").html(days + "D");
  $(".duration__time-container-hour").text(hours + "h");
  $(".duration__time-container-minute").text(minutes + "m");
  $(".duration__time-container-second").text(seconds + "s");
}

$(".contact__message-field").on("input", function () {
  let numberOfCharacters = Number($(".characters-remaining").text());

  if (numberOfCharacters > 0 && $(this).val().length > oldMessage.length) {
    $(".characters-remaining").text(
      String(numberOfCharacters - ($(this).val().length - oldMessage.length))
    );
    oldMessage = $(this).val();
  } else {
    $(".characters-remaining").text(
      String(numberOfCharacters + (oldMessage.length - $(this).val().length))
    );
    oldMessage = $(this).val();
  }
});
