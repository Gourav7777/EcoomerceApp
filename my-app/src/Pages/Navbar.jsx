import React, { useEffect } from 'react';
import { Flex, Button, useMediaQuery } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';


const Navbar = ({ fetchProducts }) => {
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
  const [isSmallerThan480] = useMediaQuery('(max-width: 480px)');
  const [isSmallerThan360] = useMediaQuery('(max-width: 360px)');


  
let url = `http://localhost:8000/products`;
  const handleCategoryClick = (categoryName) => {
   
    const categoryUrl = `${url}/category/${categoryName}`;
    console.log(categoryUrl);
    fetchProducts(categoryUrl);
  };

  useEffect(()=>{

  },[url])
  return (
    <Flex justifyContent="space-between" alignItems="center" border="0px solid black" backgroundColor="#e40046" padding="20px">
      <Flex>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'}>{isSmallerThan768 ? 'Add' : 'Add Products'}</Button>
      </Flex>

      <Flex gap={isSmallerThan768 ? 1 : 2}>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick("men's clothing")}>Men</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick("women's clothing")}>Women</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick('electronics')}>Electronics</Button>
        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} onClick={() => handleCategoryClick('jewelery')}>Jewellery</Button>

        <Button size={isSmallerThan360 ? 'xs' : isSmallerThan480 ? 'xs' : 'md'} leftIcon={<FaShoppingCart />}>0</Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
