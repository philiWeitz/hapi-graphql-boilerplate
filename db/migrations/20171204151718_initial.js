
exports.up = (knex) => {
  return knex.schema
    .createTable('author', table => {
      table.bigincrements('id').primary().index();
      table.string('first_name', 128).notNullable();
      table.string('last_name', 128).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('post', table => {
      table.bigincrements('id').primary().index();
      table.string('title', 128).notNullable();
      table.integer('votes').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.biginteger('author_id')
        .unsigned()
        .references('id')
        .inTable('author')
        .onDelete('CASCADE')
        .notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('post')
    .dropTableIfExists('author');
};
