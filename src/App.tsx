import { useState } from 'react';
import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen } from './components/ResultScreen';
import { CreateQuizScreen } from './components/CreateQuizScreen';
import { DownloadButton } from './components/DownloadButton';
import type { Quiz } from './types/quiz';
import './components/DownloadButton.css';
import './App.css';

function App() {
  const [mode, setMode] = useState<'create' | 'play'>('create');

  const {
    status,
    quiz,
    currentQuestion,
    currentQuestionIndex,
    score,
    startQuiz,
    submitAnswer,
    restartQuiz,
    loadQuiz,
    error
  } = useQuiz('quiz-001');

  // Handle successful quiz generation
  const handleQuizGenerated = (newQuiz: Quiz) => {
    loadQuiz(newQuiz);
    setMode('play');
  };

  // If in create mode, show the create screen
  if (mode === 'create') {
    return (
      <div className="app-container">
        <CreateQuizScreen onQuizGenerated={handleQuizGenerated} />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => setMode('play')}
            style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}
          >
            Or verify sample quiz
          </button>
        </div>
      </div>
    );
  }

  // Play Mode
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
        <button onClick={() => setMode('create')}>Back</button>
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

      {(status === 'ready' || status === 'completed') && (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            className="back-button"
            onClick={() => setMode('create')}
            style={{ color: 'var(--text-secondary)' }}
          >
            ← Back to Creator
          </button>
          {quiz && <DownloadButton quiz={quiz} />}
        </div>
      )}
    </div>
  );
}

export default App;
