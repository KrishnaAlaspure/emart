import axios from 'axios'
import React from 'react'
import summaryAPI from '../utils/summaryAPIs'

const fetchProductsByCategory =async(category) => {
    try {
        console.log(category);
        const res =await axios.post(summaryAPI.getAllProductsForCategory.URL,{category})

        console.log(res.data);
        return res
    } catch (error) {
        
    }
}   

export default fetchProductsByCategory
