exports.seed = (knex) => {
  const insertAuthor = () => {
    return knex('author')
      .returning('id')
      .insert([
        { first_name: 'Tom', last_name: 'Coleman' },
        { first_name: 'Sashko', last_name: 'Stubailo' },
        { first_name: 'Mikhail', last_name: 'Novikov' },
      ]);
  };

  const insertPosts = (authorIds) => {
    const posts = authorIds.map(id => {
      return { author_id: parseInt(id, 10), title: `Hapi GraphQL post example for author ${id}`, votes: 1 };
    });

    return knex('post')
      .returning('id')
      .insert(posts);
  };

  return knex('post').del()
    .then(knex('author').del())
    .then(insertAuthor)
    .then(insertPosts);
};
