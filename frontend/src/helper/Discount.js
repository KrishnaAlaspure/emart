export const Discount=(sellingPrice,price)=>{
    const discount= ((sellingPrice/price)*100)-100
    return Math.round(discount*100)/100
}