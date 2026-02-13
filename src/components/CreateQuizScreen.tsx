import { useState } from 'react';
import { GeminiAdapter } from '../services/GeminiAdapter';
import type { Quiz } from '../types/quiz';
import './CreateQuizScreen.css';

interface CreateQuizScreenProps {
    onQuizGenerated: (quiz: Quiz) => void;
}

export const CreateQuizScreen = ({ onQuizGenerated }: CreateQuizScreenProps) => {
    const [apiKey, setApiKey] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey) {
            setError("Please provide an API Key.");
            return;
        }
        if (files.length === 0) {
            setError("Please upload at least one image.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const adapter = new GeminiAdapter(apiKey);
            const quiz = await adapter.generateQuizFromImages(files);
            onQuizGenerated(quiz);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-quiz-screen animate-fade-in">
            <h1>Create Quiz from Images</h1>
            <p>Upload images (notes, textbook, diagrams) and let AI extract questions for you.</p>

            <form onSubmit={handleSubmit} className="create-form">
                <div className="form-group">
                    <label htmlFor="apiKey">Gemini API Key</label>
                    <input
                        id="apiKey"
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API Key"
                        className="text-input"
                    />
                    <small>
                        Get a key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">Google AI Studio</a>
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="file">Upload Images</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    <div className="file-preview">
                        {files.length > 0 ? (
                            <p>{files.length} file(s) selected</p>
                        ) : (
                            <p className="no-file-text">No files selected</p>
                        )}
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="generate-button" disabled={loading}>
                    {loading ? 'Generating Quiz...' : 'Generate Quiz'}
                </button>
            </form>
        </div>
    );
};
