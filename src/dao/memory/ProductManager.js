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
		const { title, description, code, price, status = true, stock, category, thumbnail } = obj;
		try {
			if (
				title === undefined ||
				description === undefined ||
				code === undefined ||
				price === undefined ||
				stock === undefined ||
				category === undefined
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
			return checkId;
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
			if (indice === -1) {
				return -1
			}

			// Actualizo el producto en el array de productos
			products[indice] = product;

			// Guardo en mi archivo el nuevo array con el producto actualizado
			await fs.promises.writeFile(this.path, JSON.stringify(products));
			return 1

		} catch (error) {
			return error;
		}
	}

	async deleteProduct(productId) {
		try {
			const products = await this.getProducts()
			const product = products.find(u => u.id === productId)
			if (!product) {
				return -1
			}
			const newArrayProducts = products.filter(u => u.id !== productId)

			await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
			return 1

		} catch (error) {
			return error;
		}
	}
}

const productos = [
	{
		title: "Laptop Dell XPS 13",
		description: "Portátil de alto rendimiento",
		code: "1001",
		price: 1299.99,
		status: true,
		stock: 20,
		category: "Tecnología",
		thumbnails: [
			"ruta1/imagen1.jpg",
			"ruta1/imagen2.jpg"
		]
	},
	{
		title: "Teléfono Samsung Galaxy S22",
		description: "Teléfono inteligente de última generación",
		code: "1002",
		price: 899.99,
		status: true,
		stock: 30,
		category: "Tecnología",
		thumbnails: [
			"ruta2/imagen1.jpg",
			"ruta2/imagen2.jpg"
		]
	},
	{
		title: "Cámara Canon EOS 5D Mark IV",
		description: "Cámara DSLR profesional",
		code: "1003",
		price: 2499.99,
		status: true,
		stock: 10,
		category: "Fotografía",
		thumbnails: [
			"ruta3/imagen1.jpg",
			"ruta3/imagen2.jpg"
		]
	},
	{
		title: "Zapatillas Nike Air Max",
		description: "Zapatillas deportivas cómodas",
		code: "1004",
		price: 99.99,
		status: true,
		stock: 50,
		category: "Calzado",
		thumbnails: [
			"ruta4/imagen1.jpg",
			"ruta4/imagen2.jpg"
		]
	},
	{
		title: "Libro: 'La Sombra del Viento'",
		description: "Novela de misterio y aventura",
		code: "1005",
		price: 15.99,
		status: true,
		stock: 15,
		category: "Libros",
		thumbnails: [
			"ruta5/imagen1.jpg",
			"ruta5/imagen2.jpg"
		]
	},
	{
		title: "Camiseta Adidas Originals",
		description: "Camiseta deportiva de alta calidad",
		code: "1006",
		price: 29.99,
		status: true,
		stock: 25,
		category: "Ropa",
		thumbnails: [
			"ruta6/imagen1.jpg",
			"ruta6/imagen2.jpg"
		]
	},
	{
		title: "Silla de Oficina Ergonómica",
		description: "Silla cómoda para largas horas de trabajo",
		code: "1007",
		price: 199.99,
		status: true,
		stock: 10,
		category: "Muebles",
		thumbnails: [
			"ruta7/imagen1.jpg",
			"ruta7/imagen2.jpg"
		]
	},
	{
		title: "Auriculares Inalámbricos Sony",
		description: "Auriculares con cancelación de ruido",
		code: "1008",
		price: 149.99,
		status: true,
		stock: 40,
		category: "Tecnología",
		thumbnails: [
			"ruta8/imagen1.jpg",
			"ruta8/imagen2.jpg"
		]
	},
	{
		title: "Bicicleta de Montaña Trek",
		description: "Bicicleta para aventuras al aire libre",
		code: "1009",
		price: 599.99,
		status: true,
		stock: 5,
		category: "Deportes",
		thumbnails: [
			"ruta9/imagen1.jpg",
			"ruta9/imagen2.jpg"
		]
	},
	{
		title: "Juego de Mesa 'Catan'",
		description: "Juego de estrategia para toda la familia",
		code: "1010",
		price: 39.99,
		status: true,
		stock: 20,
		category: "Juegos",
		thumbnails: [
			"ruta10/imagen1.jpg",
			"ruta10/imagen2.jpg"
		]
	}
];


/*   async function test() {
	  const carrito = new ProductManager("Products.json");
	  // Test agregar productos
  
	  for (let i = 0; i < productos.length; i++) {
		  const producto = productos[i];
		  let resultado = await carrito.addProduct(producto)
		  console.log(resultado);
	  }
  
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
  
test();  */
const productsManager = new ProductManager("src/Products.json");
export default productsManager






