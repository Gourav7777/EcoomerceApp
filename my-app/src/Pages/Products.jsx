import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Flex,Text, Image, Button} from '@chakra-ui/react';

const Products = () => {
    const [products, setProducts] = useState([]);

    let url = `http://localhost:8000/products`
    const fetchProducts = async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      useEffect(()=>{
        fetchProducts(url)
      },[url])
     
  return (
    <div style={{}}>
        <Navbar   fetchProducts={fetchProducts}/>
  <br /> 

   

        <Flex flexWrap="wrap" justifyContent="center">
      {products.map((product) => (
        <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" m="4" maxW="300px" w="100%">
          <Flex direction="column">
            <Image src={product.image} alt={product.title} boxSize="200px" objectFit="cover" mb="4" />
            <Text fontSize="xl" mb="2" noOfLines={1}>{product.title}</Text>
            <Text color="gray.500" mb="4">${product.price}</Text>
            <Button >Add to Cart</Button>
          </Flex>
        </Box>
      ))}
    </Flex>
    </div>
  )
}

export default Products