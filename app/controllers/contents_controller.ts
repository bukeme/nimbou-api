import Content from '#models/content'
import { createContentValidator } from '#validators/content'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContentsController {
  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(createContentValidator)
    const content = await Content.create(data)
    return response.created(content)
  }

  async index({ response }: HttpContext) {
    const contents = await Content.all()
    return response.ok(contents)
  }

  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const data = request.only(['title', 'text'])
    const content = await Content.findOrFail(id)
    content.merge(data)
    await content.save()
    return response.ok(content)
  }

  async destroy({ params, response }: HttpContext) {
    const { id } = params
    const content = await Content.findOrFail(id)
    await content.delete()
    return response.noContent()
  }
}
