
import Naver from 'models/Naver'
import User from 'models/User'
import Project from 'models/Project'
import ProjectNaver from 'models/Project_Naver'

import {
  NotFound,
} from 'helpers'

export const create = async ctx => {

  const { body } = ctx.request;

  await Project.query()
  .findOne({id: body.project_id})
  .catch(() => {
    throw new NotFound('Project not found')
  })


  const naver = await Naver.query().insert({
    name: body.name,
    birthdate: body.birthdate,
    job_role: body.job_role,
    admission_date: body.admission_date,
    user_id: ctx.state.user.id
    })

  // console.log(naver, body.project_id);


  await ProjectNaver.query().insert({
    naver_id: naver.id,
    project_id: body.project_id
  })

  return naver
}

export const index = async ctx => {

  const {
    name,
    birthdate,
    job_role,
    admission_date,
    sort = 'created_at',
    order = 'desc',
    created_at
  } = ctx.query

  const navers = await Naver.query()

    .where(builder => {
      if (name) builder.where('name', 'ilike', `%${name}%`)

      if (birthdate) builder.whereRaw('date(birthdate) = ?', birthdate)

      if (admission_date) builder.whereRaw('date(admission_date) = ?', admission_date)

      if (job_role) builder.where('job_role', 'ilike', `%${job_role}%`)

      if (created_at) builder.whereRaw('date(created_at) = ?', created_at)
    })
    .orderBy(sort, order)

    return {
    navers,
  }

}

export const show = async ctx => {

  try{
    const naver = await Naver.query()
    .findOne({id: ctx.params.id})

    return naver
  }catch(err){
    console.log(err)
  }

}

export const destroy = async ctx => {
  console.log(ctx.params.id)
  try{
    await Naver.query().deleteById(ctx.params.id)
    return {message: 'user deleted successfully'}
  }catch(err){
    console.log('Erro deleting naver')
  }

}

export const update = async ctx => {

   const { body, project_id } = ctx.request

  // const { project_id } = ctx.params.id

  // await User.query()
  //   .findOne({id: ctx.state.user.id})
  //   .catch(() => {
  //     throw new NotFound('User not found')
  //   })


  const naver = await Naver.query()
    .findOne({id: ctx.params.id})
    .catch(() => {
      throw new NotFound('Naver not found')
    })

  if(naver.user_id !== ctx.state.user.id)
    return {message: 'user not have this naver'}

  await Naver.query().patchAndFetchById(ctx.params.id, {
    name: body.name,
    birthdate: body.birthdate,
    admission_date: body.admission_date,
    job_role: body.job_role,
  })

  await ProjectNaver.query().patchAndFetchById({naver_id: naver.id}, {
    project_id: project_id
  })

  const naver_updated = await ProjectNaver.query()
    .findOne({naver_id: ctx.params.id})
    .withGraphJoined('naver')
    .withGraphJoined('project')

    // console.log(project);

  return naver_updated

}


export default {
    create,
    index,
    show,
    destroy,
    update,

  }
