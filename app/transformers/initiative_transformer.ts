import type Initiative from '#models/initiative'
import { BaseTransformer } from '@adonisjs/core/transformers'
import UserTransformer from './user_transformer.ts'

export default class InitiativeTransformer extends BaseTransformer<Initiative> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'description', 'createdAt', 'updatedAt']),
      user: UserTransformer.transform(this.resource.user),
    }
  }
}
