import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class User extends modelUuid(baseModel) {
  static tableName = 'users'
  static hidden = ['password']
  // has many users and projects
  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Role',
      join: {
        from: 'users.role_id',
        to: 'roles.id'
      }
    },
    naver: {
      relation: Model.HasManyRelation,
      modelClass: 'Naver',
      join: {
        from: 'navers.id',
        to: 'users.id',
      }

    },
    project: {
      relation: Model.HasManyRelation,
      modelClass: 'Project',
      join: {
        from: 'projects.id',
        to: 'users.id',
      }

    },
  }

}

export default User
