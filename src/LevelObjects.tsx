
export interface FrameData {
    dudeName: string;
    backgroundImage: string;
    questions: QuestionPage[];
}

export interface QuestionPage {
    theQuestion: string;
    dudeStatement: string;
    options: Options[];
    points:number;
}

export interface Options {
    option: string;
    action: OptionActions;
    dudeStatement: string;
    narrStatement: string;
}

export enum OptionActions {
    Kill, Correct, Wrong, Nothing
}