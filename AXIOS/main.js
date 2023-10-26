//AXIOS GLOBAL                                              //BEFORE READING THIS READ CUSTOM HEADERS
axios.defaults.headers.common['X-Auth-Token'] = 'Token'     //THIS IS SAME AS CUSTOM HEADERS, BUT IN THIS THE
//THE INFORMATION WHICH WE ARE DEFINEING (like X-Auth-Token) WILL BE PRESENT UNDER CONFIG FOR ALL THE REQUEST 
//UNLIKE CUSTOM HEADER WHERE IT WAS APPLICABLE FOR ONLY CUSTOM HEADER BUTTON ONLY

// GET REQUEST
function getTodos() {                                       //WE CAN USE AXIOS DIRECTLY HERE AS WE HAVE INCLUDED
    axios({                                                 //URL OF AXIOS IN INDEX.HTML (LIKE --> BOOTSTAROP)
        method: 'get',                                      //DEFINEING METHOD (LIKE GET, POST, PUT ETC...)
        url: 'https://jsonplaceholder.typicode.com/posts',  //URL FROM WHERE WE WANT DATA (LIKE EARLIER WE WERE  
        params: {                                           //USING https://reqres.in/ HERE WE WILL USE jsonp...    ) 
            _limit: 5                                       //PARAMS IS USED TO SPECIFY A PARAMETER, LIKE HERE 
            }                                               //WE WANT TO DISPLAY EVERTHING ON WEBPAGE TO A MAX.
        })                                                  //QUANTITY OF 5 (LIKE --> MAX. 5 DATA ETC...)
        .then(res => showOutput(res))                       //AXIOS RETURNS PROMISE HENCE WE ARE USING .then AND
        .catch(err => console.error(err))                   //TO DISPLAY OUR DATA PROPERLY ON CONSOLE WE ARE                    
  }                                                         //USING showOutput FUNCTION

  //axios.get('https://jsonplaceholder.typicode.com/posts',{//THIS IS THE ALTERNATE/EASIER WAY OF USING AXIOS 
  //  params: { _limit: 5}                                  //axios.method('url',{params: {parameter} })
  //})                                                      //AND HERE WE CAN EVEN AVOID .GET AS BY DEFAULT IT 
  // .then(res => showOutput(res))                          //TAKE METHOD AS GET
  // .catch(err => console.error(err))

  //JUST LIKE PARAMETER WE CAN ALSO ADD SETTIMEOUT, HERE WE WILL MENTION THE TIME AFTER WHICH ERROR WILL BE
  //THROWN IF THE REQUEST IS NOT COMPLETED, IN THE BELOW CASE ERROR WILL BE THROWN IF THE REQUEST IS NOT FINISHED
  //IN 5000 ms
  //axios.get('https://jsonplaceholder.typicode.com/posts',{
  //  timeout: 5000
  //  })

  // POST REQUEST
  function addTodo() {                                      //NOW HERE BY USING POST WE ARE UPLOADING THE DATA
    axios.post('https://jsonplaceholder.typicode.com/posts',{//AND WE ARE USING EASIER METHOD TO DO SO AND THE 
            title: 'New Todo',                              //DATA WE WANT TO UPLOAD WILL COME IN PLACE OF PARAMS
            completed: false
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {                                       //PUT AND PATCH IS SAME THE ONLY DIFF. IS IN PUT
    axios.patch('https://jsonplaceholder.typicode.com/posts/1',{//WHATEVER WE PUT IN DATA REMAINS AND REST ALL
        title: 'Updated Todo',                                  //GET DELETED BUT IN PATCH WHATEVER WE PUT IN 
        completed: true                                         //DATA GETS UPDATED AND REST REMAINS SAME (LIKE
    })                                                          //Here, Since we are using patch hence title and
        .then(res => showOutput(res))                           //completed will get updated and rest of the data
        .catch(err => console.error(err))                       //like userid will remain same, But if we would
  }                                                             //have used put userid would have got deleted. 

  // DELETE REQUEST
  function removeTodo() {                                       //IN DELETE PARAMS ARE NOT REQUIRED THEREFORE
    axios.delete('https://jsonplaceholder.typicode.com/posts/1')//NOT USING THE PARAMS FIELD.
    .then(res => showOutput(res))
    .catch(err => console.error(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {                                          //HERE WE ARE USING axios.all TO GET THE DATA
    axios.all([                                                 //SIMULTANEOUSLY, SO WE ARE CREATING AN ARRAY
        axios.get('https://jsonplaceholder.typicode.com/todos'),//WHICH IS TAKING 2 GET REQUESTS (i.e todos and
        axios.get('https://jsonplaceholder.typicode.com/posts') //posts) AND THEN WE ARE DISPLAYING IT SIMULTANE.
    ])                                                          //ON CONSOLE.
    .then(res => {
        console.log(res[0])
        console.log(res[1])
    })
    .catch(err => console.error(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {                                            //DEFINING CUSTOM HEADERS AND STORING THEM IN
      headers: {                                                //config VARIABLE                                                                
        'Content-Type': 'Application/json',                     //THESE ARE THE INFORMATION WE ARE ADDING IN 
        Authorization : 'sometoken'                             //CUSTOM HEADERS
      }
    }

    axios.post('https://jsonplaceholder.typicode.com/posts',{
            title: 'New Todo',                              
            completed: false
    }, config)                                                  //USING config AS A PARAMETER TO DIAPLAY CUSTOM
        .then(res => showOutput(res))                           //HEADERS (Now this information will be shown
        .catch(err => console.error(err))                       //under config inside header on the web page,
  }                                                             //when we will click on custom header button)
  
  // ERROR HANDLING                                             //INSTEAD OF JUST SHOWING ERROR MESSAGE WE CAN
  function errorHandling() {                                    //USE SEVREAL ERROR HANDLING METHODS FOR BETTER
    axios.get('https://jsonplaceholder.typicode.com/postss')    //ERROR HANDELING AS SHOWN HERE
         .then(res => showOutput(res))
         .catch(err => {
            if (err.response){
              console.log(err.response.data)                    //IN THIS CASE THE DATA WHICH WE ARE GETTING 
                                                                //FROM THE SERVER WILL BE LOGGED ({} IF NO DATA) 
              console.log(err.response.status)                  //IN THIS CASE STATUS WILL BE LOGGED (LIKE 404)
              console.log(err.response.headers)                 //IN THIS CASE HEADERS RESPONSE WILL BE LOGGED
              console.log(err.request)                          //IN THIS CASE ALL THE DETAILS OF THE REQUEST
                                                                //WHICH WAS MADE WILL BE LOGGED
              console.log(err.message)                          //IN THIS CASE Request failed with status code                                            
                                                                //(whatever the status code is) WILL BE LOGGED
            }
         })
  }

//JUST LIKE PARAMETER WE CAN ALSO ADD STATUS, HERE WE WILL MENTION THE STATUS RANGE AFTER WHICH ERROR WILL BE
//LOGGED, IN THE BELOW CASE IF ERROR STATUS IS LESS THEN 500 THEN ONLY ERROR MESSAGE WILL BE LOGGED ELSE ERROR
//WILL NOT BE LOGGED 
//function errorHandling() {
//  axios.get('https://jsonplaceholder.typicode.com/postss',{
//    ValidateStatus: function(status){
//      return status < 500
//    }
//  })

  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source()

    axios.get('https://jsonplaceholder.typicode.com/posts', {
      cancelToken: source.token
    })
        .then(res=> showOutput(res))
        .catch(thrown => {
          if (axios.isCancel(thrown)){
            console.log('Request cancel', thrown.message)
          }   
        })
    
    if(true){
      source.cancel('Request cancelled')
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES                  //HERE WE ARE CREATING THE INTERCEPTOR FOR REQUEST 
  axios.interceptors.request.use(config => {            //request.use() TAKES A FUNCTION AS AN ARGUMENT.
        console.log(`${config.method} request is sent to ${config.url} at ${new Date().getTime()}`)
                                                        //NOW THIS FUNCTION IS CALLED FOR EVERY OUTGOING REQUEST 
        return config                                   //RETURNING CONFIG FUNC. AS ARGUMENT FOR request.use()
  })                                                    
  
  // AXIOS INSTANCES
  const axiosInstance = axios.create({                  //HERE WE HAVE CREATED AN AXIOS INSTANCE, NOW WHENEVER
    //Here we can have other custom settings as well    //A PAGE WILL LOAD THIS BASE URL ALONG WITH /comments 
    baseURL : 'https://jsonplaceholder.typicode.com'    //WILL BE ADDED UNDER CONFIG AS BASE URL
  })
  //axiosInstance.get('/comments').then(res => showOutput(res)) //WE HAVE COMMENTS THIS OUT AS, WEB PAGE WAS 
                                                                //GETTING DISPALTED AUTOMATICALLY WITHOUT EVEN 
                                                                //CLICKING ON ANY BUTTON BECAUSE OF THIS INSTANCE
  // Show output in browser                                     
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);