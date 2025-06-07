import { AppError, ErrorType } from '@/utils/errorHandler';

export interface TravelRecommendation {
  destination: string;
  activities: string[];
  localTips: string[];
  budgetTips: string[];
  weatherInfo: string;
}

const AI_API_URL = 'https://api.openai.com/v1/chat/completions';
const AI_API_KEY = process.env.OPENAI_API_KEY;

export const aiService = {
  async getTravelRecommendations(destination: string, budget: number): Promise<TravelRecommendation> {
    try {
      const prompt = `Generate travel recommendations for ${destination} with a budget of ${budget} USD. Include:
      1. Top 5 activities to do
      2. 3 local tips for tourists
      3. Budget-saving tips
      4. Weather information`;

      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new AppError(
          'Failed to get AI recommendations',
          500,
          ErrorType.SERVER
        );
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Parse the AI response into structured data
      const activities = content.match(/Activities:([\s\S]*?)(?=Local Tips:|$)/)?.[1].split('\n').filter(Boolean) || [];
      const localTips = content.match(/Local Tips:([\s\S]*?)(?=Budget Tips:|$)/)?.[1].split('\n').filter(Boolean) || [];
      const budgetTips = content.match(/Budget Tips:([\s\S]*?)(?=Weather:|$)/)?.[1].split('\n').filter(Boolean) || [];
      const weatherInfo = content.match(/Weather:([\s\S]*?)$/)?.[1].trim() || '';

      return {
        destination,
        activities,
        localTips,
        budgetTips,
        weatherInfo,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Failed to get AI recommendations',
        500,
        ErrorType.NETWORK
      );
    }
  }
};
