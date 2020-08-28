
import { FrameData, QuestionPage, Options, OptionActions } from "./LevelObjects";


export default class Level1 {

    public levelDesign: FrameData;
    constructor() {

        this.levelDesign = {
            dudeName: "All",
            backgroundImage: "./Images/Welcomepage.PNG",
            questions: [
                {
                    theQuestion: "Your new homies what to know where they are",
                    dudeStatement: "Where are we?",
                    options: [
                        {
                            option: "Earth",
                            action: OptionActions.Correct,
                            dudeStatement: "How very helpful",
                            narrStatement: "not helpful"
                        },
                        {
                            option: "Mars",
                            action: OptionActions.Wrong,
                            dudeStatement: "Great googly moogly, how did this happen?",
                            narrStatement: "Don’t lie to the poor fellows"
                        },
                        {
                            option: "Wyoming",
                            action: OptionActions.Wrong,
                            dudeStatement: "Don’t lie to me, Wyoming isn’t real",
                            narrStatement: "Don’t lie to the poor fellows"
                        }
                    ],
                    points: 10
                },
                {
                    theQuestion: "Your home invaders want to know when they are",
                    dudeStatement: "Perhaps it would be more beneficial to ask when we are?",
                    points: 10,
                    options: [
                        {
                            option: "21st century",
                            action: OptionActions.Correct,
                            dudeStatement: "Great googly moogly how did this happen?",
                            narrStatement: "That's not the time that they are from"
                        },
                        {
                            option: "Wyoming",
                            action: OptionActions.Wrong,
                            dudeStatement: "I said when you half pint wannabe comedian moron",
                            narrStatement: "You think you’re funny don't you"
                        },
                        {
                            option: "1200s",
                            action: OptionActions.Wrong,
                            dudeStatement: "Wow, that’s when I’m from",
                            narrStatement: "Are you dense?"
                        }
                    ]
                },
                {
                    theQuestion: "The french women who was burned at the stake for being a great military leader inspired by a saint wants to know if you know who she was",
                    dudeStatement: "Do you know who I am",
                    options: [
                        {
                            option: "Joan of Arc",
                            action: OptionActions.Correct,
                            dudeStatement: "That's correct",
                            narrStatement: "That's the woman, the myth, the crispy chick"
                        },
                        {
                            option: "Marie Antoinette",
                            action: OptionActions.Wrong,
                            dudeStatement: "who is that?",
                            narrStatement: "about 400 years off buddy"
                        },
                        {
                            option: "Lafayette",
                            action: OptionActions.Wrong,
                            dudeStatement: "who is that?",
                            narrStatement: "I said french woman"
                        }
                    ],
                    points: 10
                },
                {
                    theQuestion: "The Macedonian man who never lost a battle and won the hearts of so many that he was forever known as great, what is his name? ",
                    dudeStatement: "Do you know who I am",
                    options: [
                        {
                            option: "Alexander the great",
                            action: OptionActions.Correct,
                            dudeStatement: "Yep that’s me!",
                            narrStatement: "Fun fact, he had absolutely nothing to do with Rome"
                        },
                        {
                            option: "Peter the Great",
                            action: OptionActions.Wrong,
                            dudeStatement: "who is that?",
                            narrStatement: "that's a Russian"
                        },
                        {
                            option: "Catherine the Great",
                            action: OptionActions.Wrong,
                            dudeStatement: "who is that?",
                            narrStatement: "She is Russian and a woman, not a man and Macedionian"
                        }
                    ],
                    points: 10
                },
                {
                    theQuestion: "This Egyptian pharaoh was one of the few female pharaohs in history, but she was also the last pharaoh before the fall of Egypt, who was she?",
                    dudeStatement: "Do you know who I am",
                    options: [
                        {
                            option: "Cleopatra",
                            action: OptionActions.Correct,
                            dudeStatement: "Yes, I am she",
                            narrStatement: "I hope you’re not planning anything sneaky, she doesn’t deal well with snakes"
                        },
                        {
                            option: "Nefertiti",
                            action: OptionActions.Wrong,
                            dudeStatement: "No, she is one of my ancestors, MANY generations ago",
                            narrStatement: "about 1300 years off buddy"
                        },
                        {
                            option: "Nefertari",
                            action: OptionActions.Wrong,
                            dudeStatement: "No, she is one of my ancestors, MANY generations ago",
                            narrStatement: "Not a pharaoh, also about 1200 years off"
                        }
                    ],
                    points: 10
                },
                {
                    theQuestion: "This Mongolian man conquered most of the known world at the time, he also happened to kill 11% of the world's population at the time",
                    dudeStatement: "Do you know who I am",
                    options: [
                        {
                            option: "Genghis Khan",
                            action: OptionActions.Correct,
                            dudeStatement: "Yes, bathe in my glory",
                            narrStatement: "You know he’s cool when his face is on currency"
                        },
                        {
                            option: "Vlad the Impaler",
                            action: OptionActions.Wrong,
                            dudeStatement: "Nay, I am not he",
                            narrStatement: "The only people he terrorized was himself, and the turks"
                        },
                        {
                            option: "Chin the conqueror",
                            action: OptionActions.Wrong,
                            dudeStatement: "Nay, I am not he",
                            narrStatement: "That's not a real person"
                        }
                    ],
                    points: 10
                }
            ]
        }
    }
}