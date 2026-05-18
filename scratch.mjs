import { GoogleGenerativeAI } from "@google/generative-ai";

async function run() {
    const genAI = new GoogleGenerativeAI("AIzaSyAlprZ91gYc2IuPBUXqzuJQmfpBvNfDNeo");
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAlprZ91gYc2IuPBUXqzuJQmfpBvNfDNeo');
        const data = await response.json();
        console.log("Models:", data.models.map(m => m.name));
    } catch (e) {
        console.error(e);
    }
}
run();
