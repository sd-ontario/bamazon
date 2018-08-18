var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password:"root",
    database:"bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
});

runApp();

function runApp(){

    connection.query("SELECT item_id, department_name, product_name, price, stock_quantity FROM products", (err, rows) => {

        if(err) throw err;

        console.log("\nWelcome to my shop! This is what we have in stock today.");
        console.log("-------------------------------------\n")

        for(i=0;i<rows.length;i++){
            console.log(JSON.stringify(rows[i].product_name));
            console.log("Department:", JSON.stringify(rows[i].department_name));
            console.log("Item ID:", JSON.stringify(rows[i].item_id));
            console.log("Price:", "$" + JSON.stringify(rows[i].price));
            console.log("Quantity in Stock:", JSON.stringify(rows[i].stock_quantity) + "\n");
        };

        inquireCustomer();
        
    }); 
};

function inquireCustomer(){
    inquirer.prompt({
        name: "get_id",
        type:"input",
        message:"Type the ID of the product you wish to purchase. Press Ctrl+C to exit."
    }).then(function(answer){

        var ID = answer.get_id;

        if(ID > 10){
            console.log("\nPlease choose a valid item ID!\n");
            inquireCustomer();
        }
        else{

            connection.query("SELECT item_id, product_name, price FROM products", (err, rows) => {

                if(err) throw err;

                var productName = rows[(ID-1)].product_name;
                var price = rows[(ID-1)].price;
    
                console.log("\nYou've selected:", productName + "\n");
                buyUnits(ID, productName, price);
            
    
            });
        }
        
       
    })

};

function buyUnits(itemID, productName, itemPrice){

    inquirer.prompt({
        name: "quantity",
        type:"input",
        message:"How many units would you like to purchase?"
    }).then(function(answer){

        var ID = itemID;
        var product = productName;
        var quantity = answer.quantity;
        var price = itemPrice;
        var cost = price*quantity;

        var query = "SELECT stock_quantity FROM products";
        connection.query(query, (err, rows) => {

            if(err) throw err;

            if (quantity > rows[ID-1].stock_quantity){
                console.log("\nSorry, we don't have enough in stock for that order!\n");
                buyUnits(ID);
            }
            else{

                var remain = rows[ID-1].stock_quantity - quantity;
               

                var update = "UPDATE products SET stock_quantity = ? WHERE item_ID = ?";
                connection.query(update, [remain, ID], (err, results) => {

                    if(err) throw err;


                    console.log("\nYour order of " + quantity +" "+ product + " comes to $" + cost);
                    console.log("\nThank you for your purchase!\n");
                    runApp();
                    

                })
            }
        })

        

    

    })

}
