CREATE TABLE recipe_instructions (
  user_id INT,
  recipe_id VARCHAR(45),
  equipment VARCHAR(45),
  PRIMARY KEY (user_id, recipe_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);