import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Naver extends modelUuid(baseModel) {
  static tableName = 'navers'

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      join: {
        from: 'navers.user_id',
        to: 'user.id'
      }
    }
  }
}

export default Naver
