import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Project extends modelUuid(baseModel) {
  static tableName = 'projects'

  static relationMappings = {
    naver: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Naver',
      join: {
        from: 'projects.user_id',
        to: 'users.id'
      }
    },
    navers: {
      relation: Model.ManyToManyRelation,
      modelClass: 'Naver',
      join: {
        from: 'projects.id',
        through: {
          from: 'projects_navers.project_id',
          to: 'projects_navers.naver_id'
        },
        to: 'navers.id'
      }
    },
    projectnaver: {
      relation: Model.HasManyRelation,
      modelClass: 'Project_Naver',
      join: {
        from: 'projects.id',
        to: 'projects_navers.project_id'
      }
    },
  }

}

export default Project
