import Initiative from '#models/initiative'
import initiativeTransformer from '#transformers/initiative_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class InitiativesController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const initiatives = await Initiative.query().preload('user').paginate(page, 5)

    return inertia.render('initiatives/index', {
      initiatives: initiativeTransformer.paginate(initiatives.all(), initiatives.getMeta()),
    })
  }
}
