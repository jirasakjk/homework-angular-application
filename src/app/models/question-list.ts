export interface QuestionList {
    questionCategoryId: string,
    title: string,
    totalQuestion: number,
    level: string,
    timeLimitOfMinuteUnit: number,
    questionInfo: QuestionListInfo[]
}

export interface QuestionListInfo {
    questionId: string,
    sequence: number,
    title: string,
    questionAnswerInfo: QuestionAnswerInfo[]
}

export interface QuestionAnswerInfo {
    questionAnswerId: string,
    sequence: number,
    answer: string
}