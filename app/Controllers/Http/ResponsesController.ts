// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Models/Response'
import MistralAIService from 'App/Services/MistralAIService'

export default class ResponsesController {

  private aiService: MistralAIService;

  constructor() {
    this.aiService = new MistralAIService();
  } 

  public async index() {
    return await Response.all()
  }

  public async chat({ request, response }: HttpContextContract) {
    const userMessage = request.input('message')

    if (!userMessage) {
      return response.badRequest({ message: 'Message is required' })
    }

    if(userMessage.toLowerCase() === 'hi' || userMessage.toLowerCase() === 'hello') {
      return { answer: 'Hello! How can I assist you today?' }
    }

    const predefinedResponse = await Response.query()
      .whereRaw('LOWER(title) LIKE ?', [`%${userMessage.toLowerCase()}%`])
      .first()

    if (predefinedResponse) {
      console.log(`User: ${userMessage}`)
      console.log(`Bot: ${predefinedResponse.text}`)
      
      return { reply: predefinedResponse.text }
    } else {
      const response: any = await this.aiService.askMistralAI(userMessage)
      return { reply: response || "Sorry, I couldn't answer that!"}
    }
  }
}
