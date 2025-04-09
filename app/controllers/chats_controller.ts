import Content from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'
import { GoogleGenAI } from '@google/genai'
import env from '#start/env'

const ai = new GoogleGenAI({ apiKey: env.get('GEMINI_API_KEY') })

async function prompt(text: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: text + '\n Make it very brief and remove all formatiing',
  })
  return response.text
}

export default class ChatsController {
  async chat({ request, response }: HttpContext) {
    const { message } = request.only(['message'])

    if (!message || message.trim() === '') {
      return response.status(400).json({ error: 'Message cannot be empty' })
    }

    const predefinedResponse = await Content.query().where('title', 'like', `%${message}%`).first()

    if (predefinedResponse) {
      return response.ok({ message: predefinedResponse.text })
    }

    const aiResponse = await prompt(message)
    await Content.create({ title: message, text: aiResponse })
    return response.ok({ message: aiResponse })
  }
}
