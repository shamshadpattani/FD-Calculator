new Vue({
    components: {
        'p-datatable' : datatable,
        'p-row':row,
        'p-column':column,
        'p-columngroup':columngroup,
        'p-inputtext':inputtext,
        'p-dropdown': dropdown
    },
    data() {
        return {
            editingCellRows: {},
            editingRows: [],
            columns: null,
            products1: null,
            products2: null,
            products3: null,
            statuses: [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
        }
    },
    originalRows: null,
    productService: null,
    created() {
        this.productService = new ProductService();

        this.columns = [
            {field: 'userId', header: 'userId'},
            {field: 'id', header: 'id'},
            {field: 'title', header: 'title'},
            {field: 'body', header: 'body'}
        ];

        this.originalRows = {};
    },
    methods: {
        getProductsSmall() {
            return axios.get('product.json').then(res => res.data.data);
        },
        onCellEditComplete(event) {
            if (!this.editingCellRows[event.index]) {
                return;
            }

            const editingCellValue = this.editingCellRows[event.index][event.field];

            switch (event.field) {
                case 'quantity':
                case 'price':
                    if (this.isPositiveInteger(editingCellValue))
                        Vue.set(this.products2, event.index, this.editingCellRows[event.index]);
                    else
                        event.preventDefault();
                break;

                default:
                    if (editingCellValue.trim().length > 0)
                        Vue.set(this.products2, event.index, this.editingCellRows[event.index]);
                    else
                        event.preventDefault();
                break;
            }
        },
        onCellEdit(newValue, props) {
            if (!this.editingCellRows[props.index]) {
                this.editingCellRows[props.index] = {...props.data};
            }

            this.editingCellRows[props.index][props.column.field] = newValue;
        },
        isPositiveInteger(val) {
            let str = String(val);
            str = str.trim();
            if (!str) {
                return false;
            }
            str = str.replace(/^0+/, "") || "0";
            var n = Math.floor(Number(str));
            return n !== Infinity && String(n) === str && n >= 0;
        },
        onRowEditInit(event) {
            this.originalRows[event.index] = {...this.products3[event.index]};
        },
        onRowEditCancel(event) {
            Vue.set(this.products3, event.index, this.originalRows[event.index]);
        },
        getStatusLabel(status) {
            switch(status) {
                case 'INSTOCK':
                    return 'In Stock';

                case 'LOWSTOCK':
                    return 'Low Stock';

                case 'OUTOFSTOCK':
                    return 'Out of Stock';

                default:
                    return 'NA';
            }
        }
    },
    mounted() {
        // this.productService.getProductsSmall().then(data => this.products1 = data);
        // this.productService.getProductsSmall().then(data => this.products2 = data);
        // this.productService.getProductsSmall().then(data => this.products3 = data);
        Vue.axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
            this.products3 = response.data;
            console.log(this.products3)
        })
    }
    }).$mount('#app')