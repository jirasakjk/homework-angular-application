export interface Submission {
    questionCategoryId: string;
    questions: Question[];
}

export interface Answer {
    questionAnswerId: string;
}
  
export interface Question {
    questionId: string;
    answers: Answer[];
}
