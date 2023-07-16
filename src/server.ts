import app from "./app";
import config from "./config";

import mongoose from 'mongoose';



async function main() {
   try {
      await mongoose.connect(config.database_url as string);
      console.log("🍕🍕 Database connected");
      app.listen(config.port, () => {
         console.log(`Example app listening on port ${config.port}`)
      })
   }
   catch (err) {
      console.log("😒😒Failed to connect database", err);
   }
}

main();