import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontolProductCart from '../components/HorizontolProductCart'
import VerticalProductCart from '../components/VerticalProductCart'

const Home = () => {
  return (
    <div className=' '>
      
      <CategoryList/>
      
      <BannerProduct/>
      <HorizontolProductCart category={'airpodes'} heading={'Trending Boat Airdropes'}/>
      <HorizontolProductCart category={'earphones'} heading={'Trending Boat Earphones'}/>
      <VerticalProductCart category={'mobile'} heading={'Trending Boat Mobile'}/>
      <VerticalProductCart category={'camera'} heading={'Trending Boat Mobile'}/>
      <VerticalProductCart category={'mouse'} heading={'Trending Boat Mobile'}/>
      <VerticalProductCart category={'printer'} heading={'Trending Boat Mobile'}/>
      <VerticalProductCart category={'processor'} heading={'Trending Boat Mobile'}/>
    </div>
  )
}

export default Home
