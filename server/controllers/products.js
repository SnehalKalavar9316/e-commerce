import Product from "../models/Product.js";

const postProducts = async(req, res) =>{

    const {
        name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        category,
        images,
        tags
    } = req.body;

    if(!name || !shortDescription || !longDescription || !price || !category || !images)
    {
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        })
    }

    const newProduct = new Product({
        name, 
        shortDescription,
         longDescription,
         price,
         currentPrice,
         category,
         images,
         tags
    });
    try{
        const savedProduct = await newProduct.save();

        return res.json({
            success:true,
            message:"Product created successfully",
            data:savedProduct
        })
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }

}


const getProducts = async(req, res) =>{
    const {limit, search} = req.body;
    const products = await Product.find({
        name:{
            $regex:new RegExp(search || ""),
            $options:"i"//i means case insensetive
        },
        shortDescription:{
            $regex:new RegExp(search || ""),
            $options:"i"//i means case insensetive
        },

    }).limit(parseInt(limit || 100))  //limit=1 or limit || 100 its a bydefault 
    //postman get /products?limit=3&search=lenovo

    return res.json({
        success: true,
        data:products,
        message:"Products fatched successfuly"
    })
}
export {postProducts, getProducts};