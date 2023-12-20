import { fakerES as faker } from "@faker-js/faker";

const generateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        price: faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
        category: faker.commerce.department(),
        stock: faker.number.int(100),
    };
    return product;
};

function generateMockProducts(count) {
    const mockProducts = [];

    for (let i = 1; i <= count; i++) {
        const product = generateProduct();
        mockProducts.push(product);
    }

    return mockProducts;
}

export const fakeProducts = (req, res) => {
    try {
        const products = generateMockProducts(100);
        res.status(200).json({ message: 'fake products created', products: products });

    } catch (error) {
        res.status(500).json({ message: error });
    }
};
