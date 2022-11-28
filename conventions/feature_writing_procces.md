1) router: Are there any middlewares you want for that flow accept of body/params validations (such as authentication, authorization, etc..)
2) if note exist, create a basic type of the entity/entites that this flow will use or manipulate
2) write the logic (service) as pseudo-code
3) think of all possible errors through the logic and create error structures for them.
4) write the service params and result types
5) write the controller pseudo-code
6) write the validations and the response type
7) update the route with the validation
8) write the controller code with the 
9) write the service code - make sure you throw the correct errors according to those you created earlier
10) DAL:
    waht indexes shuld the colletion have in case of new collection
	what errors can occur
	how should the document structure should be in case of a new collection