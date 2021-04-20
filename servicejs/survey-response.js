var router = new VueRouter({
    mode: 'history',
    routes: []
});

new Vue({
    components: {
        'p-button': button,
        'p-textarea':textarea,
        'p-card':card,
        'p-breadcrumb':breadcrumb,
        'p-checkbox':checkbox,
        'p-rating':rating,
        'p-radiobutton':radiobutton
    },
    data() {
        return {
            cities:[],
            checked:false,
            ratingVal:'',
            city:null,
            getSurveyType: '',
            getSurveyDescription: '',
            getUserSurvey:''
        } 
    },
    mounted(){
            this.httpService=gettingHttpFunctions();
            this.getSearchByQuery();
    }, 
    methods:{
        userPageData(){
            sessionStorage.getUserSurvey=this.getUserSurvey
            // window.location= "https://smartsurvey.autoprojects.co/user-page.html";
            window.location= "http://127.0.0.1:5501/user-page.html";
        },
        getSearchByQuery:async function(){
            var vm=this;

            var requestBody={
                "type":"customer",
                "nodeCode": "AGY007"
            }

            config={
                method: "POST",
                path:'survey/searchByQuery',
                data:JSON.stringify(requestBody)
            }
            var response= await this.httpService.mainAxiosRequest(config);
            if(response != undefined){
                vm.getSurveyType = response.data.type;
                vm.getSurveyDescription = response.data.uiSpec.specification.suveyDescription;
                vm.getUserSurvey = JSON.stringify(response.data);
            }
        }
    }
  
}).$mount('#app')