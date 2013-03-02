using questionCreator;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;


public partial class _Default : System.Web.UI.Page
{
    private JsonSerializer jsonSerializer = new JsonSerializer();

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod]
    public static string GetRandomQuestion()
    {
        Database db = new Database();
        var record = db.getRandomQuestion();
        var possibleAnswers = new[] { (string)record["Answer1"], (string)record["Answer2"], (string)record["Answer3"], (string)record["Answer4"] };
        var question = (string)record["QuestionP1"];

        var questionToReturn = new Question(question, possibleAnswers);
        return JsonConvert.SerializeObject(questionToReturn);
    }


}
