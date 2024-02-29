require('dotenv').config();
const axios = require('axios');
const { program } = require('commander');

const apiUrl = process.env.API_URL;
const username = process.env.USER;
const password = process.env.PASSWORD

async function initializeApp() {
    const token = await login(username, password)
    if (!token) {
        console.log('Impossible to execute the program')
        return
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    program
    .version('0.1.0')
    .description('CLI tool for interacting with Documents Management API');

    program
    .command('list')
    .description('Retrieve a list of documents')
    .action(listDocuments);

    program
    .command('get <id>')
    .description('Retrieve a document by id')
    .action(getDocument);

    program
    .command('create <content>')
    .description('Create a new document')
    .action(createDocument);

    program
    .command('update <id> <content>')
    .description('Update a document')
    .action(updateDocument);

    program
    .command('delete <id>')
    .description('Delete a document')
    .action(deleteDocument);


    program.parse(process.argv);
}

initializeApp()

//----- declaration part

async function login(username, password) {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, { username, password });
        return response.data.token;
    } catch (error) {
        console.error('Error with login:', error.message);
        return null;
    }
}

async function listDocuments() {
    try {
        const response = await axios.get(`${apiUrl}/documents`);
        console.log(response.data);
    } catch (error) {
        console.error('Error retrieving documents:', error.message);
    }
}

async function getDocument(id) {
    try {
        const response = await axios.get(`${apiUrl}/documents/${id}`);
        console.log(response.data);
    } catch (error) {
        console.error('Error retrieving document:', error.message);
    }
}

async function createDocument(content) {
    try {
        const response = await axios.post(`${apiUrl}/documents`, { content });
        console.log('Document created:', response.data);
    } catch (error) {
        console.error('Error creating document:', error.message);
    }
}

async function updateDocument(id, content) {
    try {
        const response = await axios.put(`${apiUrl}/documents/${id}`, { content });
        console.log('Document updated:', response.data);
    } catch (error) {
        console.error('Error updating document:', error.message);
    }
}

async function deleteDocument(id) {
    try {
        await axios.delete(`${apiUrl}/documents/${id}`);
        console.log('Document deleted successfully');
    } catch (error) {
        console.error('Error deleting document:', error.message);
    }
}

