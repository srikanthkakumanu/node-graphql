# node-graphql

This repository demonstrates a simple but powerful API developed using GraphQL, Apollo, Node.js, and Express.js. It showcases modern development practices including a type-safe ORM with Prisma, functional error handling with Effect-TS, and distributed tracing with OpenTelemetry and Zipkin.

## ✨ Features

- **GraphQL API**: A fully-featured GraphQL API built with Apollo Server.
- **CRUD Operations**: Complete Create, Read, Update, and Delete functionality for `Genre`, `Book`, `Author`, and `Review` entities.
- **Type-Safe Database Access**: Uses Prisma as a next-generation ORM for robust and type-safe database queries.
- **Functional Error Handling**: Leverages Effect-TS for managing asynchronous operations and errors in a functional, composable way.
- **Observability**: Integrated with OpenTelemetry for generating and exporting traces.
- **Distributed Tracing**: Configured to export traces to Zipkin, allowing for easy visualization of request flows.
- **Cloud-Ready**: Includes GCP-specific resource detectors, making it ready for deployment on Google Cloud Platform.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **GraphQL**: Apollo Server
- **ORM**: Prisma
- **Observability**: OpenTelemetry
- **Tracing Backend**: Zipkin

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- A running instance of a supported database (e.g., PostgreSQL, MySQL, SQLite). I have used Prisma Postgres
- A running instance of Zipkin for viewing traces.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd node-graphql
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure your environment:**
    Create a `.env` file in the root of the project and add your database connection string. See `prisma/schema.prisma` for the database provider.

    ```env
    # Example for PostgreSQL
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
    ```

4.  **Run database migrations:**
    Prisma uses a schema file to manage your database structure. Apply the migrations to set up your database tables.

    ```bash
    npx prisma migrate dev
    ```

5.  **Seed the database (Optional):**
    The application will automatically seed the database with sample data on startup. The seed data is located in `/config/data`. You can also run the seeder manually:
    ```bash
    npx tsx src/db/seed.ts
    ```

### Running the Application

- **Running Zipkin server:**
  ```bash
  bash docker run -d -p 9411:9411 openzipkin/zipkin
  ```
- **Start the server:**
  ```bash
  npm start
  ```
- The GraphQL API will be available at `http://localhost:4000/graphql`. You can access the Apollo Studio Sandbox in your browser to interact with the API.

## 📡 API Usage

Here are a few example queries and mutations you can run in the Apollo Studio Sandbox.

### Genres

#### Query: Get all genres

```graphql
query GetAllGenres {
  genres {
    id
    name
  }
}
```

### Mutation: Create a new genre

```graphql
mutation CreateGenre($name: String!) {
  createGenre(name: $name) {
    id
    name
  }
}
```

**Variables:**

```json
{
  "name": "Science Fiction"
}
```

## 🔭 Observability

This project is instrumented with OpenTelemetry to provide insights into application performance.

- **Traces**: All incoming GraphQL requests and outgoing database queries are traced.
- **Backend**: Traces are exported to Zipkin. Make sure your Zipkin instance is running. The default URL for the Zipkin UI is `http://localhost:9411`.
