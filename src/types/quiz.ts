export interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    options: Option[];
    type: 'single-choice' | 'multiple-choice';
}

export interface Quiz {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
}
