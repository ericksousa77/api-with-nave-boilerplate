import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class ProjectNaver extends modelUuid(baseModel) {
  static tableName = 'projects_navers'

  static relationMappings = {
    naver: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Naver',
      join: {
        from: 'projects_navers.naver_id',
        to: 'naver.id'
      }
    },
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Project',
      join: {
        from: 'projects_navers.project_id',
        to: 'project.id'
      }
    },

  }
}

export default ProjectNaver
