import Project from 'models/Project'
import User from 'models/User'

import {
  NotFound,
} from 'helpers'

export const create = async ctx => {

  const { body } = ctx.request;

  // ctx.state.user.id

  console.log(body.user_id);

  await User.query()
    .findOne({id: body.user_id})
    .catch(() => {
      throw new NotFound('User not found')
    })

  return Project.query().insert({
    name: body.name,
    user_id: body.user_id,
    })
}

export const index = async ctx => {

  const {
    name,
    sort = 'created_at',
    order = 'desc',
    created_at
  } = ctx.query

  const projects = await Project.query()

    .where(builder => {
      if (name) builder.where('name', 'ilike', `%${name}%`)

      if (created_at) builder.whereRaw('date(created_at) = ?', created_at)
    })
    .orderBy(sort, order)

    return {
    projects,
  }

}

export const show = async ctx => {

  try{
    const project = await Project.query()
    .findOne({id: ctx.params.id})
    .withGraphJoined('naver')

    return project
  }catch(err){
    console.log(err)
  }

}

export const destroy = async ctx => {

  try{
    await Project.query().deleteById(ctx.params.id)
    return {message: 'project deleted successfully'}

  }catch(err){
    console.log('Erro deleting project')
  }

}


export default{
  create,
  index,
  show,
  destroy
}
