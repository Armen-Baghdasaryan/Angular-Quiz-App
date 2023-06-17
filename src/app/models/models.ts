interface Answer {
    id: string,
    answer: string,
    isChoosed: boolean,
    isTrusty: boolean,
    isCorrect?: boolean
}

export interface QuizData {
    id: string,
    question: string,
    answers: Answer[],
    correctAnswer: number,
}