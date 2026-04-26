import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export async function generateEventImage(prompt: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('API Key missing. Please configure GEMINI_API_KEY in the Secrets panel.');
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a high-quality, atmospheric image for an event. Style: urban, vibrant, nightlife or outdoor activity. Theme: ${prompt}. The image should be suitable for a card thumbnail, visually appealing and professional.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3",
        },
      },
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error('No content returned from AI');
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error('No image part found in AI response');
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}
