
import { FrameData, QuestionPage, Options, OptionActions } from "./LevelObjects";


export default class Level1 {
    public levelDesign: FrameData;
    constructor() {
        var questions: QuestionPage[] = [

            {
                theQuestion: "Who am I",
                dudeStatement: "Deed bro",
                options: [

                    {
                        option: "high",
                        action: OptionActions.Correct,
                        dudeStatement: "so true",
                        narrStatement: "not helpful"
                    },
                    {
                        option: "low",
                        action: OptionActions.Wrong,
                        dudeStatement: "so true",
                        narrStatement: "not helpful"
                    },
                    {
                        option: "medium",
                        action: OptionActions.Wrong,
                        dudeStatement: "so true",
                        narrStatement: "not helpful"
                    }
                ],
                points: 10
            },
            {
                theQuestion: "Who am I",
                dudeStatement: "Deep bro",
                options: [
                    {
                        option: "high",
                        action: OptionActions.Correct,
                        dudeStatement: "so true",
                        narrStatement: "not helpful"
                    },
                    {
                        option: "low",
                        action: OptionActions.Wrong,
                        dudeStatement: "so true",
                        narrStatement: "not helpful"
                    },
                    {
                        option: "medium",
                        action: OptionActions.Wrong,
                        dudeStatement: "so true",
                        narrStatement: "not helpful"
                    }

                ],
                points: 10
            }

        ];

        this.levelDesign = {
            dudeName: "alex",
            backgroundImage: "alex.jpg",
            questions: questions
        }




    };


}
