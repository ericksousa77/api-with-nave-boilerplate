
import Naver from 'models/Naver'
import User from 'models/User'
import {
  NotFound,
} from 'helpers'

export const create = async ctx => {

  const { body } = ctx.request;

  await User.query()
    .findOne({id: body.user_id})
    .catch(() => {
      throw new NotFound('User not found')
    })

  return Naver.query().insert({
    name: body.name,
    birthdate: body.birthdate,
    job_role: body.job_role,
    admission_date: body.admission_date,
    user_id: body.user_id
    })
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


export default {
    create,
    index,
    show,
    destroy

  }
