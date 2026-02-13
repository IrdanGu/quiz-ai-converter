import type { Quiz } from '../types/quiz';

export interface QuizRepository {
    getQuiz(id: string): Promise<Quiz>;
}

export class LocalJSONAdapter implements QuizRepository {
    async getQuiz(_id: string): Promise<Quiz> {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const response = await fetch('/quiz-sample.json');
            if (!response.ok) {
                throw new Error('Failed to fetch quiz data');
            }
            const data = await response.json();
            // In a real app, we'd validate the schema here (e.g., using Zod)
            // For now, we assume the JSON matches our interface
            return data as Quiz;
        } catch (error) {
            console.error("Error loading quiz:", error);
            throw error;
        }
    }
}

// Future implementations:
// export class OCRServiceAdapter implements QuizRepository { ... }
