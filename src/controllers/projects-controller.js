import Project from 'models/Project'
import ProjectNaver from 'models/Project_Naver'

import {
  NotFound,
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

  const { body } = ctx.request

  console.log(ctx.params.id)
  const project = await Project.query()
    .findOne({id: ctx.params.id})
    .catch(() => {
      throw new NotFound('Project not found')
    })
  // console.log(naver)

  if(project.user_id !== ctx.state.user.id)
    return {message: 'user not have this project'}

  //pesquisar se o upsert cria uma nova relação caso ela ainda nao exista
  return await Project.query().upsertGraph({

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
