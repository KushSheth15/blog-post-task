# Blog Post Task

## Overview

This project is a blog management system that allows users to manage blog posts with various features. It includes user authentication, CRUD operations, pagination, image uploads, search functionality, comments, and likes. The system is built using Node.js, Express, and MongoDB.

## Features

### User Authentication

- **Register**: Users can register an account by providing necessary details.
- **Login**: Users can log in with their credentials.
- **Authentication**: Secure access using JSON Web Tokens (JWT) for protected routes.

### CRUD Operations

- **Create**: Users can create new blog posts.
- **Read**: Users can view individual blog posts or retrieve a list of all posts.
- **Update**: Users can update their blog posts.
- **Delete**: Users can delete their blog posts.

### Pagination

- **Paginated Posts**: Retrieve a paginated list of blog posts to handle large sets of data efficiently.

### Image Uploads

- **Upload Images**: Support for uploading and associating images with blog posts.

### Search Functionality

- **Search**: Search blog posts based on keywords present in the titles or content.

### Comments and Likes

- **Comments**: Users can add comments to blog posts.
- **Likes**: Users can like blog posts.

### Error Handling

- **Validation**: Validation of request payloads to ensure data integrity.
- **Error Handling**: Proper handling and response for errors.