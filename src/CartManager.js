import { log } from "console";
import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        return info;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addCart(arrayProducts) {
    try {
      const carts = await this.getCarts();
      let id = carts.length ? carts[carts.length - 1].id + 1 : 1;
      carts.push({ id, ...arrayProducts });
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return "Carrito agregado con exito";
    } catch (error) {
      return error;
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const checkId = carts.find((p) => p.id === cartId);
      return checkId;
    } catch (error) {
      return error;
    }
  }

  async addProductInCartbyId(idCart, idProduct,newProduct) {
    try {
      const carts = await this.getCarts();
      const indexCart = carts.findIndex((p) => p.id === idCart);
      if (indexCart !== -1) {
        const indexProduct = carts[indexCart].products.findIndex(
          (producto) => producto.id === idProduct
        );
        if (indexProduct !== -1) {
          carts[indexCart].products[indexProduct].quantity += newProduct.quantity;
        } else {
          carts[indexCart].products.push(newProduct);
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return carts[indexCart];
      } else {
        return "No se encontro el id del carrito";
      }
    } catch (error) {
      return error;
    }
  }
}

// const carrito1 = {
//   products: [
//     {
//       id: 4,
//       quantity: 5,
//     },
//     {
//       id: 3,
//       quantity: 2,
//     },
//   ],
// };

// async function test(cart) {
//   const cartsManager = new CartManager("Carts.json");
//   // await cartsManager.addCart(cart);
//   console.log(
//     await cartsManager.addProductInCartbyId(2, { id: 2, quantity: 50 })
//   );
//   // console.log(await cartsManager.getCarts());
// }
// test(carrito1);

const cartsManager = new CartManager("Carts.json");
export default cartsManager;
