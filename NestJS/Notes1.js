/*
1. Custom Providers (useClass, useValue, useFactory)
2. Async Providers 
3. Dynamic Module - reusable configurable modules
4. Execution Context + Request Lifecycle (guards, interceptors, filters)
5. DI Scopes + Lifecycle Hooks + Circular Dependency
6. JWT Authentication (Security Core)
7. Role-Based Authorization 



DI -> Dependency Injection (DI)
- Instead of creating objects manually, NestJS automatically creates and gives ("injects") them where needed

--------- Custom Provider ---------
Custom Provider -- you control How nest creates the dependency
- Dynamic configuration
- External libraries
- Different implementations
- Mock services (testing)
- Async setup (DB, JWT, APIs)


JWT needs configuration:
secret: 'mysecretkey'
expiresIn: '1h'

Bur in real apps this comes from: -- env variables, database, config service, async loading

so nestJS cannot guess this.
we create a custom provider that supplies JWT configuration.

*/

/*
Execution Context -- Execution Context is an object that gives you information about the current request being executed.
- it tells NestJS extension: 
- Which controller is running
- which handler (method) is called
- what request data exists
- who the user is
- which transport is used (HTTP, GraphQl, WS)

Real Example -- When a request comes: GET /users/profile -- Nest creates a context container describing everything about this request.

That container == ExecutionContext

### Hold Information 
- controller class
- handler method
- Request object
- Response object
- user data
- metadata (@Role, decorators)
- transport type



ExecutionContext is Used
- Guards -- Decide if request allowed
- Custom decorators -- Read metadata


*/

/*
JWT -> JSON Web Token is a signed identity card created by the server.

HEADER.PAYLOAD.SIGNATURE

const payload = {
sub: userID,
role: role

}

*/
