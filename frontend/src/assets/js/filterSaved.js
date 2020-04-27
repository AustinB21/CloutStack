function filterSaved(source) {
    data = {
        "username": localStorage.getItem("username"),
        "from_where": source
    }
    return makeAjaxCall(data)
}

function makeAjaxCall(data)
{
    // if (str.length == 0)
    // {
    //     return new Promise((resolve, reject) => {
    //         return resolve("")
    //     });
    // }
   // 2. Create an instance of an XMLHttpRequest object
   xhr = GetXmlHttpObject();
   if (xhr == null)
   {
      alert ("Your browser does not support XMLHTTP!");
      return;
   }
   // 3. specify a backend handler (URL to the backend)
   var backend_url= "http://localhost/Cloutstack/api/favorites/filterRead.php";
   // 4. Assume we are going to send a GET request,
   //    use url rewriting to pass information the backend needs to process the request
   // backend_url += "?StringSoFar=" + str;
   // var data_to_send = {
   //    "StringSoFar=": str
   // }
   xhr.open('POST', backend_url, true);
   xhr.setRequestHeader("Content-type", "application/json");
   // 7. The request is sent to the server
   
   xhr.send(JSON.stringify(data));
   // 5. Configure the XMLHttpRequest instance.
   //    Register the callback function.
   //    Assume the callback function is named showHint(),
   //    don't forget to write code for the callback function at the bottom
   return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function(){
         if(xhr.readyState === 4){ // 4 complete
            if(xhr.status === 200){ 
               var res = xhr.response;
               console.log(res);
               resolve(res);
            } else {
               // error handling
               reject("xhr failed");
            }
         }
      }
   })



   // 8. Once the response is back the from the backend,
   //    the callback function is called to update the screen
   //    (this will be handled by the configuration above)



   // 6. Make an asynchronous request
   

}



function GetXmlHttpObject()
{
   // Create an XMLHttpRequest object
	
   if (window.XMLHttpRequest)
   {  // code for IE7+, Firefox, Chrome, Opera, Safari
      return new XMLHttpRequest();
   }
   if (window.ActiveXObject)
   { // code for IE6, IE5
     return new ActiveXObject ("Microsoft.XMLHTTP");
   }
   return null;
}
