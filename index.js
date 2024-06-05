import express from 'express'
const app = express()
app.use(express.json()) //middleware

import { config } from 'dotenv';
config()

//Requiring and setting up OpenAI API
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// app.get("/", (request, response) => {
//     response.send("Hello")
// })

app.post("/openAIResults", async (request, response) => {
    try{
        const res = await openai.chat.completions.create({
            model:"davinci-002",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in analyzing time complexity. Please tell me the time complexity of the following code."
                },
                {
                    role: "user", 
                    content: "def foo(n, k):\n        accum = 0\n        for i in range(n):\n            for l in range(k):\n                accum += i\n        return accum"
                }
            ]
        })

        return response.status(200).json({
            success: true, 
            data: res
        })
        
    }
    catch (error){
        console.log(error)
    }
})

const port = process.env.PORT || 8000
app.listen(port, () => 
    console.log(`Server listening on port ${port}`)    
);