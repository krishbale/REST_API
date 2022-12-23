const Product = require('../models/schema');

const getAllProducts = async(req,res) =>{
    const {company , name, featured ,sort ,select} = req.query;
    const queryObject = {}

if(company){
    
    queryObject.company = company
 
}
if(featured){
    
    queryObject.featured = featured
 
}
if(name){
    queryObject.name = { $regex: name,$options:'i'}
    
}
let apiData =  Product.find(queryObject)
if(sort){
    let sortFixed = sort.split(",").join(" ");
    apiData = apiData.sort(sortFixed);

}
if(select){
    // let selectFixed = select.replace(","," ");
    let selectFixed = select.split(",").join(" ");
    apiData = apiData.select(selectFixed);

}
let page = Number(req.query.page) || 1;
let limit = Number(req.query.limit) || 10;
let skip = (page - 1) * limit;

apiData = apiData.skip(skip).limit(limit);
console.log(queryObject)



 


    const Products = await apiData;
    res.status(200).json({ Products,nbHits:Products.length}  )

} 
const getAllProductsTesting = async(req,res) =>{
    const myData = await Product.find(req.query)
    console.log(req.query);
    res.status(200).json({ myData })

} 

module.exports = { getAllProducts, getAllProductsTesting}
//username and password for rest api
//restapi
//restapikrishz