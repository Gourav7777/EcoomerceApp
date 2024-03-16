import React, { useEffect, useState } from 'react';
import { Flex, Button, useMediaQuery, Heading } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Navbar = ({ fetchProducts, CartProducts }) => {
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
  const [isSmallerThan480] = useMediaQuery('(max-width: 480px)');
  const [isSmallerThan360] = useMediaQuery('(max-width: 360px)');
 
  const [text, setText]  = useState("All Products")
 
  
let url = `https://odd-jade-gosling-sock.cyclic.app/products`;
  const handleCategoryClick = (categoryName) => {
    const categoryUrl = `${url}/category/${categoryName}`;

    if(categoryName.length==0){
      setText("All Products")
      fetchProducts(url)
      return;
    }
    

    if(categoryName=="men's clothing"){
        setText("Men Products")
    }
    else if(categoryName=="women's clothing"){
      setText("Women Products")
    }
    else if(categoryName=="electronics"){
      setText("Electronic Products")
    }
    else if(categoryName=="jewelery"){
      setText("Jewellery")
    }
    else{
      setText("All Products")
    }
    console.log(categoryUrl);
    fetchProducts(categoryUrl);
  };

  useEffect(()=>{

  },[url])
  return (
    <>
   {
    isSmallerThan480?
   
    <Flex gap={2} justifyContent= 'center' alignItems="center" border="0px solid black" backgroundColor="#e40046" padding= {isSmallerThan480?"10px":"20px"} >
      
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={()=>handleCategoryClick("")} >{isSmallerThan768 ? 'All' : 'All Products'}</Button>
      

     
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick("men's clothing")}>Men</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick("women's clothing")}>Women</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick('electronics')}>Electronics</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick('jewelery')}>Jewellery</Button>
  
      <Link to="/cart">
        <Button 
         size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} mt={isSmallerThan480 ? '-1' : null} leftIcon={<FaShoppingCart />}> Cart {CartProducts.length}</Button>
      </Link>
      
    </Flex>
    
    :
    
    <Flex justifyContent= "space-between" alignItems="center" border="0px solid black" backgroundColor="#e40046" padding= {isSmallerThan480?"10px":"20px"} >
      <Flex>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={()=>handleCategoryClick("")} >{isSmallerThan768 ? 'All' : 'All Products'}</Button>
      </Flex>

      <Flex gap={isSmallerThan768 ? 1 : 2}>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick("men's clothing")}>Men</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick("women's clothing")}>Women</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick('electronics')}>Electronics</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick('jewelery')}>Jewellery</Button>
  
      <Link to="/cart">
        <Button 
         size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} mt={isSmallerThan480 ? '-1' : null} leftIcon={<FaShoppingCart />}> Cart {CartProducts.length}</Button>
      </Link>
      </Flex>
    </Flex>
    
    
    }

    <Heading padding=  {isSmallerThan768 ? "5px 20px":  "10px 20px"}    >
    {text}
    </Heading>
    </>
  );
};

export default Navbar;
