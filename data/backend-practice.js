//user send request in the form of HTTP message
//backend computer recieve the request from the user and process it 
/* Type of HTTP Method

  1,GET - get some information from the backend.
  2.POST
  3.PUT
  4.DELETE

  url-uniform resource locater
  https://amazon.com - domain name
    |        
  means use http to communicate with the domain  

  Url path
*/

const xhr =  new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

console.log(xhr);  

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send(); 