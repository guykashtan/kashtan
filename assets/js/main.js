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
        var eventData = { id: question.id, answer: question.possibleAnswers[answer], answerButton: button, correctAnswer: question.correctAnswer };
        button.click(eventData, answerClickFunction);
        i++;
        button.removeClass("wrongButton");
        button.removeClass("correctButton");
    }
}

function answerClickFunction(event) {

    $(".optionButtons").unbind();
    answerQuestion(event.data.id, event.data.answer, event.data.answerButton, event.data.correctAnswer);
}

function answerQuestion(questionId, answer, answerSpan, correctAnswer) {
    console.log("trying to answer with answer " + answer);
    if (answer == correctAnswer) {
        
        
        answerSpan.addClass("correctButton");
        
        
        $(function () {
            playCoinSound();
        });
    }
    else {
        
        
        answerSpan.addClass("wrongButton");
        $(".optionButtons:contains('" + correctAnswer + "')").addClass("correctButton");
        
        $(function () {
            playButtonSound();
        });
        

    }
    setTimeout(randomQuestion, 750);
}


function playButtonSound() {
    $(".buttonClickPlayer")[0].play();
}

function playCoinSound() {
    $(".coinSound")[0].play();
}


/** SET-UP **/
$.ajaxSetup({
    type: 'POST',
    headers: { "cache-control": "no-cache" }
});
