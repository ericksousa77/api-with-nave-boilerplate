import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class User extends modelUuid(baseModel) {
  static tableName = 'users'
  static hidden = ['password']
  // has many users and projects
  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,  //quando o modelo de origem tem a chave estrangeira
      modelClass: 'Role',
      join: {
        from: 'users.role_id',
        to: 'roles.id'
      }
    },
    naver: {
      relation: Model.HasManyRelation, //quando o modelo de destino tem a chave estrangeira
      modelClass: 'Naver',
      join: {
        from: 'users.id',
        to: 'navers.user_id',
      }
    },
    project: {
      relation: Model.HasManyRelation,
      modelClass: 'Project',
      join: {
        from: 'users.id',
        to: 'projects_users_id',
      }

    },
  }

}

export default User
