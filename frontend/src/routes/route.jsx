import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import Signup from '../pages/Signup'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetialCart from '../components/ProductDetialCart'
import AddToCartPageDetails from '../pages/AddToCartPageDetails'
import SearchProduct from '../pages/SearchProduct'

const appRoute =createBrowserRouter([
    {
        path:'/',
        element : <App/>,
        children :[
            {
                path:'',
                element: <Home/>
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path:'forgotPassword',
                element: <ForgotPassword/>
            },
            {
                path:'signup',
                element: <Signup/>
            },
            {
                path:'productCategory',
                element:<CategoryProduct/>

            },
            {
                path:'productDetailCart/:prodId',
                element:<ProductDetialCart/>

            },
            {
                path:'cart',
                element:<AddToCartPageDetails/>

            },
            {
                path:'search',
                element:<SearchProduct/>

            },
            {
                path:'adminPanel',
                element: <AdminPanel/>,
                children:[
                    {
                        path:'allUsers',
                        element: <AllUsers/>
                    },
                    {
                        path:'allProducts',
                        element: <AllProducts/>
                    }
                ]
            }
            
        ]
    }
])

export default appRoute