import mongoose from "mongoose";
import { usersManager } from "../src/dao/mongo/usersManager.js";
import Assert from 'assert'
import config from "../src/config/config.js"

const URI = config.mongo_uri

before(async function() {
    this.timeout(10000); // Ajusta el tiempo de espera si es necesario
    await mongoose.connect(URI);
    console.log("Conectado a la base de datos");
  });
// mongoose
//   .connect(URI)
//   .then(() => console.log("Conectado a la base de datos"))
//   .catch((error) => console.log(error));

const assert = Assert.strict



describe("Testing users Dao", ()=> {
    // before( function(){
    //     this.usersManager = new usersModel()
    // })
    // beforeEach( function() {
    //     this.timeout(5000)
    // })

    it("Debe devolver un arreglo", function(){
        console.log(usersManager.findAll());
        // const result = await this.usersManager.findAll()
        const result = usersManager.findAll()
        assert.strictEqual(Array.isArray(result), true)

    })
})