import Project from 'models/Project'

export const create = async ctx => {

  const { body } = ctx.request;

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

    return project
  }catch(err){
    console.log(err)
  }

}



export default{
  create,
  index,
  show
}
