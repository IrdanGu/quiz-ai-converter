import { useState, useEffect, useCallback } from 'react';
import type { Quiz, Question } from '../types/quiz';
import type { QuizRepository } from '../services/QuizRepository';
import { LocalJSONAdapter } from '../services/QuizRepository';

export type QuizStatus = 'loading' | 'ready' | 'active' | 'completed' | 'error';

interface UseQuizReturn {
    status: QuizStatus;
    quiz: Quiz | null;
    currentQuestionIndex: number;
    currentQuestion: Question | null;
    score: number;
    answers: Record<string, string>; // questionId -> optionId
    error: string | null;
    startQuiz: () => void;
    submitAnswer: (optionId: string) => void;
    restartQuiz: () => void;
}

const repository: QuizRepository = new LocalJSONAdapter();

export const useQuiz = (quizId: string): UseQuizReturn => {
    const [status, setStatus] = useState<QuizStatus>('loading');
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [score, setScore] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadQuiz = async () => {
            setStatus('loading');
            try {
                const data = await repository.getQuiz(quizId);
                setQuiz(data);
                setStatus('ready');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                setStatus('error');
            }
        };

        loadQuiz();
    }, [quizId]);

    const startQuiz = useCallback(() => {
        if (quiz) {
            setStatus('active');
            setCurrentQuestionIndex(0);
            setScore(0);
            setAnswers({});
        }
    }, [quiz]);

    const submitAnswer = useCallback((optionId: string) => {
        if (!quiz || status !== 'active') return;

        const currentQuestion = quiz.questions[currentQuestionIndex];
        if (!currentQuestion) return;

        const selectedOption = currentQuestion.options.find(o => o.id === optionId);
        if (!selectedOption) return;

        // Record answer
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));

        // Update score
        if (selectedOption.isCorrect) {
            setScore(prev => prev + 1);
        }

        // Move to next question or complete
        if (currentQuestionIndex < quiz.questions.length - 1) {
            // Optional: Add a small delay for feedback here if UI handles it, 
            // but logic should be immediate or controlled. 
            // We'll move immediately for MVP simplicity.
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setStatus('completed');
        }
    }, [quiz, currentQuestionIndex, status]);

    const restartQuiz = useCallback(() => {
        setStatus('ready');
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswers({});
    }, []);

    const currentQuestion = quiz ? quiz.questions[currentQuestionIndex] : null;

    return {
        status,
        quiz,
        currentQuestionIndex,
        currentQuestion,
        score,
        answers,
        error,
        startQuiz,
        submitAnswer,
        restartQuiz
    };
};
