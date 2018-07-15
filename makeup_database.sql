Create database makeup;
USE makeup;


CREATE table users(
   id INTEGER auto_increment PRIMARY KEY,
   username VARCHAR(100) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   email VARCHAR(100) NOT NULL,
   birthday DATE NOT NULL,
   zipcode INTEGER NOT NULL
   );

   CREATE table products(
   upc_id INTEGER NOT NULL auto_increment PRIMARY KEY,
   category VARCHAR(255) NOT NULL,
   brand VARCHAR(255)
   );
    
  
    CREATE table listings(
    record_id INTEGER auto_increment PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INTEGER NOT NULL,
    upc_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    best_use_period INTEGER NOT NULL,
    price INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(upc_id) REFERENCES products(upc_id)
    );
   