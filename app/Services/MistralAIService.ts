
// import { Mistral } from '@mistralai/mistralai'


class MistralAIService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.MISTRAL_API_KEY!;
  }

  async askMistralAI(prompt: string): Promise<void> {
    const messages: any = [{ role: 'user', content: prompt }];
  
    try {
      const response = await fetch(process.env.MISTRAL_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.MISTRAL_MODEL,
          messages,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP Error ${response.status}: ${errorText}`);
        return;
      }
  
      const data: any = await response.json();
      const reply = data.choices[0].message.content;
      if (!reply) {
        console.error('No reply from Mistral AI');
        return;
      }
      return reply;
    } catch (err) {
      console.error('Failed to fetch Mistral response:', err);
    }
  }


}

export default MistralAIService;

