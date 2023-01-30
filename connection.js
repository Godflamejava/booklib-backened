const {Sequelize , DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
     {
       host:  process.env.DB_HOST,
       dialect: process.env.DB_DIALECT,
       socketPath: process.env.DB_SOCKETPATH
     }
   );

   // creating table 
  const book_table = sequelize.define(
    "book_table",
    {
      title:{
      type: DataTypes.CHAR(100),
      unique: true,
      allowNull: false,
      primaryKey: false
      }, 
      author: {
        type: DataTypes.TEXT,
        allowNull: false
        }, 
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    },
    { tableName: "book_table" }
  );
  
  //syncing table
  book_table.sync();
  sequelize
  .authenticate()
  .then(() => {
    console.log("Connected")
  })
  .catch((err) => console.log("Not Connected"));

module.exports=book_table;




