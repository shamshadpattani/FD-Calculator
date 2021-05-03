var router = new VueRouter({
    mode: 'history',
    routes: []
});
new Vue({
    components: {
        'p-datatable': datatable,
        'p-row': row,
        'p-column': column,
        'p-columngroup': columngroup,
        'p-inputtext': inputtext,
        'p-button': button,
        'p-dialog': dialog,
        'p-toolbar': toolbar
    },
    data() {
        return {
            maturityList: null,
            editingRows: [],
            columns: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            submitted: false,
            product: {},
            filters: {}
        }
    },
    originalRows: null,
    created() {

        this.columns = [{
                field: 'date',
                header: 'Maturity Period'
            },
            {
                field: 'g',
                header: 'General'
            },
            {
                field: 'n',
                header: 'Senior Citizen'
            }
        ];

        this.originalRows = {};
    },
    mounted() {
        this.httpService = gettingHttpFunctions();
        this.getData();
    },
    methods: {

        formatDate(from, to) {
            return from + " days to " + to + " days"
        },
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        },
        getData: async function () {
            debugger;
            var vm = this;
            config = {
                method: "GET",
                path: '/interest'
            }
            var response = await this.httpService.mainAxiosRequest(config);
            debugger;
            if (response != undefined) {
                vm.maturityList = response.data;
                debugger;
            }
        },
        editData: async function (product) {
            var vm = this;

            var requestBody = {
                "id": product.id,
                "from": product.from,
                "to": product.to,
                "generalInterest": product.generalIntrest,
                "seniorInterest": product.seniorIntrest
            }
            config = {
                method: "PUT",
                path: '/data/' + product.id,
                data: requestBody

            }
            var response = await this.httpService.mainAxiosRequest(config);
            if (response != undefined) {
                if (response) {
                    // vm.maturityList = response;
                }
            }
        },
        addData: async function (product) {
            var vm = this;
            debugger;
            var requestBody = {
                "interestRate": {
                    "from": product.from.toString(),
                    "to": product.to.toString(),
                    "generalInterest": parseFloat(product.generalIntrest),
                    "seniorInterest": parseFloat(product.seniorIntrest)
                }
            }
            config = {
                method: "POST",
                path: '/interest',
                data: requestBody
            }
            var response = await this.httpService.mainAxiosRequest(config);
            if (response != undefined) {
                if (response) {
                    this.getData()
                    alert("Success")
                }
            } else {
                alert("error")
            }
        },
        deleteData: async function (id) {
            var vm = this;
            config = {
                method: "DELETE",
                path: '/interest/' + id
            }
            var response = await this.httpService.mainAxiosRequest(config);
            if (response != undefined) {
                if (response) {
                    vm.getData();    
            this.productDialog = false;
                }
            }
        },
        editProduct(maturityList) {
            this.product = {
                ...maturityList
            };
            this.productDialog = true;
            debugger;
        },

        addOrUpdateProduct() {
            this.submitted = true;
            if (this.product.id) {
                if (this.product.to <= this.product.from) {
                    alert("The edit date is not valid,please check dates")
                    this.product = {};
                } else {
                    from = parseInt(this.product.from)
                    to = parseInt(this.product.to)

                    this.maturityList.some(element => {
                        _from = parseInt(element.from)
                        _to = parseInt(element.to)
                        if (_from <= to && to <= _to) {
                            alert("The edit date is not valid,please check dates")
                            return true;
                        } else {

                            this.editData(this.product)
                            this.productDialog = false;
                            return false;
                        }
                    });
                }

            } else {
                this.product.id = this.createId();
                debugger;
                if (this.maturityList) {
                    //this.maturityList.push(this.product);
                    from = parseInt(this.product.from)
                    to = parseInt(this.product.to)
                    var valid = true;

                    this.maturityList.some(element => {
                        _from = parseInt(element.from)
                        _to = parseInt(element.to)
                        if (_from <= to && to <= _to) {
                            alert("The date is not valid,please check dates")
                            this.product = {};
                            valid = false;
                            return true;
                        }
                    });
                    if (valid) {
                        this.$set(this.maturityList, this.findIndexById(this.product.id), this.product);
                        this.addData(this.product)
                        this.productDialog = false;
                    }
                } else {
                    //this.$set(this.maturityList, this.findIndexById(this.product.id), this.product);
                    this.addData(this.product)
                }
            }
        },

        confirmDeleteProduct(maturityList) {
            this.product = maturityList;
            this.deleteProductDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        deleteProduct() {
            debugger;
            this.deleteData(this.product.id)
            debugger;
        },


        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.maturityList.length; i++) {
                if (this.maturityList[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = Math.floor(Math.random() * 100)
            return id;
        }
    }
}).$mount('#app')