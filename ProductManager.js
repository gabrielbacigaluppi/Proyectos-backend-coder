const { log } = require("console");
const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(info);
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
            return checkId ? checkId : "No existe producto con ese id";
        } catch (error) {
            return error;
        }
    }

    async updateProduct(productId, productProp) {
        try {
            // Traigo el producto a actualizar
            let product = await this.getProductById(productId);
            product = { ...product, ...productProp }


            // Encuentro el índice del objeto en el array
            const products = await this.getProducts();
            const indice = products.findIndex(objeto => objeto.id === productId);

            // Actualizo el producto en el array de productos
            if (indice !== -1) {
                products[indice] = product;
            } else {
                return 'El producto no se encontró en el archivo.'
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
            return 'Producto eliminado con exito'
        } catch (error) {
            return error;
        }
    }
}

const producto1 = {
    title: "cebolla",
    description: "morada",
    price: 120,
    thumbnail:
        "https://hiperlibertad.vtexassets.com/arquivos/ids/176852/CEBOLLA-x-500-g-1-17351.jpg?v=637546273212600000",
    code: 134,
    stock: 10,
};
const producto2 = {
    title: "mani",
    description: "sin cascara",
    price: 10,
    thumbnail:
        "https://thefoodtech.com/wp-content/uploads/2020/11/mani-beneficios-para-la-salud-1.jpg",
    code: 80,
    stock: 100,
};
const producto3 = {
    title: "papa",
    description: "tuberculo",
    price: 10,
    thumbnail:
        "https://www.eluniversal.com.mx/resizer/v7ykwXTJebIFvYyvxyy-1jRTw2s=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/3BOTUM6UEVGEVLBENUT3F3ZNZ4.jpg",
    code: 185,
    stock: 100,
};

async function test() {
    const carrito = new ProductManager("Products.json");
    // Test agregar producto
    // const resultado = await carrito.addProduct(producto3)
    // console.log(resultado);

    // // Test traer todos los productos
    // const products = await carrito.getProducts()
    // console.log(products);

    // Test de traer producto con id
    // const product = await carrito.getProductById(3)
    // console.log('El producto con ese id es: ',product);

    // Test eliminar producto con id
    // await carrito.deleteProduct(3)
    // const products = await carrito.getProducts()
    // console.log(products);

    // Test update de producto
    // const resultado = await carrito.updateProduct(1, {stock: 150, description:'cebolla morada'});
    // console.log(resultado);
    // const products = await carrito.getProducts();
    // console.log(products);
}

test();
