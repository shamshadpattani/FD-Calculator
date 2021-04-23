
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
    },
    methods: {

        formatDate(from,to) {
            return from+ " days to "+to+" days"
        },
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        },
        getData:async function(){
            var vm=this;
            config={
                method: "GET",
                path:'/data'
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                if(response.length > 0 ){
                    vm.maturityList = response;
                }
            }
        },
        editData:async function(product){
            var vm=this;
           
            var requestBody={
                "id":product.id,
                "from": product.from,
                 "to":product.to,
            "generalIntrest": product.generalIntrest,
			"seniorIntrest": product.seniorIntrest
            }
            config={
                method: "PUT",
                path:'/data/'+product.id,
                data:requestBody
        
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                debugger;
                if(response ){
                    vm.maturityList = response;
                }
            }
        },
        addData:async function(product){
            var vm=this;
           
            var requestBody={
              "id":product.id,
              "from": product.from.toString(),
              "to":product.to.toString(),
              "generalIntrest": parseFloat(product.generalIntrest),
			  "seniorIntrest": parseFloat(product.seniorIntrest)
            }
            config={
                method: "POST",
                path:'/data',
                data:requestBody
        
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                if(response){
                 //  alert("success")
                }
            }else{
                alert("error")
            }
        },
        deleteData:async function(id){
            var vm=this;
        
            config={
                method: "DELETE",
                path:'/data/'+id
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                debugger;
                if(response ){
                    vm.maturityList =response
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
            debugger;
            this.deleteData(this.product.id)
            debugger;
        },
        addOrUpdateProduct() {
            this.submitted = true;
                if (this.product.id) {
                    this.$set(this.maturityList, this.findIndexById(this.product.id), this.product);
                    this.editData(this.product)
                    debugger;
                }
                else {
                    this.product.id = this.createId();
                    if(this.maturityList){
                        this.maturityList.push(this.product);
                    }
                    this.addData(this.product)
                }

                this.productDialog = false;
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