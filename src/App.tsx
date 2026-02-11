import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';
import './App.css';

function App() {
  // Hardcoded ID for MVP, future: get from URL or list
  const {
    status,
    quiz,
    currentQuestion,
    currentQuestionIndex,
    score,
    startQuiz,
    submitAnswer,
    restartQuiz,
    error
  } = useQuiz('quiz-001');

  if (status === 'loading') {
    return (
      <div className="app-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="app-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {status === 'ready' && quiz && (
        <StartScreen
          title={quiz.title}
          description={quiz.description}
          onStart={startQuiz}
        />
      )}

      {status === 'active' && currentQuestion && quiz && (
        <QuestionCard
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          onAnswer={submitAnswer}
        />
      )}

      {status === 'completed' && quiz && (
        <ResultScreen
          score={score}
          total={quiz.questions.length}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
