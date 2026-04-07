import Initiative from '#models/initiative'
import initiativeTransformer from '#transformers/initiative_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class InitiativesController {
  async index({ inertia }: HttpContext) {
    const initiatives = await Initiative.query().preload('user').orderBy('createdAt', 'desc')

    return inertia.render('initiatives/index', {
      initiatives: initiativeTransformer.transform(initiatives),
    })
  }
}
