const routes = [
    {
        path: '/summary',
        component: summary
    },
    {
        path: '/questions',
        component: questions
    },
    {
        path: '/surveyCreated',
        component: surveyCreated
    },
    {
        path: '/preview',
        component: preview
    },
    {
        path: '/dash',
        component: dash
    }
];
const router = new VueRouter({
    routes // short for `routes: routes`
})
new Vue({
        router,
        components: {
            'Steps':steps,
            's-header': SmartSurveyHeader,
            's-footer': SmartSurveyFooter,
            's-breadcrumb': SmartSurveyBreadcrumb
        },
        data(){
            return{
                home: {label: 'Dashboard', to: '/dash'},
                breadcrumb_items: [
                    {label: 'Create Survey'}
                ],
                sessionUserData:{},
                
                items: [{
                    label: 'Summary',
                    to: '/'
                },
                {
                    label: 'Add Questions',
                    to: '/questions'
                },
                {
                    label: 'Survey Created',
                    to: '/surveyCreated'
                },
                {
                    label: 'Preview Questions',
                    to: '/preview'
                }],
                formObject: {},
                title:'Create survey'
            }
        },
        computed:{
            isShow(){
                return this.$route.path=='/dash'?false:true;
            },
            gethomeLabel(){
                var homeLabel= {label: 'Dashboard', to: '/dash'};
               
                if(this.$route.path=='/questions'){
                    homeLabel= {label: 'Create Survey', to: '/'};

                }
                return homeLabel;    
            },
            showBreadcrumbItems(){
                var breadcrumbItems=[
                    {label: 'Create Survey'}
                ];
                if(this.$route.path=='/questions'){
                    breadcrumbItems=[
                        {label:this.formObject.surveyType}
                    ];

                } else if(this.$route.path=='/surveyCreated'){  
                    breadcrumbItems=[
                        {label: 'Create New Survey'}
                    ] 
                }
                else if(this.$route.path=='/preview'){ 
                    breadcrumbItems=[
                        {label: 'Create New Survey'}
                    ]  
                } 
                else if(this.$route.path=='/summary'){   
                    breadcrumbItems=[
                        {label: 'Create New Survey'}
                    ] 
                }
                return breadcrumbItems;    
            },
            showHome(){
                var homeLabel="Create New Survey";
                if(this.$route.path=='/questions'){
                    homeLabel=this.formObject.type;   
                } 
                return homeLabel;
                // else if(this.$route.path=='/surveyCreated'){  
                //     homeLabel={label: 'Create New Survey', to: '/question'}
                // }
                // else if(this.$route.path=='/preview'){ 
                //     homeLabel={label: 'Create New Survey', to: '/preview'} 
                // } 
                // else if(this.$route.path=='/summary'){ 
                //     homeLabel={label: 'Create New Survey', to: '/summary'}   
                // }
                // else if(this.$route.path=='/dash'){   
                // }   
            }
        },
        methods: {
            nextPage(event) {
                for (let field in event.formData) {
                    this.formObject[field] = event.formData[field];
                }
                this.$router.push(this.items[event.pageIndex + 1].to);
            },
            prevPage(event) {
                this.$router.push(this.items[event.pageIndex - 1].to);
            },
            complete() {
                this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
            }

        }
    }).$mount('#app')