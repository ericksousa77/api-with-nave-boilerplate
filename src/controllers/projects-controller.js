import Project from 'models/Project'
import User from 'models/User'
import ProjectNaver from 'models/Project_Naver'

import {
  NotFound,
} from 'helpers'

export const create = async ctx => {

  const { body } = ctx.request

  return Project.query().insert({
    name: body.name,
    user_id: ctx.state.user.id,
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

    //pensar em algo melhor pra por aqui

    const project = await ProjectNaver.query()
    .findOne({project_id: ctx.params.id})
    .withGraphJoined('naver')
    .withGraphJoined('project')

    // console.log(project);

    return project
  }catch(err){
    console.log(err)
  }

}

export const destroy = async ctx => {

  try{

    const project = await Project.query()
      .findOne({id: ctx.params.id})
      .catch(() => {
        throw new NotFound('Project not found')
      })

    if(project.user_id !== ctx.state.user.id)
      return {message: 'user not have this project'}

    await Project.query().deleteById(ctx.params.id)

    return {message: 'project deleted successfully'}

  }catch(err){
    console.log('Erro deleting project')
  }

}

export const update = async ctx =>{

  const { body, project_id } = ctx.request

  const project = await Project.query()
    .findOne({id: ctx.params.id})
    .catch(() => {
      throw new NotFound('Project not found')
    })

  if(project.user_id !== ctx.state.user.id)
    return {message: 'user not have this project'}

  await Project.query().patchAndFetchById(ctx.params.id, {
    name: body.name
  })

  // await ProjectNaver.query().patchAndFetchById({naver_id: naver.id}, {
  //   project_id: project_id
  // })

  const project_updated = await ProjectNaver.query()
    // .find({project_id: ctx.params.id})
    .where(builder => {
      if (project_id) builder.where('project_id',`%${ctx.params.id}%`)
    })
    .withGraphJoined('naver')
    .withGraphJoined('project')
    .select('naver', 'project')

    // console.log(project);

  return {project_updated}

}


export default{
  create,
  index,
  show,
  destroy,
  update,
}
