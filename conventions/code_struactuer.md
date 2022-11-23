Responsibilities of:

Routers: directions of requests and middlewares.

Middlewares: logging, authentication, authorization, system-wide information such as request id (for logs that helps debug higher environments like production), and anything else that is not a pure logic of the flow the request is intended to go through

Controllers: the controller is the first station for a request, and it trusform the request to an object that entrers the flow. because of that, each controller generaly shuld have validation (for the data that came with the requser in the headers/ url / body), and two interfaces, one to describe the object that shuld start the flow, and  another one to descripbe the object that supposed to get out of that flow and about to be sent to the client.
one more responsability of the controller is to enforce conventions about the stracture of responses the server sends. for example remove properties that not relevant to the user of hash/encrypt data that shuldt be visible to the client (data that the server need to be kept at the client but not for the client )

Services:  the service is the main logic area of the code, most if not all of the bussiness logic shuld be excuted there. logic such as updating other services, combine and transform data, etc.. 
the service supposed to be the part of the code that uses utility functionality, and the only part of the code that uses the Data Access layer.

DAL(data access layer): an absturction above the packge that manege data-base communications, for example, the service shuld retrive documents by some filter by a one line of code, this one line shuld be a function call to a DAL function.
