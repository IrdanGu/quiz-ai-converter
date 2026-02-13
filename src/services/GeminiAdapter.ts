import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Quiz } from "../types/quiz";

export class GeminiAdapter {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateQuizFromImages(files: File[]): Promise<Quiz> {
        const model = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const imageParts = await Promise.all(files.map(file => this.fileToGenerativePart(file)));

        const prompt = `
      Analyze the provided images and extract all quiz questions, options, and correct answers into a structured JSON format.
      
      Rules:
      1. Extract ALL questions found in the images.
      2. Do NOT generate new questions unless they are present in the image.
      3. If an image contains text but no direct questions, attempt to formulate valid questions based closely on the text.
      4. The JSON structure must match this EXACT format:
      {
        "title": "Quiz Title (based on content)",
        "description": "Short description based on image content",
        "questions": [
          {
            "id": "q1",
            "text": "Question text",
            "type": "single-choice",
            "options": [
              { "id": "o1", "text": "Option 1", "isCorrect": false },
              { "id": "o2", "text": "Option 2", "isCorrect": true }
            ]
          }
        ]
      }
      5. Output ONLY raw JSON. Do not include markdown formatting like \`\`\`json.
    `;

        try {
            const result = await model.generateContent([prompt, ...imageParts]);
            const response = await result.response;
            const text = response.text();

            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const json = JSON.parse(cleanText);

            return {
                id: crypto.randomUUID(),
                ...json
            } as Quiz;
        } catch (error) {
            console.error("Gemini Error:", error);
            throw new Error("Failed to generate quiz. Please try again or check your API key.");
        }
    }

    private async fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const base64Data = base64String.split(',')[1];
                resolve({
                    inlineData: {
                        data: base64Data,
                        mimeType: file.type
                    }
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}
