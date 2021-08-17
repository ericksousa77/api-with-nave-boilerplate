import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Project extends modelUuid(baseModel) {
  static tableName = 'projects'
}

export default Project
