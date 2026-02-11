import './StartScreen.css';

interface StartScreenProps {
    title: string;
    description?: string;
    onStart: () => void;
    loading?: boolean;
}

export const StartScreen = ({ title, description, onStart, loading }: StartScreenProps) => {
    return (
        <div className="start-screen animate-fade-in">
            <h1 className="quiz-title">{title}</h1>
            {description && <p className="quiz-description">{description}</p>}
            <button
                className="start-button"
                onClick={onStart}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Start Quiz'}
            </button>
        </div>
    );
};
