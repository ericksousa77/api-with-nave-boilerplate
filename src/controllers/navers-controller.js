import Naver from 'models/Naver'

import { NotFound, getPagination } from 'helpers'

export const create = async ctx => {
  const { body } = ctx.request

  //insertGraph
  const naver = await Naver.query().insertGraph({
    name: body.name,
    birthdate: body.birthdate,
    job_role: body.job_role,
    admission_date: body.admission_date,
    user_id: ctx.state.user.id,
    projectnaver: body.projects //atenção ao nome igual ao da relação
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
    order = 'desc'
    // created_at
  } = ctx.query

  const { page, pageSize, calculatePageCount } = getPagination(ctx.query)

  const navers = await Naver.query()

    .where(builder => {
      if (name) builder.where('name', 'ilike', `%${name}%`)

      if (birthdate) builder.whereRaw('date(birthdate) = ?', birthdate)

      if (admission_date)
        builder.whereRaw('date(admission_date) = ?', admission_date)

      if (job_role) builder.where('job_role', 'ilike', `%${job_role}%`)

      // if (created_at) builder.whereRaw('date(created_at) = ?', created_at)
    })
    .orderBy(sort, order)
    .withGraphJoined('projects')
    .page(page, pageSize)

  return {
    ...navers,
    page: page + 1,
    pageCount: calculatePageCount(navers.total)
  }
}

export const show = async ctx =>
  Naver.query()
    .findOne({ 'navers.id': ctx.params.id })
    .withGraphJoined('projects')
    .throwIfNotFound()

export const destroy = ctx =>
  Naver.query()
    .deleteById(ctx.params.id)
    .where({ user_id: ctx.state.user.id })
    .returning('*')

export const update = async ctx => {
  const { body } = ctx.request

  console.log(ctx.params.id)
  const naver = await Naver.query()
    .findOne({ id: ctx.params.id })
    .catch(() => {
      throw new NotFound('Naver not found')
    })

  if (naver.user_id !== ctx.state.user.id)
    return { message: 'user not have this naver' }

  return Naver.query().upsertGraph({
    id: ctx.params.id,
    name: body.name,
    birthdate: body.birthdate,
    admission_date: body.admission_date,
    job_role: body.job_role,

    projectnaver: body.projects
  })
}

export default {
  create,
  index,
  show,
  destroy,
  update
}
