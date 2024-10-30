# REST API Product Management

This is a REST API built for managing products, using a simple CRUD (Create, Read, Update, Delete) functionality. The API is developed with TypeScript, Node.js, and Express and is designed to handle requests for a product management application. It is deployed on Render’s free tier for both the web service and database.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the API](#running-the-api)
  - [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## Overview
This API serves as the backend for a product management application, allowing users to create, view, update, and delete product records. It is designed to power a simple frontend interface for managing products.

## Technologies Used
- **Node.js** with **TypeScript**: For building the server and API logic.
- **Express**: As the web application framework.
- **PostgreSQL**: For database storage, with **Sequelize** as the ORM.
- **Jest** and **Supertest**: For comprehensive testing, with 100% code coverage.
- **Render**: For hosting the API and database on a free-tier environment.

## Features
- **RESTful API Endpoints** for full CRUD operations:
  - `GET` to retrieve all products or a product by ID.
  - `POST` to create a new product.
  - `PUT` to update an existing product’s information.
  - `PATCH` to modify a product’s availability.
  - `DELETE` to remove a product by ID.
- **Testing**: Includes unit and integration tests for each endpoint, ensuring 100% code coverage with Jest and Supertest.
- **Error Handling**: Comprehensive error handling to manage invalid requests and database errors.

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rest_api-product-management.git
   cd rest_api-product-management
2. Install Dependencies:
  ```bash
  npm install
  ```
### Environment Variables

Create a .env file in the root directory with the following variables:
```.env
DB_URL=your_database_url
FRONTEND_URL=https://your-frontend-app-url
```
Ensure DB_URL points to your PostgreSQL database on Render (or locally for development).

### Running the API
1. **Development Mode:
  ```bash
  npm run dev
  ```
2. **Production Mode:
  ```bash
  npm run build
  node dist/index.js
  ```
### Testing
Run all tests with Jest and Supertest:
```bash
npm test
```

## API Documentation

The API Documentation is made using swagger

[Documentation URL](https://rest-api-product-management.onrender.com/docs/)

## Deployment
The API is deployed on Render. To deploy this API:
- 1. Link your repository to a Render web service.
- 2. Add environment variables on Render corresponding to your .env file.
- 3. Use Render’s PostgreSQL service for database hosting.
 
 ---

Made with ♥️ **Thomas Schrödinger**
