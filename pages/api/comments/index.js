import fs from 'fs'
import { MongoClient } from 'mongodb'
async function handler(req, res) {
    let client;
    try {
         client = await MongoClient.connect('mongodb+srv://sajeed:Q9N8P0dwUOwcF0fC@cluster0.1gbyio1.mongodb.net/next-api')
    } catch (error) {
        res.status(500).json({message: 'Connection error'})
    }

    switch(req.method) {

        case 'POST': {
            // const data = fs.readFileSync(`${process.cwd()}/dummy-comments.json`, 'utf-8')
            // const existingData = JSON.parse(data)
            try {
                const inputData = JSON.parse(req.body)
                console.log(req.body, inputData)
                const db = client.db()
                await db.collection('comments').insertOne({comment: inputData})
                res.status(200).json({message: 'stored!!'})
            } catch (error) {
                res.status(400).json({message: 'Insertion error'})

            }
           
            // existingData.push(inputData)
            // fs.writeFileSync(`${process.cwd()}/dummy-comments.json`, JSON.stringify(existingData))
        }
        case 'GET': {
            try {
                const db = client.db()
                const comments = await db.collection('comments').find().sort({_id: -1}).toArray()
                // const existingData = JSON.parse(comments);
                 res.status(200).json({comments})
                // const data = fs.readFileSync(`${process.cwd()}/dummy-comments.json`, 'utf-8')
                
            } catch (error) {
                return res.status(400).json({message: 'failed', responseMessage: error.message})

            }

        }
        default: {
             res.status(400).json({message: 'failed', responseMessage: 'provide correct method type'})
        }

    }
    client.close()
    
}

export default handler