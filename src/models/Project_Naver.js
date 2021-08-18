import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class ProjectNaver extends modelUuid(baseModel) {
  static tableName = 'projects_navers'

  static relationMappings = {
    naver: {
      relation: Model.HasManyRelation,
      modelClass: 'Naver',
      join: {
        from: 'navers.id',
        to: 'projects_navers.naver_id',
      }

    },
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Project',
      join: {
        from: 'projects.id',
        to: 'projects_navers.project_id'
      }
    },

  }
}

export default ProjectNaver
