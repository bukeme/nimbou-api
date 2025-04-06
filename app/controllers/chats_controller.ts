import Content from '#models/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChatsController {
  async chat({ request, response }: HttpContext) {
    const { message } = request.only(['message'])

    if (!message || message.trim() === '') {
      return response.status(400).json({ error: 'Message cannot be empty' })
    }

    const predefinedResponse = await Content.query().where('title', 'like', `%${message}%`).first()

    if (predefinedResponse) {
      return response.ok({ reply: predefinedResponse.text })
    }

    const aiResponse = `AI says: I didn't find a matching content for "${message}".`
    return response.ok({ reply: aiResponse })
  }
}
