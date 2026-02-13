import './ResultScreen.css';

interface ResultScreenProps {
    score: number;
    total: number;
    onRestart: () => void;
}

export const ResultScreen = ({ score, total, onRestart }: ResultScreenProps) => {
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="result-screen animate-fade-in">
            <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {total}</span>
            </div>

            <h2 className="result-heading">
                {percentage >= 80 ? 'Outstanding!' :
                    percentage >= 50 ? 'Good Job!' : 'Keep Practicing!'}
            </h2>

            <p className="result-message">
                You answered {score} out of {total} questions correctly.
            </p>

            <button className="restart-button" onClick={onRestart}>
                Take Another Quiz
            </button>
        </div>
    );
};
