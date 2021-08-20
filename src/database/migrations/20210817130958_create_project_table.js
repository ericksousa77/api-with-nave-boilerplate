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
    .createTable('projects', table => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.uuid('user_id').unsigned()
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
    .createTable('projects_navers', table => {
      table.uuid('id').primary()
      table.uuid('naver_id').unsigned()
      table
        .foreign('naver_id')
        .references('id')
        .inTable('navers')
        .onDelete('CASCADE')

      table.uuid('project_id').unsigned()
      table
        .foreign('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')

      table.timestamps(true, true)
    })
    .raw(
      `CREATE TRIGGER update_projects_updated_at BEFORE UPDATE
      ON projects FOR EACH ROW EXECUTE PROCEDURE
      update_updated_at_column();`
    )


export const down = knex =>
  knex.schema
    .dropTableIfExists('projects_navers')
    .dropTableIfExists('projects')




