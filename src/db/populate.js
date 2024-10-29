const sql =
  "INSERT INTO artworks (name, mediums, datecompleted, artist_id, museum_id, sold) VALUES('The Creation of Adam','Fresco', '1512-01-01', (SELECT id FROM artists WHERE artists.firstname = 'Michelangelo'), (SELECT id FROM museums WHERE museums.name = 'Butt Museum'), false)";
