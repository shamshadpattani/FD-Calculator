import axios from 'axios';


export default class productService {

    getProductsSmall() {
		return axios.get('product.json').then(res => res.data.data);
	}

	getProducts() {
		return axios.get('demo/data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
		return axios.get('demo/data/products-orders-small.json').then(res => res.data.data);
	}
}
