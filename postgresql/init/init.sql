CREATE TABLE movie (
    id serial primary key,
    title varchar,
    release_date date,
    overview varchar,
    runtime integer
);

INSERT INTO movie (title, release_date, overview, runtime) VALUES
    ('The Dark Knight', '2008-07-18', 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.', 152),
    ('Inception', '2010-07-16','A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',148),
    ('The Matrix', '1999-03-31', 'A hacker discovers the truth about his reality and his role in the war against its controllers.', 136),
    ('The Lord of the Rings: The Fellowship of the Ring', '2001-12-19', 'A young hobbit and his companions set out on a quest to destroy a powerful ring.', 178),
    ('The Shawshank Redemption', '1994-09-22', 'Two imprisoned men bond over years, finding solace and eventual redemption.', 142),
    ('Avengers: Endgame', '2019-04-26', 'The Avengers assemble to undo the damage caused by Thanos and restore balance to the universe.', 181),
    ('Forrest Gump', '1994-07-06', 'The story of Forrest Gump, a man with a low IQ but a big heart, who unwittingly influences key historical events.', 142),
    ('The Lion King', '1994-06-15', 'A lion cub flees his kingdom only to learn the true meaning of responsibility and bravery.', 88),
    ('Interstellar', '2014-11-07', 'A group of explorers travels through a wormhole in space in an attempt to ensure humanity''s survival.', 169),
    ('Pulp Fiction', '1994-10-14', 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of crime and redemption.', 154)