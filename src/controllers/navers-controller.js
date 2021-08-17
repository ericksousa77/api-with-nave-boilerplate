
import Naver from 'models/Naver'

export const create = async ctx => {

  const { body } = ctx.request;

  return Naver.query().insert({
    name: body.name,
    birthdate: body.birthdate,
    job_role: body.job_role,
    admission_date: body.admission_date
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


export default {
    create,
    index,
    show,

  }
