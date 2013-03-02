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
        var clone = $(".templates .answerContainer").clone();
        var cloneSpanAnswer = clone.find(".answer");
        cloneSpanAnswer.text(i + ". " + question.possibleAnswers[answer]);
        $("#answersContainer").append(clone);
        var eventData = { id: question.id, answer: question.possibleAnswers[answer], answerSpan: cloneSpanAnswer};
        clone.click(eventData, answerClickFunction);
        i++;
    }
}

function answerClickFunction(event) {
    answerQuestion(event.data.id, event.data.answer, event.data.answerSpan);
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
                answerSpan.addClass("correctAnswer");
            }
            else {
                answerSpan.addClass("wrongAnswer");
            }
            setTimeout(randomQuestion, 1500);
        }
    });
}