export const up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS CITEXT')
    .raw(
      `CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ language 'plpgsql';`
    )
    .createTable('navers', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.date('birthdate').notNullable()
      table.string('job_role').notNullable()
      table.date('admission_date').notNullable()
      table.string('user_id').notNullable()
      table.timestamps(true, true)
    })
    .raw(
      `CREATE TRIGGER update_navers_updated_at BEFORE UPDATE
      ON navers FOR EACH ROW EXECUTE PROCEDURE
      update_updated_at_column();`
    )


export const down = knex =>
  knex.schema
    .dropTableIfExists('navers')

