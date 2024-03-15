import { Box, Button, Flex, Heading, Image, Spinner, Text, Alert, AlertIcon, CloseButton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert

    const fetchCartProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://odd-jade-gosling-sock.cyclic.app/cart`);
            const data = await response.json();
            setCartProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const updateCartQuantity = async (productId, quantity) => {
        try {
            await fetch(`https://odd-jade-gosling-sock.cyclic.app/cart/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });

            fetchCartProducts()
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await fetch(`https://odd-jade-gosling-sock.cyclic.app/cart/${productId}`, {
                method: 'DELETE'
            });
            fetchCartProducts();
           
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 2000);
                fetchCartProducts(); 
             
            // Show the alert after successful deletion
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const totalAmount = cartProducts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0).toFixed(2);
    const totalItems = cartProducts.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    useEffect(() => {
        fetchCartProducts();
    }, []);

    return (
        <>
            <Heading as='h4' size='md' backgroundColor="#e40046" padding="20px" color='white'>
                Welcome to Cart Page
            </Heading>
            <br />
            {showAlert && (
                <Alert status="success" >
                    <AlertIcon />
                    Item removed from cart successfully!
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
                </Alert>
            )}
            {loading ? (
                <Flex justifyContent="center" alignItems="center" height="50vh">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <Flex direction={{ base: 'column', md: 'row' }} padding='20px' gap={10}>
                    {cartProducts.length === 0 ? (
                        <Flex direction="column" alignItems="center" width="100%">
                            <Text fontSize="xl" fontWeight="bold" color="gray" textAlign="center" width="100%" marginBottom="4">
                                Your cart is empty. Please add items to shop.
                            </Text>
                            <Link to="/"> {/* Link to the products page */}
                                <Button colorScheme="teal" size="lg">
                                    Shop Now
                                </Button>
                            </Link>
                        </Flex>
                    ): (
                        <>
                            <Flex width={{ base: '100%', md: '70%' }} border='0px solid black' maxHeight="80vh" overflowY="auto" flexDirection='column' gap={5} paddingRight='5px'>
                                {cartProducts.map((product) => (
                                    <Flex key={product.id} width="100%" border='1px solid black' padding='10px 30px' gap='40px'>
                                        <Flex flexDirection='column' gap='25px'>
                                            <Image src={product.image} alt={product.title} boxSize="100px" objectFit="cover" marginRight="20px" />
                                            <Flex gap='5px'>
                                                <Button size='sm' fontWeight='bold' onClick={() => updateCartQuantity(product?._id, product?.quantity - 1)} isDisabled={product.quantity === 1}>  -  </Button>
                                                <Text>{product.quantity || 0}</Text>
                                                <Button size='sm' onClick={() => updateCartQuantity(product?._id, product.quantity+1)}> +</Button>
                                            </Flex>
                                        </Flex>
                                        <Box>
                                            <Heading as="h5" size="md">{product.title}</Heading>
                                            <Text marginTop='5px' marginBottom='5px' color='gray'>Category: {product.category}</Text>
                                            <Text noOfLines={2} color='gray'>Description: {product.description}</Text>
                                            <Text marginTop='5px' marginBottom='5px' fontWeight='bold'>Price: ${product.price}</Text>
                                            <Button onClick={() => removeFromCart(product?._id)} bg="#e40046" color='white'>Remove from Cart</Button>
                                        </Box>
                                    </Flex>
                                ))}
                            </Flex>

                            <Flex width={{ base: '100%', md: '30%' }} border='1px solid black' padding='5px' flexDirection='column' color='gray' marginTop={{ base: '20px', md: '0' }}>
                                <Text marginBottom='5px'>PRICE DETAILS</Text>
                                <hr />
                                <br />
                                <Flex justifyContent='space-between' marginBottom='5px'>
                                    <Text>Price (total {totalItems} items)</Text>
                                    <Text>{totalAmount}</Text>
                                </Flex>
                                <Flex justifyContent='space-between' marginBottom='5px'>
                                    <Text>Discount</Text>
                                    <Text>0</Text>
                                </Flex>
                                <Flex justifyContent='space-between' marginBottom='5px'>
                                    <Text>Delivery Charges</Text>
                                    <Text style={{ color: 'green', fontWeight: '700' }}>Free</Text>
                                </Flex>
                                <hr />
                                <br />
                                <Flex justifyContent='space-between' color='black' fontWeight='bold' marginBottom='5px'>
                                    <Text>Total Amount</Text>
                                    <Text>{totalAmount}</Text>
                                </Flex>
                                <hr />
                            </Flex>
                        </>
                    )}
                </Flex>
            )}

            
            
        </>
    );
};

export default Cart;
