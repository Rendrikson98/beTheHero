const connection = require('../database/connection');
const generatorUniqueId = require('../utils/generatorUniqueId');

module.exports = {
    async index (request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create (request, response){
        const {name, email, whatsapp, city, uf} = request.body;
    
        const id = generatorUniqueId();
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        
        return response.json({id});
    }
}