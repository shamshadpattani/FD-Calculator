
var mainUrl="http://192.168.1.19:9440";
// var mainUrl='/helloworld/master/fdIntrest';

function gettingHttpFunctions() {
    var myObject = new Vue({
        methods: {
            mainAxiosRequest: async function(config) {
                var header = {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                };
                let axiosConfig = {
                    method: config.method,
                    headers: header,
                    url: mainUrl + config.path
                };
                if(config.data){
                    axiosConfig.data=config.data
                }
                return await axios(axiosConfig)
                    .then(function(response) {
                        // if (response.headers !== undefined && response.headers.access_token !== undefined) {
                        //     localStorage.access_token = response.headers.access_token;
                        // }
                        console.log('Success:', response);
                        return response.data;
                        
                    })
                    .catch(function(error) {                       
                        console.log('Error:', error.response);
                     
                    });
            }
        }
    });
    return myObject;
}
