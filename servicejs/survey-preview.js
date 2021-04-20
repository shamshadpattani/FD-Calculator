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
            getPayloadData:''
        }
    },
    created(){
        this.getPayloadData=JSON.parse(sessionStorage.payload);
        // sessionStorage.removeItem('payload');
        console.log(this.getPayloadData)
        
    }
}).$mount('#app')