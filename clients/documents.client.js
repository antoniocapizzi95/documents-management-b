const axios = require('axios');

module.exports = class DocumentsClient {
    constructor() {
        this.apiUrl = process.env.API_URL;
        this.username = process.env.USER;
        this.password = process.env.PASSWORD
    }

    async login() {
        try {
            const response = await axios.post(`${this.apiUrl}/auth/login`, { username: this.username, password: this.password });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        } catch (error) {
            throw error;
        }
    }
    
    async listDocuments() {
        try {
            const response = await axios.get(`${this.apiUrl}/documents`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error retrieving documents:', error.message);
        }
    }
    
    async getDocument(id) {
        try {
            const response = await axios.get(`${this.apiUrl}/documents/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error retrieving document:', error.message);
        }
    }
    
    async createDocument(content) {
        try {
            const response = await axios.post(`${this.apiUrl}/documents`, { content });
            console.log('Document created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating document:', error.message);
        }
    }
    
    async updateDocument(id, content) {
        try {
            const response = await axios.put(`${this.apiUrl}/documents/${id}`, { content });
            console.log('Document updated:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating document:', error.message);
        }
    }
    
    async deleteDocument(id) {
        try {
            await axios.delete(`${this.apiUrl}/documents/${id}`);
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error.message);
        }
    }
}