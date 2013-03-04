$(function () {
    randomQuestion();
});

function randomQuestion() {
    $.ajax({
        type: "POST",
        cache: false,
        url: "Default.aspx/GetRandomQuestion",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            showQuestion(JSON.parse(msg.d));
        }
    });
}

function showQuestion(question) {
    $("#questionContainer").text(question.question);
    var i = 1;
    $("#answersContainer").text("");
    for (answer in question.possibleAnswers) {
        var button = $(".option" + i);
        console.log(button);
        button.text(question.possibleAnswers[answer]);
        var eventData = { id: question.id, answer: question.possibleAnswers[answer], answerButton: button };
        button.unbind();
        button.click(eventData, answerClickFunction);
        i++;
        button.removeClass("wrongButton");
        button.removeClass("correctButton");
    }
}

function answerClickFunction(event) {
    playSound("assets/sounds/button.mp3");
    answerQuestion(event.data.id, event.data.answer, event.data.answerButton);
}

function answerQuestion(questionId, answer, answerSpan) {
    console.log("trying to answer with answer " + answer);
    var data = { questionId: questionId, answer: answer };
    var stringifiedData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: "Default.aspx/AnswerQuestion",
        data: stringifiedData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d == "True") {
                answerSpan.addClass("correctButton");
            }
            else {
                answerSpan.addClass("wrongButton");
            }
            setTimeout(randomQuestion, 1500);
        }
    });
}


function playSound(sound) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', sound);
    audioElement.play();
}

/** SET-UP **/
$.ajaxSetup({
    type: 'POST',
    headers: { "cache-control": "no-cache" }
});
