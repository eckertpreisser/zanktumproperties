import { GoogleGenAI } from "@google/genai";
import { getVillas } from '../constants';
import { Language } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendConciergeMessage = async (
  message: string, 
  history: {role: string, parts: {text: string}[]}[] = [],
  lang: Language = 'en'
) => {
  try {
    const villas = getVillas(lang);
    
    // Construct a system prompt based on the villa data
    const villaContext = villas.map(v => 
      `Name: ${v.name}. Location: Alanya, Turkey. Price: ${lang === 'de' ? '€' : '$'}${v.pricePerNight}/${lang === 'de' ? 'Nacht' : 'night'}. Details: ${v.description}. Amenities: ${v.amenities.join(', ')}.`
    ).join('\n\n');

    const languageInstruction = lang === 'de' 
      ? "You MUST answer in German (Deutsch). Address the user politely using 'Sie'." 
      : "You MUST answer in English.";

    const SYSTEM_INSTRUCTION = `
You are 'Aria', the dedicated AI Concierge for Luxus Villen Alanya. 
Your tone is sophisticated, polite, warm, and helpful. You cater to high-net-worth individuals.
${languageInstruction}

You have access to the following property details in Alanya:
${villaContext}

Rules:
1. Only answer questions related to the villas, Alanya (Tepe/Kargicak/Cleopatra Beach/Castle), luxury travel, or booking.
2. If asked about price, mention the specific rates but invite them to contact our sales team for bespoke offers.
3. Keep answers concise (under 100 words) but elegant.
4. Do not make up amenities that are not listed.
`;

    const model = 'gemini-3-flash-preview';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'de' 
      ? "Ich bitte um Entschuldigung, aber ich kann momentan keine Verbindung zum Netzwerk herstellen." 
      : "I apologize, but I am momentarily unable to access the network.";
  }
};
