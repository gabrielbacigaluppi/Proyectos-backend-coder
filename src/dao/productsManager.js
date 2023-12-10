import { productsModel } from "./models/products.model.js";
import BasicManager from "./BasicManager.js";

class ProductsManager extends BasicManager {
    constructor() {
        super(productsModel);
    }
    async findAll(opt) {
        const { limit, page, sort, category } = opt;
        const actualLimit = limit || 10;
        const actualPage = page || 1;
        const filter = {};

        if (category) {
            filter.category = category;
        }

        const result = await productsModel.paginate(
            filter,
            { limit: actualLimit, page: actualPage, sort }
        );
        const info = {
            status: result.totalDocs ? "success" : "error",
            count: result.totalDocs,
            payload: result.docs,
            pages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prev: result.hasPrevPage
                ? `http://localhost:8080/api/products?page=${result.prevPage}`
                : null,
            next: result.hasNextPage
                ? `http://localhost:8080/api/products?page=${result.nextPage}`
                : null,
        };
        return { info };
    }
}

export const productsManager = new ProductsManager();
