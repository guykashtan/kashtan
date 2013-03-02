using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
    public class Question
    {
        public string question { set; get; }
        public string[] possibleAnswers;
        public int id;
        public Question(int id, string question, string[] possibleAnswers)
        {
            this.id = id;
            this.question = question;
            reshuffle(possibleAnswers);
            this.possibleAnswers = possibleAnswers;
        }


        private void reshuffle(string[] texts)
        {
            var random = new Random();
            // Knuth shuffle algorithm :: courtesy of Wikipedia :)

            for (int t = 0; t < texts.Length; t++)
            {
                string tmp = texts[t];
                int r = random.Next(t, texts.Length);
                texts[t] = texts[r];
                texts[r] = tmp;
            }

        }
    }
