new Vue({
    components: {
        'p-datatable' : datatable,
        'p-row':row,
        'p-column':column,
        'p-columngroup':columngroup,
        'p-inputtext':inputtext,
    },
    data(){
        return {
            editingCellRows: {},
            editingRows: [],
            columns: null,
            maturityList:null
        }
    },
    created(){
        this.maturityList={
            "data": [{
                    "date": "7 days to 14 days",
                    "n": "2.50%",
                    "s": "3.00%",
                    "g":"5.00%"
                },
                {
                    "date": "15 days to 29 days",
                    "n": "2.50%",
                    "s": "3.00%",
                    "g":"5.00%"
                },
                {
                    "date": "30 days to 45 days",
                    "n": "3.00%",
                    "s": "3.50%",
                    "g":"5.00%"
                },
                {
                    "date": "46 days to 60 days",
                    "n": "3.00%",
                    "s": "3.50%",
                    "g":"5.00%"
                }
            ]
        }
    }}).$mount('#app')