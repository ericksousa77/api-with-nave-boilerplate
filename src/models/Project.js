import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Project extends modelUuid(baseModel) {
  static tableName = 'projects'

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Naver',
      join: {
        from: 'users.role_id',
        to: 'roles.id'
      }
    },
    // naver: {
    //   relation: Model.ManyToManyRelation,
    //   modelClass: 'Naver',
    //   join: {
    //     from: 'project.id',
    //     through: {
    //       from: 'projects_navers.naver_id',
    //       to: 'projects_navers.project_id'
    //     },
    //     to: 'naver.id'
    //   }
    // },
  }

}

export default Project
