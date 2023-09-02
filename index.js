class ProductManager{
    constructor(){
        this.products=[]
    }

    addProduct(title,description,price,thumbnail,code,stock){

        if (title === undefined || description === undefined || price === undefined|| thumbnail === undefined|| code === undefined|| stock === undefined) {
            throw new Error('Deben especificarse todos los campos del producto nuevo');
        }

        const checkCode = this.products.find(p => p.code === code)
        if(checkCode){
            return 'Este codigo de producto ya existe'
        }
        const product = {
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock,
            id: 
                this.products.length
                ? this.products[this.products.length-1].id+1
                :1,
        }
        this.products.push(product)
    }

    getProduct(){
        return this.products
    }

    getProductById(productId){
        const checkId = this.products.find(p => p.id === productId)
        return checkId
        ? 
        checkId
        : 'Este producto no existe'
    }

}

const carrito1 = new ProductManager;

const resultado = carrito1.addProduct(
    "cebolla",
    "morada", 
    120,
    "https://hiperlibertad.vtexassets.com/arquivos/ids/176852/CEBOLLA-x-500-g-1-17351.jpg?v=637546273212600000",
    134,
    10
    )

const resultado2 = carrito1.addProduct(
    "mani",
    "sin cascara", 
    10,
    "https://thefoodtech.com/wp-content/uploads/2020/11/mani-beneficios-para-la-salud-1.jpg",
    64,
    100
    )

// console.log(resultado, resultado2)
// console.log(carrito1)
// console.log(carrito1.getProduct());

console.log(carrito1.getProductById(2))
console.log(carrito1.getProductById(1))
console.log(carrito1.getProductById(7))