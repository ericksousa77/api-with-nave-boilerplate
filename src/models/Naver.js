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
    },
    project: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Project',
      join: {
        from: 'naver.id',
        through: {
          from: 'projects_navers.naver_id',
          to: 'projects_navers.project_id'
        },
        to: 'project.id'
      }
    },
    projectnaver: {
      relation: Model.HasManyRelation,
      modelClass: 'Project_Naver',
      join: {
        from: 'navers.id',
        to: 'projects_navers.naver_id'
      }
    },
    //relation manytomany project
    //relation hasmany project_naver
  }
}

export default Naver
