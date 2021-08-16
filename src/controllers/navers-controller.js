
import Naver from 'models/Naver'

export const create = async ctx => {

    const { body } = ctx.request;

    console.log(ctx.request);

    return Naver.query().insert({
      name: body.name,
      birthdate: body.birthdate,
      job_role: body.job_role,
    })
}

export default {
    create,
  }
