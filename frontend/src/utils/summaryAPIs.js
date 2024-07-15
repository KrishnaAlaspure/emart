const backendDoamin="http://localhost:5000"

const summaryAPI={
    signup:{
        URL:`${backendDoamin}/api/signup`,
        Method: "Post"
    },
    login:{
        URL:`${backendDoamin}/api/login`,
        Method: "Post"
    },
    logout:{
        URL:`${backendDoamin}/api/logout`,
        Method: "Get"
    },
    currentUserDetails:{
        URL:`${backendDoamin}/api/userDetails`,
    },
    allUser:{
        URL:`${backendDoamin}/api/allUsers`,
        Method : 'GET'
    },
    updateUserInfo:{
        URL:`${backendDoamin}/api/updateUserInfo`,
        Method: 'PUT'
    },
    deleteUser:{
        URL:`${backendDoamin}/api/deleteUser`,
        Method:'DELETE'
    },
    uploadProduct:{
        URL:`${backendDoamin}/api/uploadProduct`,
        Method:'POST'
    },
    getAllProducts:{
        URL:`${backendDoamin}/api/getAllProducts`,
        Method:'GET '
    },
    updateProductDetail:{
        URL:`${backendDoamin}/api/updateProductDetail`,
        Method:'PUT'
    },
    deleteProduct:{
        URL:`${backendDoamin}/api/deleteProduct`,
        Method:'DELETE'
    },
    getProductByCategory:{
        URL:`${backendDoamin}/api/getProductByCategory`,
        Method : 'GET'
    },
    getAllProductsForCategory:{
        URL:`${backendDoamin}/api/getAllProductsForCategory`,
        Method : 'POST'
    },
    getSingleProductDetails:{
        URL:`${backendDoamin}/api/getSingleProductDetails`,
        Method : 'POST'
    },
    addToCart:{
        URL:`${backendDoamin}/api/addToCart`,
        Method : 'POST'
    },
    countAddtoCartItems:{
        URL:`${backendDoamin}/api/countAddtoCartItems`,
        Method:'GET'
    },
    addToCartViewController:{
        URL:`${backendDoamin}/api/addToCartViewController`,
        Method:'GET'
    },
    updateCartProductQuantityController:{
        URL:`${backendDoamin}/api/updateCartProductQuantityController`,
        Method:'POST'
    },
    deleteProductFromCartController:{
        URL:`${backendDoamin}/api/deleteProductFromCartController`,
        Method:'DELETE'
    },
    searchProductController:{
        URL:`${backendDoamin}/api/searchProductController`,
        Method:'DELETE'
    },
    filterProductController:{
        URL:`${backendDoamin}/api/filterProductController`,
        Method:'GET'
    },

}

export default summaryAPI;