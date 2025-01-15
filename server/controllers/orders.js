import Order from "../models/Order.js";
const postOrders = async (req, res) =>{
    const {
        products,
    
        deliverAdderss,
        phone,
        paymentMode,
       
     } = req.body
     if(!products || !deliverAdderss || !phone || !paymentMode ){
        return res.status(400).json({
            success:false,
            message:"All field are required"
        });
     }


     let totalBill = 0;

     products.forEach((product) =>{
        totalBill += product.price = product.quantity;
     });
     try{
        const newOrder = new Order({
           
            products,
            totalBill,deliverAdderss,
            phone,
            paymentMode
        })
        const savedOrder = await newOrder.save();


        return res.json({
            success:true,
            message:"Order placed successfully",
            data:savedOrder
        })
     }
     catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
     }
   

}

const putOrders = async(req, res) =>{
    
}

export{postOrders,putOrders}