import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Flex, Text, Image, Button, Alert, AlertIcon,Spinner  } from '@chakra-ui/react';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [CartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    let url = `https://odd-jade-gosling-sock.cyclic.app/products`
    const fetchProducts = async (url) => {
        try {
          setLoading(true);
          const response = await fetch(url);
          const data = await response.json();
          setProducts(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
        }
      };

      
     
      const addToCart = async (product) => {
        try {
          const isAlreadyInCart = CartProducts.some((item) => item.id === product.id);
          if (isAlreadyInCart) {
            setShowAlertError(true);
            setTimeout(() => {
              setShowAlertError(false);
            }, 2000);
          } else {
            const response = await fetch('https://odd-jade-gosling-sock.cyclic.app/cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product),
            });
            if (response.ok) {
              setShowAlert(true);
              setTimeout(() => {
                setShowAlert(false);
              }, 2000);
              fetchCartProducts(); 
            } else {
              console.error('Failed to add item to cart:', response.statusText);
            }
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
      };
      

      const fetchCartProducts = async()=>{
        try {
            const response = await fetch(`https://odd-jade-gosling-sock.cyclic.app/cart`);
            const data = await response.json();
            setCartProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
      }

      useEffect(()=>{
        fetchProducts(url)
        fetchCartProducts()
      },[url])


  return (
   

    
    <div style={{}}>
        <Navbar   fetchProducts={fetchProducts} CartProducts = {CartProducts}/>
       
     {/* <br />  */}

     {showAlert && (
        <Alert status="success" variant="subtle">
          <AlertIcon />
          Item added to cart successfully!
        </Alert>
      )}

    {showAlertError && (
        <Alert status="error" >
          <AlertIcon />
          Item is already in the cart!
        </Alert>
      )}

   {loading ? (
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex flexWrap="wrap" justifyContent="center">
          {products.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" m="4" maxW="300px" w="100%">
              <Flex direction="column">
                <Image src={product.image} alt={product.title} boxSize="200px" objectFit="cover" mb="4" />
                <Text fontSize="xl" mb="2" noOfLines={1}>{product.title}</Text>
                <Text fontSize="s" mb="2" noOfLines={2}>{product.description}</Text>
                <Text mb="4" fontWeight='bold'>${product.price}</Text>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </Flex>
            </Box>
          ))}
        </Flex>
      )}
    </div>

   
  )
}

export default Products