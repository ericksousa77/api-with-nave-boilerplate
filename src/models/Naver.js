import { Model } from 'objection'

import { baseModel, modelUuid } from './index'

class Naver extends modelUuid(baseModel) {
  static tableName = 'navers'
}

export default Naver
