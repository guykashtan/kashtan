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
        
        $("#answers").append(i + ". " + question.possibleAnswers[answer] + "<br />");
        i++;
    }
    
}
