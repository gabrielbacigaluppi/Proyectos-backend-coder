import {findAll,findById,createOne,deleteOne,updateOne} from "../services/products.service.js"

export const findAllProducts = async (req,res)=>{
    try{
        const products = await findAll(req.query)
        const sessionData = req.session;
        const object = {
            productsArray: products.info.payload,
            session: sessionData
        };
        res.render("products",object);
        // res.status(200).json({message:'Products found', products})
        
    }catch(error){
        res.status(500).json({message:error})  
    }
}

export const findProduct = async(req, res) => {
    const { idProduct } = req.params;
    try{
        const product = await findById(idProduct)
        res.render("productsDetails",product);
        // res.status(200).json({message:'Product found', product})
    }catch(error){
        res.status(500).json({message:error})
    }

}

export const createProduct= async(req,res)=> {
    try{
        const newProduct = await createOne(req.body)
        res.status(200).json({message:'Product created', product: newProduct})
    }catch(error){
        res.status(500).json({message:error})
    }
}

export const updateProduct= async(req,res)=>{
    const {idProduct}= req.params
    const updatedProduct = req.body
    try{
        const response = await updateOne(idProduct,updatedProduct)
        if(response === -1){
            res.status(400).json({message:'Product not found with the id sent'})
        }
        else{
            res.status(200).json({message:'Product updated'})
        }
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

export const deleteProduct= async(req,res)=>{
    const {idProduct}= req.params
    try{
        const response = await deleteOne(idProduct)
        res.status(200).json({message:'Product deleted'})
    }
    catch(error){
        res.status(500).json({message:error})
    }
}


