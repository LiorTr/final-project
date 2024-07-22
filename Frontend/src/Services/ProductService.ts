import axios, { AxiosRequestConfig } from "axios";
import { ProductModel } from "../Models/ProductModel";
import { appConfig } from "../Utils/AppConfig";
import { productActions, store } from "../Redux/store";

class ProductService {

    public async getAllProducts() {

        // If we have products in the global state - return them, without fetching from server:
        if (store.getState().products) return store.getState().products;

        // We don't have products in the global state - fetch them from backend: 
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);
        const products = response.data;

        // Init all products in the global state: 
        const action = productActions.initProducts(products);
        store.dispatch(action);

        // Return:
        return products;
    }

    public async addProduct(product: ProductModel) {

        // Send product to backend: 
        const options: AxiosRequestConfig = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);

        // Don't add that product to redux if global state is empty:
        if(!store.getState().products) return;

        // Get back the added product: 
        const addedProduct = response.data;
        
        // Send added product to global state: 
        const action = productActions.addProduct(addedProduct);
        store.dispatch(action);
    }

}

export const productService = new ProductService();
