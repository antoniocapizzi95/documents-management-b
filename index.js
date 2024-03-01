require('dotenv').config();

const { program } = require('commander');
const DocumentsClient = require('./clients/documents.client');
const DocumentRepository = require('./repository/document/document.repository');

const client = new DocumentsClient();
const documentRepository = new DocumentRepository();

async function initializeApp() {
    try {
        client.login()
    } catch (error) {
        console.error('Error with login:', error.message);
        console.error('Impossible to execute the application');
        return;
    }

    program
    .version('0.1.0')
    .description('CLI tool for interacting with Documents Management API');

    program
    .command('list')
    .description('Retrieve a list of documents')
    .action(handleListDocuments);

    program
    .command('get <id>')
    .description('Retrieve a document by id')
    .action(handleGetDocument);

    program
    .command('create <content>')
    .description('Create a new document')
    .action(client.createDocument);

    program
    .command('update <id> <content>')
    .description('Update a document')
    .action(client.updateDocument);

    program
    .command('delete <id>')
    .description('Delete a document')
    .action(client.deleteDocument);


    program.parse(process.argv);
}

initializeApp();

//----- declaration part

async function handleListDocuments() {
    const response = await client.listDocuments();
    if (response) {
        try {
            for (const doc of response) {
                await documentRepository.addDocument(doc.id, doc);
            }
            console.log('Documents saved on local db!');
        } catch(error) {
            console.error('Error during list documents handling:', error.message);
        }
    }
}

async function handleGetDocument(id) {
    const response = await client.getDocument(id);
    if (response) {
        try {
            await documentRepository.addDocument(response.id, response);
            console.log('Document saved on local db!');
        } catch(error) {
            console.error('Error during get document handling:', error.message);
        }
    }
}