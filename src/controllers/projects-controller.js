import Project from 'models/Project'

import {
  NotFound,
  getPagination,
} from 'helpers'

export const create = async ctx => {

  const { body } = ctx.request;

  //insertGraph
  return await Project.query().insertGraph({
    name: body.name,
    user_id: ctx.state.user.id,
    projectnaver: body.navers    //atenção ao nome igual ao da relação
    })
}


export const index = async ctx => {

  const {
    name,
    sort = 'created_at',
    order = 'desc',
    created_at
  } = ctx.query

  const { page, pageSize, calculatePageCount } = getPagination(ctx.query)

  const projects = await Project.query()

    .where(builder => {
      if (name) builder.where('name', 'ilike', `%${name}%`)

      if (created_at) builder.whereRaw('date(created_at) = ?', created_at)
    })
    .orderBy(sort, order)
    .withGraphJoined('navers')
    .page(page, pageSize)

  return {
    ...projects,
    page: page + 1,
    pageCount: calculatePageCount(projects.total)
  }

}

export const show = async ctx => Project.query().findOne({'projects.id': ctx.params.id})
  .withGraphJoined('navers')

  export const destroy = ctx => Project.query()
  .deleteById(ctx.params.id)
  .where({user_id: ctx.state.user.id})
  .catch(() => {
    throw new NotFound('Project not found')
  })
  .returning('*')


export const update = async ctx =>{

  const { body } = ctx.request

  // console.log(ctx.params.id)
  const project = await Project.query()
    .findOne({id: ctx.params.id})
    .catch(() => {
      throw new NotFound('Project not found')
    })
  // console.log(naver)

  if(project.user_id !== ctx.state.user.id)
    return {message: 'user not have this project'}

  return Project.query().upsertGraph({

    id: ctx.params.id,
    name: body.name,

    projectnaver: body.navers

    });
}


export default{
  create,
  index,
  show,
  destroy,
  update,
}
