const store = require('../data/properties');

class PropertyService{
    create(data){
        const payload = {
            id: store.getNextId(),
            title: data?.title.trim() || '',
            description: data?.description?.trim() || '',
            address: data?.address.trim() || '',
            price: typeof data?.price === 'number' ? data.price : 0,
            status: 'available',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        store.properties.push(payload);
        return payload;
    }

    findAll(status = "", limit = 10, page = 1){
        let properties = status ? 
           store.properties.filter(prop => prop?.status === status):
           store.properties;
       
        limit = parseInt(limit) || 1;
        page = parseInt(page) || 0;
        const offset = (page - 1) * limit;
        properties = properties.slice(offset, offset + limit);
        return { total:properties.length, properties, limit, offset};
    }

    findById(id){
        return store.properties.find(prop => prop?.id === id);
    }

    update(id, data){
    const property = this.findById(id);
    if(!property) return null;

    property.title = data?.title?.trim() || property.title;
    property.description = data?.description?.trim() || property.description;
    property.address = data?.address?.trim() ||  property.address;
    property.status = data?.status || property.status;
    property.price = typeof data?.price === 'number' ? data.price : property.price;
    property.updatedAt = new Date();
    return property;
    }

    delete(id){
        const index = store.properties.findIndex(prop => prop?.id === id);
        if(index === -1) return false;
        store.properties.splice(index, 1);
        return true;
    }
}

module.exports = new PropertyService();