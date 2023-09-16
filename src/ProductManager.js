// const { log } = require("console");
// const fs = require("fs");
import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    
    async getProducts(limit) {
        try {
            if (fs.existsSync(this.path)) {
                const info = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

                if (limit) {
                    // Limito la cantidad de objetos en el array a devolver si asi se especifico
                    const limitedInfo = info.slice(0, limit);
                    return limitedInfo;
                }

                return info;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    async addProduct(obj) {
        const { title, description, price, thumbnail, code, stock } = obj;
        try {
            if (
                title === undefined ||
                description === undefined ||
                price === undefined ||
                thumbnail === undefined ||
                code === undefined ||
                stock === undefined
            ) {
                throw new Error(
                    "Deben especificarse todos los campos del producto nuevo"
                );
            }
            const products = await this.getProducts();
            const checkCode = products.find((p) => p.code === code);
            if (checkCode) {
                return "Este codigo de producto ya existe";
            }
            let id = products.length ? products[products.length - 1].id + 1 : 1;

            products.push({ id, ...obj });
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return "Producto agregado con exito";
        } catch (error) {
            return error;
        }
    }

    async getProductById(productId) {
        try {
            const products = await this.getProducts();
            const checkId = products.find((p) => p.id === productId);
            return checkId ;
            // return checkId ? checkId : "No existe producto con ese id";
        } catch (error) {
            return error;
        }
    }

    async updateProduct(productId, productProp) {
        try {
            // Traigo el producto a actualizar
            let product = await this.getProductById(productId);
            product = { ...product, ...productProp };

            // Encuentro el índice del objeto en el array
            const products = await this.getProducts();
            const indice = products.findIndex((objeto) => objeto.id === productId);

            // Actualizo el producto en el array de productos
            if (indice !== -1) {
                products[indice] = product;
            } else {
                return "El producto no se encontró en el archivo.";
            }

            // Guardo en mi archivo el nuevo array con el producto actualizado
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return "Producto actualizado con exito";
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(productId) {
        try {
            const products = await this.getProducts();
            const newArrayProducts = products.filter((u) => u.id !== productId);
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
            return "Producto eliminado con exito";
        } catch (error) {
            return error;
        }
    }
}

const productos = [
    {
        title: "Cebolla",
        description: "Morada",
        price: 120,
        thumbnail:
            "https://hiperlibertad.vtexassets.com/arquivos/ids/176852/CEBOLLA-x-500-g-1-17351.jpg?v=637546273212600000",
        code: 134,
        stock: 10,
    },
    {
        title: "Maní",
        description: "Sin cáscara",
        price: 10,
        thumbnail:
            "https://thefoodtech.com/wp-content/uploads/2020/11/mani-beneficios-para-la-salud-1.jpg",
        code: 80,
        stock: 100,
    },
    {
        title: "Papa",
        description: "Tubérculo",
        price: 10,
        thumbnail:
            "https://www.eluniversal.com.mx/resizer/v7ykwXTJebIFvYyvxyy-1jRTw2s=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/3BOTUM6UEVGEVLBENUT3F3ZNZ4.jpg",
        code: 185,
        stock: 100,
    },
    {
        title: "Tomate",
        description: "Rojo y jugoso",
        price: 25,
        thumbnail:
            "https://www.eluniversal.com.mx/sites/default/files/2021/07/29/tomate-maduro-fruta.jpg",
        code: 222,
        stock: 50,
    },
    {
        title: "Lechuga",
        description: "Fresca y crujiente",
        price: 15,
        thumbnail:
            "https://image.freepik.com/foto-gratis/lechuga-fresca-verde-aislada-fondo-blanco_318-93668.jpg",
        code: 312,
        stock: 30,
    },
    {
        title: "Zanahoria",
        description: "Naranja y saludable",
        price: 8,
        thumbnail:
            "https://cdn-pro.elsalvador.com/wp-content/uploads/2019/08/zanahoria.jpg",
        code: 418,
        stock: 75,
    },
    {
        title: "Manzana",
        description: "Verde y deliciosa",
        price: 30,
        thumbnail:
            "https://ichef.bbci.co.uk/news/660/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
        code: 523,
        stock: 40,
    },
    {
        title: "Pera",
        description: "Jugosa y dulce",
        price: 28,
        thumbnail:
            "https://i.pinimg.com/originals/65/a9/60/65a96051de7696c4752e6239a2c1cc48.jpg",
        code: 629,
        stock: 45,
    },
    {
        title: "Sandía",
        description: "Refrescante y veraniega",
        price: 40,
        thumbnail:
            "https://www.thekitchn.com/thmb/eEx7NWVzUSw_lfEFGON3YlvOmuA=/2684x2684/smart/filters:no_upscale()/GettyImages-1213668263-9a055149b3bf4ea2847a35fb8c07df5a.jpg",
        code: 714,
        stock: 20,
    },
    {
        title: "Pera",
        description: "Jugosa y dulce",
        price: 28,
        thumbnail:
            "https://i.pinimg.com/originals/65/a9/60/65a96051de7696c4752e6239a2c1cc48.jpg",
        code: 812,
        stock: 55,
    },
    {
        title: "Plátano",
        description: "Maduro y energético",
        price: 12,
        thumbnail:
            "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/bananas-on-a-bunch-3e26999.jpg?quality=90&resize=960,872",
        code: 921,
        stock: 65,
    },
    {
        title: "Pepino",
        description: "Refrescante y saludable",
        price: 7,
        thumbnail:
            "https://image.freepik.com/foto-gratis/pepino-aislado_8087-2254.jpg",
        code: 1034,
        stock: 90,
    },
    {
        title: "Naranja",
        description: "Cítrica y vitaminada",
        price: 18,
        thumbnail:
            "https://previews.123rf.com/images/jacekchabraszewski/jacekchabraszewski1708/jacekchabraszewski170800211/84636019-naranja-en-el-fondo-blanco.jpg",
        code: 1156,
        stock: 55,
    },
    {
        title: "Uvas",
        description: "Dulces y jugosas",
        price: 35,
        thumbnail:
            "https://image.freepik.com/foto-gratis/uvas-rojas-fondo-blanco_40653-439.jpg",
        code: 1277,
        stock: 35,
    },
    {
        title: "Melón",
        description: "Aromático y veraniego",
        price: 32,
        thumbnail:
            "https://www.thespruceeats.com/thmb/mD1oFrN7Q1LoEXmE2vL_cQHo-HA=/1335x1001/smart/filters:no_upscale()/GettyImages-920425432-5bd9eabb46e0fb00263481bb.jpg",
        code: 1365,
        stock: 30,
    },
    {
        title: "Kiwi",
        description: "Exótico y saludable",
        price: 22,
        thumbnail:
            "https://i.pinimg.com/originals/a2/49/d6/a249d6b30ce2e0c4b5f173615959144c.jpg",
        code: 1423,
        stock: 40,
    },
    {
        title: "Mango",
        description: "Dulce y tropical",
        price: 27,
        thumbnail: "https://cdn.shopify.com/s/files/1/0201/7948/products/mango.jpg",
        code: 1512,
        stock: 25,
    },
    {
        title: "Limón",
        description: "Ácido y refrescante",
        price: 6,
        thumbnail: "https://image.freepik.com/foto-gratis/limones_1220-1032.jpg",
        code: 1665,
        stock: 70,
    },
    {
        title: "Cereza",
        description: "Pequeña y sabrosa",
        price: 45,
        thumbnail:
            "https://image.freepik.com/foto-gratis/cerezas-rojas-aisladas-sobre-fondo-blanco_149065-1439.jpg",
        code: 1782,
        stock: 15,
    },
];

// async function test() {
//     // const carrito = new ProductManager("Products.json");
//     // // Test agregar productos

//     // for (let i = 0; i < productos.length; i++) {
//     //     const producto = productos[i];
//     //     let resultado = await carrito.addProduct(producto)
//     //     console.log(resultado);
//     // }

//     // // Test traer todos los productos
//     // const products = await carrito.getProducts()
//     // console.log(products);

//     // Test de traer producto con id
//     // const product = await carrito.getProductById(3)
//     // console.log('El producto con ese id es: ',product);

//     // Test eliminar producto con id
//     // await carrito.deleteProduct(3)
//     // const products = await carrito.getProducts()
//     // console.log(products);

//     // Test update de producto
//     // const resultado = await carrito.updateProduct(1, {stock: 150, description:'cebolla morada'});
//     // console.log(resultado);
//     // const products = await carrito.getProducts();
//     // console.log(products);
// }

// test();

export const productsManager = new ProductManager("Products.json");
