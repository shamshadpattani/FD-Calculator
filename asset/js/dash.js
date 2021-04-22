
var router = new VueRouter({
    mode: 'history',
    routes: []
});
new Vue({
    components: {
        'p-datatable' : datatable,
        'p-row':row,
        'p-column':column,
        'p-columngroup':columngroup,
        'p-inputtext':inputtext,
        'p-button':button,
        'p-dialog':dialog,
        'p-toolbar':toolbar
    },
    data() {
        return {
            maturityList:null,
            editingRows: [],
            columns: null,
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            submitted: false,
            product:{},
            filters: {}
        }
    },
    originalRows: null,
    created() {
     
        this.columns = [
            {field: 'date', header: 'Maturity Period'},
            {field: 'g', header: 'General'},
            {field: 'n', header: 'Senior Citizen'}
        ];

        this.originalRows = {};  
    },
    mounted(){
        this.httpService=gettingHttpFunctions();
        this.getData();
        // var queryParams = this.$route.query;
        // if(queryParams != undefined && queryParams.access_token != undefined ){
        //     localStorage.setItem("accessToken", queryParams.access_token)
        // }
        // console.log(this.$route.query)
    },
    methods: {
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        },
        getJsonFormattedData:function(data){
            var vm = this;
            var formattedJsonObject=[];
            data.forEach(function(v,i) {
                formattedJsonObject.push({
                    id: i+1,
                    date: v.from+" days to "+v.to+" days",
                    g:v.generalIntrest+"%",
                    n:v.seniorIntrest+"%"
                });
                
            });
            return formattedJsonObject
        },
        getData:async function(){
            var vm=this;
            config={
                method: "GET",
                path:'/helloworld/master/fdIntrest'
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                if(response.data.length > 0 ){
                    vm.maturityList = vm.getJsonFormattedData(response.data);
                }
            }
        },
        editProduct(maturityList) {
            this.product = {...maturityList};
            this.productDialog = true;
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
            this.maturityList = this.maturityList.filter(val => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        },
        saveProduct() {
            this.submitted = true;

            if (this.product.date.trim()) {
                if (this.product.id) {
                    this.$set(this.maturityList, this.findIndexById(this.product.id), this.product);
                    // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                    // alert("updated")
                }
                else {
                    this.product.id = this.createId();
                    this.maturityList.push(this.product);
                    // this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
                }

                this.productDialog = false;
                this.product = {};
            }
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
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
    }
    }).$mount('#app')