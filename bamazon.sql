DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL,
    product_name varchar(100) not null,
    department_name varchar(100) not null,
    price float NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Coke", "Beverages", 2.50, 50), (2, "Toilet Paper", "Toiletry", 2.99, 99), (3, "Kit Kat", "Confectionery", 1.50, 80), (4, "Air Jordans", "Shoes", 200, 22), (5, "Milk", "Beverages", 3.50, 20), (6, "Almonds", "Snacks", 0.5, 3000), (7, "Bananas", "Fruit", 0.89, 200), (8, "Harry Potter", "Books", 52.99, 8), (9, "Hawaiian Shirt", "Clothes", 27.99, 20), (10, "Fruit Punch", "Beverages", 5.50, 15);

select * from products;