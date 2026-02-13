import type { Question } from '../types/quiz';
import './QuestionCard.css';

interface QuestionCardProps {
    question: Question;
    onAnswer: (optionId: string) => void;
    currentQuestionIndex: number;
    totalQuestions: number;
}

export const QuestionCard = ({
    question,
    onAnswer,
    currentQuestionIndex,
    totalQuestions
}: QuestionCardProps) => {
    return (
        <div className="question-card">
            <div className="question-header">
                <span className="question-counter">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <h2 className="question-text">{question.text}</h2>
                {question.imageUrl && (
                    <img src={question.imageUrl} alt="Question Context" className="question-image" />
                )}
            </div>

            <div className="options-list">
                {question.options.map((option) => (
                    <button
                        key={option.id}
                        className="option-button"
                        onClick={() => onAnswer(option.id)}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};
