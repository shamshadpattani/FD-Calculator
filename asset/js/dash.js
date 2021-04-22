
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
        'p-dialog':dialog
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
            product:{}
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
    },
    methods: {
        getJsonFormattedData:function(data){
            debugger;
            var vm = this;
            var formattedJsonObject=[];
            debugger;
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
                path:'/data'
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                debugger;
                if(response.length > 0 ){
                    vm.maturityList = vm.getJsonFormattedData(response);
                    debugger;
                }
            }
        },
        editData:async function(product){
            var vm=this;
           
            var requestBody={
                "id":product.id,
                "from": product.date.trim
                 "to":
            "generalIntrest": 5.0,
			"seniorIntrest": 6.5
            }
            config={
                method: "PUT",
                path:'/data/'+product.id,
            
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                debugger;
                if(response.length > 0 ){
                    vm.maturityList = vm.getJsonFormattedData(response);
                    debugger;
                }
            }
        },
        editProduct(maturityList) {
            this.product = {...maturityList};
            this.productDialog = true;
            debugger;
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
                    this.editData(this.product)
                    debugger;
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