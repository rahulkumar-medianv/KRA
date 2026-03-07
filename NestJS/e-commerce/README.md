# E-Commerce Backend with Authentication

A NestJS-based e-commerce backend application with comprehensive authentication system including signup, login, refresh tokens, and role-based access control.

## Features

- **User Authentication**
  - User signup with email validation
  - Secure login with password hashing
  - JWT-based authentication
  - Refresh token mechanism for session management

- **Role-Based Access Control**
  - Three user roles: USER, ADMIN, CONTENT_MANAGER
  - Protected routes with role-based guards
  - Flexible permission system

- **Security Features**
  - Password hashing with bcrypt
  - JWT tokens with separate secrets for access and refresh tokens
  - Input validation with class-validator
  - SQL injection protection with TypeORM

## API Endpoints

### Authentication Endpoints

#### POST /auth/signup

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "hashed_refresh_token_here"
}
```

#### POST /auth/login

Authenticate user and get tokens.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "hashed_refresh_token_here"
}
```

#### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

**Response:**

```json
{
  "accessToken": "new_access_token",
  "refreshToken": "new_refresh_token"
}
```

#### GET /auth/profile

Get current user profile (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "id": "user-uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": {
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": 10001
  },
  "role": "USER",
  "isActive": true
}
```

#### POST /auth/logout

Logout user by clearing refresh token (requires authentication).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

### Role-Based Endpoints

#### GET /auth/admin

Admin-only endpoint example.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "Welcome Admin!",
  "user": {
    "id": "user-uuid",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

#### GET /auth/content-manager

Content Manager-only endpoint.

#### GET /auth/user

User-only endpoint.

## User Roles

- **USER**: Basic user role with standard permissions
- **ADMIN**: Administrative role with full access
- **CONTENT_MANAGER**: Role for managing content

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## Installation & Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Set up PostgreSQL database:**
   - Create a PostgreSQL database named `ecommerce`
   - Update database credentials in `.env` file

3. **Run database migrations:**

```bash
npm run start:dev
```

The application uses TypeORM with `synchronize: true`, so tables will be created automatically.

4. **Start the application:**

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts          # Login request DTO
│   │   ├── signup.dto.ts         # Signup request DTO
│   │   └── refresh-token.dto.ts  # Refresh token DTO
│   ├── entities/
│   │   └── auth.entity.ts        # User entity with TypeORM
│   ├── guards/
│   │   ├── jwt-auth.guard.ts     # JWT authentication guard
│   │   └── roles.guard.ts        # Role-based access guard
│   ├── strategies/
│   │   └── jwt.strategy.ts       # Passport JWT strategy
│   ├── decorators/
│   │   └── roles.decorator.ts    # Roles decorator for route protection
│   ├── auth.interface.ts         # TypeScript interfaces and enums
│   ├── auth.service.ts           # Authentication business logic
│   ├── auth.controller.ts        # Authentication API endpoints
│   └── auth.module.ts            # Authentication module configuration
├── utils/
│   └── db.config.ts              # Database configuration
└── app.module.ts                 # Main application module
```

## Security Features

- **Password Security**: Passwords are hashed using bcrypt with salt rounds
- **JWT Tokens**: Separate secrets for access and refresh tokens
- **Token Expiration**: Access tokens expire in 15 minutes, refresh tokens in 7 days
- **Input Validation**: All inputs are validated using class-validator
- **SQL Injection Protection**: TypeORM provides built-in protection
- **Role-Based Access**: Routes can be protected based on user roles

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

## Technologies Used

- **NestJS**: Progressive Node.js framework
- **TypeORM**: TypeScript ORM for database operations
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **class-validator**: Input validation
- **Passport**: Authentication middleware
- **TypeScript**: Typed JavaScript

## API Testing

You can test the API using tools like Postman or curl:

1. **Signup**: Create a new user account
2. **Login**: Get access and refresh tokens
3. **Use Access Token**: Include in Authorization header for protected routes
4. **Refresh Token**: Use refresh token to get new access token when it expires

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if necessary
5. Submit a pull request

## License

This project is licensed under the UNLICENSED license.
$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

````

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
````

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
