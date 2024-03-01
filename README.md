# Documents Management CLI Tool

This CLI tool is designed to interact with the Document Management API, providing a command-line interface for managing documents. It supports operations such as listing documents, fetching a specific document by ID, creating, updating, and deleting documents. Authentication is handled through a login command that retrieves a JWT token for protected endpoints.

## Prerequisites

- Node.js (version 14 or later)
- Docker and Docker Compose
- Access to the Document Management API (this project must be running: https://github.com/antoniocapizzi95/documents-management-a)

## Installation

To install the CLI tool, follow these steps:

1. Clone the repository and navigate to the CLI tool directory.
2. Install dependencies: `npm install`.
3. On project root create a ```.env``` file and copy the contents of the ```.env.sample``` file (already present in the repository).
4. Execute `docker-compose up` command to run the local database.

## Usage

Below are the available commands and their descriptions:

### List Documents

Retrieves a list of all documents.

```bash
npm start list
```

### Get Document

Retrieves a specific document by its ID.

```bash
npm start get <id>
```

### Create Document

Creates a new document with the specified content.

```bash
npm start create "<content>"
```

### Update Document

Updates an existing document by ID with new content.

```bash
npm start update <id> "<new content>"
```

### Delete Document

Deletes a specific document by its ID.

```bash
npm start delete <id>
```