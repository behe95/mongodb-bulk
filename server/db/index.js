import mongodb from 'mongodb';

const db = new mongodb.MongoClient("mongodb://localhost/demo_mongod", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


export default async function database() {
    return new Promise((resolve, reject) => {
        db.connect().then((client) => {
            // console.log('Database is connected',client);
            resolve(client.db('demo_mongod'));
            
        }).catch(err => {
            console.log('Database Error: ==================> ', err);
            reject(err);
        })
    })
    
}