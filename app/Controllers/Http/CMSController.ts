import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Models/Response'

export default class CMSController {
  // Add new content (question & answer)
  public async create({ request, response }: HttpContextContract) {
    const { title, text } = request.only(['title', 'text'])

    if (!title || !text) {
      return response.badRequest({ message: 'Question and answer are required' })
    }

    const newResponse = await Response.create({
      title,
      text
    })

    return response.created(newResponse)
  }

  // Get all content entries
  public async index({ response }: HttpContextContract) {
    const responses = await Response.all()
    return response.ok(responses)
  }

  // Update content entry by ID
  public async update({ params, request, response }: HttpContextContract) {
    const responseContent = await Response.find(params.id)

    if (!responseContent) {
      return response.notFound({ message: 'Content not found' })
    }

    const { title, text } = request.only(['title', 'text'])
    if (!title && !text) {
      return response.badRequest({ message: 'At least one field (title or text) is required to update' })
    }
    responseContent.title = title || responseContent.title
    responseContent.text = text || responseContent.text

    await responseContent.save()

    return response.ok(responseContent)
  }

  // Delete content entry by ID
  public async destroy({ params, response }: HttpContextContract) {
    const responseContent = await Response.find(params.id)

    if (!responseContent) {
      return response.notFound({ message: 'Content not found' })
    }

    await responseContent.delete()

    return response.noContent()
  }
}
