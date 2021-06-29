import database from "../db";
import faker from 'faker'
import mongodb from 'mongodb';

//create fake datas
export async function saveFakeDatas(req, res) {
    let users = [];
    
    
    for (let i = 0; i < 1000; i++) {
        users.push({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(), 
            job: faker.name.jobTitle(),
            unemployed: faker.datatype.boolean(), 
            createdAt: new Date(faker.date.past(1)).getTime(), 
            updatedAt: new Date(faker.date.between(faker.date.past(1), faker.date.recent())).getTime()
        })    
    }
    
    try {
        const dbClient = await database();
        await dbClient.collection('users').insertMany([
            ...users
        ])

        res.status(200).json({
            message: "Fake User data saved successfully",
            datas: [...users]
        })
    } catch (error) {
        console.log("SAVE FAKE DATA ERR ======================= ", error);
    }
}

export async function getAllUserController(req, res) {
    const page = req.query.page;
    const page_size = req.query.page_size;

    const skip = (page - 1) * page_size || 0;
    const limit = page_size || 15;
    try {
        const dbClient = await database();
        const totalUsers = await dbClient.collection('users').count();
        const users = await dbClient.collection('users').aggregate([
            {$match: {}},
            {$sort: {'updatedAt': -1, 'createdAt': -1}},
            {$skip: parseInt(skip)},
            {$limit: parseInt(limit)},
        ]).toArray()

        res.json({
            users,
            totalUsers
        })
    } catch (error) {
        console.log("GET ALL USERS ERROR CONTROLLER ===================== ",error);
    }
}

export async function updateUsersController(req, res) {
    const {selected:selectedIds, isUnemployed} = req.body;
    const ids = selectedIds.map(id => new mongodb.ObjectID(id));

    let bulkUpdateOps = [];
    let counter = 0;

    try {
        const dbClient = await database();

        ids.forEach(async id => {
            bulkUpdateOps.push({
                updateOne: {
                    filter: {_id: id},
                    update: {
                        $set: {
                            unemployed: isUnemployed,
                            updatedAt: Date.now()
                        }
                    }
                }
            });

            counter++;

            if(counter % 500 == 0){
                await dbClient.collection('users').bulkWrite(bulkUpdateOps);
                bulkUpdateOps = [];
            }
        });

        if(counter % 500 != 0){
            await dbClient.collection('users').bulkWrite(bulkUpdateOps);
            bulkUpdateOps = [];
        }

        console.log("DONE ================== ");

        res.status(200).json({
            message: `${selectedIds.length} users have been updated successfully`
        })
    } catch (error) {
        console.log(error);
    }
}