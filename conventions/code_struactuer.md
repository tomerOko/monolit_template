Responsibilities of:

### Routers: 
directions of requests and middlewares.
<br><br>
#
### Middlewares:
logging, authentication, authorization, system-wide information such as request id (for logs that helps debug higher environments like production), and anything else that is not a pure logic of the flow the request is intended to go through
<br><br>
#
### Controllers:
the controller is the first station for a request, and it trusform the request to an object that entrers the flow. 
one more responsability of the controller is to enforce conventions about the stracture of responses the server sends. for example remove properties that not relevant to the user of hash/encrypt data that shuldt be visible
each controller generaly uses one to three interfaces:
1. interfeace that describe the request object after validation
2. describe the object it sends to the service to start the flow (not mendatory if the data is very simple)
3. user the return type of the service, becouse this is the type of data the controller shuld transform to 'client-friendly' data
<br><br>
#
### Logic: 
Most of the logic of each topic is between its Controller and its DAL. is the main logic area of the code,
most if not all of the bussiness logic shuld be excuted here. logic such as updating other services, combine and transform data, etc..
<br><br>

### dealing with logic code complexity
beacouse the logic layer of the contiain the largest amount of code, and can have many dependcies between the elements of the codes. we need a way to keep in from getting messy.
the solution to the best of my knowlage is to keep the code in some hierarchy, and to keep our classes small.
* hierarchy: to avoid circular dependencies. we will split each 'topic' (exp: 'users', 'auth', 'posts', 'feed') to a services and helper classes.
    * a service can call DALs, helper classes from the same topic, and helper classes from other topics. 
    * helper function can call DALs from the same topic or from other topics. but a helper function will never call a service. doesn't matter if they are on the same topic or not. in some cases, there might be a need to call from one helper function to another, in this case, try to structure the code differently. becouse, if the class being called will call the caller, there will be circular dependency again.
    * DAL will never call another DAL, helper function or service.
*  small classes: think of it as a toolbox, a toolbox with inner cells for tools is much handier. small classes dose cause a bigger codebase, but with the same amount of logic, we have a much more maintainable and understandable codebase.
<br><br>

### services vs helpers:
* services: are the one's at the beggining of the logics flows, the controller will always use services, never helpers, and it will allways use serivices from it own topic.
* helpers: logic can be a helper insted of service for few resons:
    * two or more services (from the same topic or nt) using the same logic, and we cant have one service calling the other couse that will eventually create circular dependencies
    * there is simply alot of logic and we dont want huge complicated services.
<br><br>

#
### DAL
(data access layer): an absturction above the packge that manege data-base communications, for example, the service shuld retrive documents by some filter by a one line of code, this one line shuld be a function call to a DAL function.
