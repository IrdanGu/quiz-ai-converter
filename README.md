# Antigravity Quiz - AI-Powered Quiz Generator

An interactive web application that transforms images (notes, textbooks, diagrams) into playable quizzes using AI.

Built to modernize studying by leveraging Google's Gemini AI to extract questions directly from study materials.

## 🚀 Features

-   **AI Quiz Generation**: Upload multiple images, and the app uses Gemini AI (OCR + Reasoning) to extract and format questions automatically.
-   **Interactive Quiz Engine**: A smooth, state-based quiz interface with immediate feedback and scoring.
-   **Export to JSON**: Save your generated quizzes as JSON files to share or load later.
-   **Local Quiz Loading**: Play sample quizzes or load previously saved JSON quizzes.
-   **Responsive Design**: Works on desktop and mobile for studying on the go.

## 🛠️ Tech Stack

-   **Frontend**: React (v18), TypeScript, Vite
-   **Styling**: Pure CSS with Variables (No frameworks, high performance)
-   **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
-   **State Management**: Custom React Hooks

## 📦 Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   Google Gemini API Key (Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/antigravity-ai-quiz.git
    cd antigravity-ai-quiz
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage Guide

1.  **Generate a Quiz**:
    -   On the home screen, enter your Gemini API Key.
    -   Upload one or more images containing questions or study material.
    -   Click "Generate Quiz".
    -   *Note: The AI will try to extract existing questions or formulate new ones based on the text.*

2.  **Take the Quiz**:
    -   Answer questions one by one.
    -   Get immediate feedback on correct/incorrect answers.
    -   See your final score at the end.

3.  **Save Your Work**:
    -   After generating or finishing a quiz, click the **"Export JSON"** button to save the quiz file to your device.

## 🤝 Contributing

This project is a Sandbox experiment for "Agentic Coding". Feel free to fork and experiment!

## 📄 License

MIT
