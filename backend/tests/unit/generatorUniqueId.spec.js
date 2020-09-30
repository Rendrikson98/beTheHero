const generateUniqueId = require('../../src/utils/generatorUniqueId');

describe('Generate Unique ID', ()=>{
    it('should generate anunique ID', ()=>{
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
})

