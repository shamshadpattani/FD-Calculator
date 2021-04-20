new Vue({
    components: {
        'p-button': button,
        'p-textarea':textarea,
        'p-card':card,
        'p-breadcrumb':breadcrumb,
        'p-checkbox':checkbox,
        'p-rating':rating,
        'p-radiobutton':radiobutton,
        'p-progressbar':progressbar 
    },
    data() {
        return {
            cities:[],
            checked:false,
            ratingVal:null,
            BooleanType:null,
            getAllSurveyQuestions:'',
            form:{},
            displayConfirmation: false,
            responseMsg:'',
            showpopUp:false,
            progressbarValue: 1,
            scrolled: false,
            interval: 0
        }
    },
    created () {
        window.addEventListener('scroll', this.hideDailog);
    },
    destroyed () {
        window.removeEventListener('scroll', this.hideDailog);
    },
    methods: {
        submit: async function (event) {
            event.preventDefault();
            var formHTML = event.target; // this.$refs.formHTML
            console.log( formHTML ); // formHTML element
            var formData = new FormData( formHTML );
            var object = {};
            object['type']=this.getAllSurveyQuestions.type;
            formData.forEach(function(value, key){
                object[key] = value;
            });
            console.log(object)
            var json={'response':object};
            console.log(json)
            const url='https://api.smartsurvey.autoprojects.co/surveyResponse';

            let axiosConfig = {
                method: "POST",
                url:url,
                data:JSON.stringify(json)
            };
    
            axiosConfig.headers = {
                'content-type': 'application/json',
                'Accept': 'application/json'
            };
        
            axios(axiosConfig)
            .then(function (response) {
                // this.responseMsg=response.data.message;
                openConfirmation();
            })
            .catch(function (error) {
                console.log(error);
            });
        },  
        showDailog(){
            this.showpopUp=true;
        },
        hideDailog(){
            this.showpopUp=false;
        },
        startProgress() {
            this.progressbarValue=1;
            setInterval(() => {
                if (this.progressbarValue < 100) {
            this.progressbarValue+=2;
                }
            }, 120);
        },
		endProgress() {
			clearInterval(this.interval);
			this.interval = null;
		}
    },
    mounted(){
        // this.getAllSurveyQuestions=JSON.parse(sessionStorage.getUserSurvey);
        // console.log(this.getAllSurveyQuestions);
        this.startProgress();
    },
    beforeUnmount() {
		this.endProgress();
	}
}).$mount('#app')
