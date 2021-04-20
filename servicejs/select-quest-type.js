    var router = new VueRouter({
        mode: 'history',
        routes: []
    });
    
    new Vue({
        components: {
            'p-card':card,
            'p-button': button,
            'p-radiobutton':radiobutton,
            'p-checkbox':checkbox,
            'p-inputtext':inputtext,
            'p-editor':editor,
            'p-breadcrumb':breadcrumb,
            'p-textarea':textarea,
            'p-rating':rating
        },
        data(){
            return{
                home: {icon: 'pi pi-home', to: '/'},
                items: [
                    {label: 'Create Survey'},
                    {label: 'Quiz'}
                ],
                city:'',
                boolean:'',
                rating:'',
                hideCreateSurveyCard:true,
                showQuestionCards:false,
                questionTitle:'Long Text',
                finalQuestionObject:{},
                publishSurveyObject:{},
                longTextQuestionType:false,
                multipleQuestionType:false,
                booleanQuestionType:false,
                ratingQuestionType:false,
                reordingQuestionType:false,
                formattedQuestionArray:[],
                ratingValue:'',
                multipleCheckbox:false,
                hiedNavbarButton:false,
                hidePublishCrad:false,
                hideSideLayout:true,
                getAllQuestions: [],
                counterQuestionText:0,
                counterQuestionNumber:0,
                uiSpec:{},
                getQuestionType: {
                    columnName: '',
                    fieldName: '',
                    multiple_choice_option:[
                        {inputValue:'', name:''},
                        {inputValue:'', name:''},
                        {inputValue:'', name:''},
                        {inputValue:'', name:''}
                     ],
                    boolean_choice: [],
                    rating: null,
                    reordering_choice:[
                        {inputValue:'', name:''},
                        {inputValue:'', name:''},
                        {inputValue:'', name:''},
                        {inputValue:'', name:''}
                    ]
                }
            }
        },
        mounted(){
            
            var specificationObject={
                "surveyType": sessionStorage.surveyType,
                "suveyDescription":sessionStorage.description
            }
    
            this.publishSurveyObject['type']=sessionStorage.type;
            this.publishSurveyObject['status']="Draft";
            this.publishSurveyObject['uiSpec']={}
            this.publishSurveyObject.uiSpec['specification']=specificationObject
            console.log(this.publishSurveyObject);
        },
        created () {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll (event) {
                var stickyElem = document.querySelector(".sticky-div"); 
                currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset;

                if (window.pageYOffset > currStickyPos) { 
                    stickyElem.classList.add("sticky-sidebar")
                    stickyElem.classList.remove("non-sticky-sidebar")
                    document.getElementById("sticky-sidebar").style.opacity = 1;
                } else { 
                    stickyElem.classList.remove("sticky-sidebar")
                    stickyElem.classList.add("non-sticky-sidebar")
                    document.getElementById("sticky-sidebar").style.opacity = 0;
                }
            },
            showSurvey(questionType){
                var questionObject={};
                this.hideCreateSurveyCard=false;
                this.hiedNavbarButton=true;
                this.hidePublishCrad=true;
                switch(questionType){
                    case "longText":
                        this.showQuestionCards=true;
                        this.longTextQuestionType=true;
                        this.questionTitle="Long Text"
                        this.field_Type_Name="LongTextComponent";
                        questionObject["questionTitle"]=this.questionTitle;
                        questionObject["field_Type_Name"]=this.field_Type_Name;
                        questionObject['columnName']='';
                        questionObject['fieldName']='text';
                        questionObject['hideSideLayout'] = true;
                        questionObject['isValidationError']=false;
                        this.formattedQuestionArray.push(questionObject);
                        this.stickeySidebar=this.formattedQuestionArray;
                        break;
                    case "multiple":
                        this.showQuestionCards=true;
                        this.multipleQuestionType=true;
                        this.questionTitle="Multiple Choice"
                        this.field_Type_Name="MutipleChoiceComponent";
                        questionObject["questionTitle"]=this.questionTitle;
                        questionObject["field_Type_Name"]=this.field_Type_Name;
                        questionObject['columnName']='';
                        questionObject['fieldName']='Mutiple';
                        questionObject['ml_repeater']=[
                            {inputValue:'', name:''},
                            {inputValue:'', name:''},
                            {inputValue:'', name:''},
                            {inputValue:'', name:''}
                        ];
                        questionObject['hideSideLayout'] = true;
                        questionObject['isValidationError']=false;
                        this.formattedQuestionArray.push(questionObject);
                        this.stickeySidebar=this.formattedQuestionArray;
                        break;
                    case "boolean":
                        this.showQuestionCards=true;
                        this.booleanQuestionType=true;
                        this.questionTitle="Yes / No"
                        this.field_Type_Name="booleanComponent";
                        questionObject["questionTitle"]=this.questionTitle;
                        questionObject["field_Type_Name"]=this.field_Type_Name;
                        questionObject['columnName']='';
                        questionObject['fieldName']='number';
                        questionObject['hideSideLayout'] = true;
                        questionObject['isValidationError']=false;
                        this.formattedQuestionArray.push(questionObject);
                        break;
                    case "rating":
                        this.showQuestionCards=true;
                        this.ratingQuestionType=true;
                        this.questionTitle="Rating"
                        this.field_Type_Name="ratingComponent";
                        questionObject["questionTitle"]=this.questionTitle;
                        questionObject["field_Type_Name"]=this.field_Type_Name;
                        questionObject['columnName']='';
                        questionObject['fieldName']='number';
                        questionObject['hideSideLayout'] = true;
                        questionObject['isValidationError']=false;
                        this.formattedQuestionArray.push(questionObject);
                        break;
                    default:
                        this.showQuestionCards=true;
                        this.reordingQuestionType=true;  
                        this.questionTitle="Reordering"
                        this.field_Type_Name="reorderingComponent";
                        questionObject["questionTitle"]=this.questionTitle;
                        questionObject["field_Type_Name"]=this.field_Type_Name;
                        questionObject['columnName']='';
                        questionObject['fieldName']='';
                        questionObject['reordering_choice']=[
                            {inputValue:'', name:''},
                            {inputValue:'', name:''},
                            {inputValue:'', name:''},
                            {inputValue:'', name:''}
                        ];
                        questionObject['hideSideLayout'] = true;
                        questionObject['isValidationError']=false;
                        this.formattedQuestionArray.push(questionObject);
                }
                console.log(this.formattedQuestionArray)
            },

            //repeater
            addItem(ml_repeaterList) {
                ml_repeaterList.push({ inputValue: '', name: '' });
                console.log('xyz', ml_repeaterList);
            },

            removeItem(ml_repeaterList, index) {
                ml_repeaterList.splice(index, 1);
            },
            
            //repeater reorder
            addItemRepeater(reorder_repeaterList) {
                reorder_repeaterList.push({ inputValue: '', name: ''});
            },

            removeItemRepeater(reorder_repeaterList,index) {
                reorder_repeaterList.splice(index, 1);
            },

            //getting users data
            saveData(getQuestionObject, checkedQuestion, index){
                console.log(getQuestionObject);
                this.getAllQuestions.push(getQuestionObject)
                if(getQuestionObject.columnName == ''){
                    getQuestionObject.isValidationError=true
                    return;
                }
                getQuestionObject.isValidationError=false;
                this.finalQuestionObject['tableDetails'] = this.getAllQuestions;
                sessionStorage.getAllQuestions = JSON.stringify(this.getAllQuestions);
                this.formattedQuestionArray[index].hideSideLayout = checkedQuestion;
                switch(getQuestionObject.fieldName){
                    case 'text':
                        this.counterQuestionText = this.counterQuestionText + 1
                        this.formattedQuestionArray[index].fieldName = getQuestionObject.fieldName + this.counterQuestionText;
                        break;
                    case 'number':
                        if(getQuestionObject.field_Type_Name == "booleanComponent"){
                            this.counterQuestionNumber = this.counterQuestionNumber + 1
                            this.formattedQuestionArray[index].fieldName = getQuestionObject.fieldName + this.counterQuestionNumber;
                            break;
                        }
                        if(getQuestionObject.field_Type_Name == "ratingComponent"){
                            this.counterQuestionNumber = this.counterQuestionNumber + 1
                            this.formattedQuestionArray[index].fieldName = getQuestionObject.fieldName + this.counterQuestionNumber;
                            break;
                        }
                        
                }
                this.formattedQuestionArray[index].fieldName = getQuestionObject.fieldName;
                console.log(this.formattedQuestionArray);
                var fomattedTableDetails=[];

                for(var i=0; i< this.finalQuestionObject.tableDetails.length; i++){
                    var myTableObj={}
                    myTableObj['columnName']=this.finalQuestionObject.tableDetails[i].columnName;
                    myTableObj['fieldName']=this.finalQuestionObject.tableDetails[i].fieldName;
                    myTableObj['field_Type_Name']=this.finalQuestionObject.tableDetails[i].field_Type_Name;
                    myTableObj['isShownInMasterTable']=true;
                    myTableObj['header_Alignment']="Left";
                    myTableObj['data_Alignment']="Left";
                    myTableObj['order']= i + 1;
                    fomattedTableDetails.push(myTableObj);
                }
    
                this.publishSurveyObject['tableDetails']=fomattedTableDetails;
                console.log(this.publishSurveyObject)
                
            },

            publishSurvey:async function(){
                // const url='https://api.smartsurvey.autoprojects.co/survey';
                var payload={}
                payload['survey']=this.publishSurveyObject;
                sessionStorage.payload=JSON.stringify(payload);

                this.httpService=gettingHttpFunctions();
                var vm=this;
                config={
                    method: "POST",
                    path:'survey',
                    data:JSON.stringify(payload)
                }
                var response= await this.httpService.mainAxiosRequest(config);
                if(response != undefined){
                    // window.location='https://smartsurvey.autoprojects.co/survey-created.html';
                    window.location= "http://127.0.0.1:5501/survey-created.html";
                }
                console.log(response);
            },

            move(from, to) {
                this.formattedQuestionArray.move(from, to);
            }

        }
    }).$mount('#app')

    Array.prototype.move = function(from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
        return this;
    };