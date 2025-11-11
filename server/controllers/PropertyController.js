const PropertyService = require('../services/PropertyService');

class PropertyController {
    create(req,res){
        const {title,  description, address, price} = req.body;
        if(!title || !address || !description){
            return res.status(400).json({success:false, error: 'Missing required fields.'});
        }
        if(typeof price !== 'number'){
            return res.status(400).json({success:false, error: 'Price must be a number.'});
        }
        const property = PropertyService.create({title, description, address, price});
        return  res.status(201).json({success:true, data: property});
    }

    getAll(req,res){
        const { status, limit, page } = req.query;
        const properties = PropertyService.findAll(status, limit, page);
        return res.status(200).json({success:true, data: properties});
    }

    getById(req,res){
        const id = parseInt(req.params.id);
        const property = PropertyService.findById(id);
        if(!property){
            return res.status(404).json({success:false, error: 'Property not found.'});
        }   
        return res.status(200).json({success:true, data: property});
    }

    update(req,res){
        const id = parseInt(req.params.id);
        const {title, description, address, price, status} = req.body;
        const property = PropertyService.update(id, {title, description, address, price, status});
        if(!property){
            return res.status(404).json({success:false, error: 'Property not found.'});
        }
        return res.status(200).json({success:true, data: property});
    }

    delete(req,res){
        const id = parseInt(req.params.id);
        const success = PropertyService.delete(id); 
        if(!success){
            return res.status(404).json({success:false, error: 'Property not found.'});
        }
        return res.status(200).json({success:true, message: 'Property deleted successfully.'}); 
    }
}

module.exports =  new PropertyController();