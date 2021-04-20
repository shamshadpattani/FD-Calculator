new Vue({
        components: {
            'p-card':card,
            'p-button': button,
            'p-radiobutton':radiobutton,
            'p-inputtext':inputtext,
            'p-editor':editor,
            'p-breadcrumb':breadcrumb
        },
        data(){
            return{
                home: {label: 'Dashboard', to: '/'},
                items: [
                    {label: 'Create Survey'}
                ],
                surveyType: '',
                sessionUserData:{},
                type:'',
                description:'Description'
            }
        },
        methods: {
            persist() {
                sessionStorage.surveyType = this.surveyType;
                sessionStorage.type = this.type;
                sessionStorage.description = this.description;
                
                this.sessionUserData['surveyType'] = sessionStorage.surveyType;
                this.sessionUserData['type'] = sessionStorage.type;
                this.sessionUserData['suveyDescription'] = sessionStorage.description;
                console.log(this.sessionUserData);
                console.log('now pretend I did more stuff...');
            }
        }
    }).$mount('#app')