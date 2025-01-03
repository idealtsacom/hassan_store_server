# Hassan-Store API

A RESTful API built with Node.js, Express, and MongoDB for managing an online store. This backend provides endpoints for managing products, users, orders, categories, and the shopping cart. It also includes JWT authentication and role-based authorization (admin/user).

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/muhammdmajid/hassan-store-server-v-1.git
   cd hassan-store
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_TOKEN_SECRET=<your-jwt-secret>
   PORT=<your-preferred-port>
   ```

   Replace `<your-mongodb-uri>` with the connection string to your MongoDB database and `<your-jwt-secret>` with a secure secret key for JWT signing.

4. Start the server:
   ```bash
   npm start
   ```

   The server will run on the specified port (default: `5000`).

## Environment Variables

Here are the environment variables that need to be configured:

- `MONGODB_URI`: MongoDB connection string for connecting to the database.
- `ACCESS_TOKEN_SECRET`: A secret key for signing JWT tokens.
- `PORT`: Port number the server will listen on (default: `5000`).

## API Endpoints

### Authentication

- **POST** `/jwt` - Generate a JWT token.
  - **Body**: `{ "email": "user@example.com" }`
  - **Response**: `{ "token": "JWT_TOKEN" }`

### Categories

- **GET** `/categories` - Retrieve all categories.

### Items

- **GET** `/items` - Get all items.
- **GET** `/item/:id` - Get an item by ID.
- **POST** `/items` - Add a new item (Admin only).
- **DELETE** `/items/:id` - Delete an item by ID (Admin only).
- **PATCH** `/item/:id` - Update an item (Admin only).

### Cart

- **GET** `/addtocart` - Retrieve items in the user's cart.
  - **Query**: `email=<user-email>`
- **POST** `/addtocart` - Add an item to the cart.
  - **Body**: `{ "email": "user@example.com", "ItemId": "item_id", "quantity": 1 }`
- **DELETE** `/addtocart/:id` - Remove an item from the cart.

### Users

- **POST** `/users` - Register a new user.
- **GET** `/users` - Get all users (Admin only).
- **DELETE** `/users/:id` - Delete a user (Admin only).
- **GET** `/users/admin/:email` - Check if a user is an admin.
- **PATCH** `/users/admin/:id` - Promote a user to an admin.

### Orders

- **POST** `/orders` - Create a new order.
- **GET** `/orders` - Get all orders for the logged-in user.
- **GET** `/allOrders` - Get all orders (Admin only).
- **PATCH** `/orders/admin/:id` - Update the order status (Admin only).
- **DELETE** `/orders/admin/:id` - Delete an order (Admin only).
- **GET** `/orderHistory` - Get all delivered orders (Admin only).

## Usage

After the server is running, you can use any HTTP client (such as Postman or Insomnia) to interact with the API. For routes that require authentication, make sure to include the JWT token in the `Authorization` header as `Bearer <token>`.

Example:
- **Authorization**: `Bearer <your-jwt-token>`

## Contributing

If you would like to contribute to this project, feel free to fork the repository, create a new branch, and submit a pull request with your changes. Please make sure to write tests for any new features you add.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


