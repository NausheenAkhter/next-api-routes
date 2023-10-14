import fs from 'fs'

function handler(req, res) {
    switch(req.method) {
        case 'POST': {
            const data = fs.readFileSync(`${process.cwd()}/dummy-comments.json`, 'utf-8')
            const existingData = JSON.parse(data)
            const inputData = JSON.parse(req.body)
            existingData.push(inputData)
            fs.writeFileSync(`${process.cwd()}/dummy-comments.json`, JSON.stringify(existingData))
            return res.status(200).json({message: 'stored!!'})
        }
        case 'GET': {
            try {
                const data = fs.readFileSync(`${process.cwd()}/dummy-comments.json`, 'utf-8')
                const existingData = JSON.parse(data);
                return res.status(200).json({comments: existingData})
            } catch (error) {
                return res.status(400).json({message: 'failed', responseMessage: error.message})

            }

        }
        default: {
            return res.status(400).json({message: 'failed', responseMessage: 'provide correct method type'})
        }
    }
    
}

export default handler