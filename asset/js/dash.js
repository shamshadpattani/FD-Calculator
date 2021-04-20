
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
        'p-dropdown': dropdown
    },
    data() {
        return {
            maturityList:null,
            editingCellRows: {},
            editingRows: [],
            columns: null,
        }
    },
    originalRows: null,
    created() {
     
        this.columns = [
            {field: 'userId', header: 'Maturity Period'},
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
        onRowEditInit(event) {
            this.originalRows[event.index] = {...this.maturityList[event.index]};
            debugger;
        },
        onRowEditCancel(event) {
            Vue.set(this.maturityList, event.index, this.originalRows[event.index]);
            debugger;
        }
    }
    }).$mount('#app')