$(function () {
    $.ajax({
        type: "POST",
        url: "Default.aspx/GetRandomQuestion",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            showQuestion(JSON.parse(msg.d));
        }
    });

});

function showQuestion(question) {
    $("#question").append(question.question);
    var i = 1;
    for (answer in question.possibleAnswers) {
        var clone = $(".templates .answer").clone();
        clone.text(i + ". " + question.possibleAnswers[answer]);
        $("#answers").append(clone);
        var eventData = {id : question.id, answer : question.possibleAnswers[answer]};
        clone.click(eventData, answerClickFunction);
        i++;
    }
}

function answerClickFunction(event) {
    answerQuestion(event.data.id, event.data.answer);
}

function answerQuestion(questionId, answer) {
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
            alert(msg.d);
        }
    });
}