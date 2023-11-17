/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { 
  Container,Box,
  Grid,
  Typography,
  Stack,
  Rating,
  IconButton,
  Button,
  Divider,
 } from '@mui/material'
import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from 'configuration';

// eslint-disable-next-line react/prop-types
const OrderDetails = ({id}) => {
  const [orderItem, setOrderItem] = useState([]);

  async function getProductInfo(productId) {
    try {
      const response = await axios.get(`${API_URL}/menuitem/${productId}`);
      return response.data; // Assuming the response contains the product information
    } catch (error) {
      console.error(`Error retrieving product with ID ${productId}:`, error);
      return null;
    }
  }

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/orderitem/order/${id}`);
        const orderItems = response?.data;
  
        // Fetch product information and merge into orderItems
        const updatedOrderItems = await Promise.all(orderItems.map(async (orderItem) => {
          const productId = orderItem.item_id;
          const productInfo = await getProductInfo(productId);
  
          if (productInfo) {
            orderItem.productInfo = productInfo;
          }
  
          return orderItem;
        }));
  
        setOrderItem(updatedOrderItems);
      } catch (error) {
        console.error('Error retrieving order items:', error);
      }
    };
  
    fetchOrderItems();
  },[id])

  console.log({orderItem})
  return (
    <Container maxWidth="xl">
      {orderItem?.map((item) => (
      <Grid key={item?.id} container mt={8} gap={8}>
        <Grid
          item
          xs={12}
          sm={2}
          md={4}
          sx={{
            objectFit: "contain",
            overflow: "hidden",
            position: "relative",
            width: "100%",
            height: 300,
          }}
        >
          <img
            // src="https://via.placeholder.com/1000"
            src={item?.productInfo?.image_url}
            alt="product-image"
            style={{ height: '280px', width: '100%'}}
            // fill
          />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Typography
            variant="h5"
            sx={{ textTransform: "capitalize", mb: "12px" }}
          >
            {item?.productInfo?.name}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            Price:
            <Typography
              variant="caption"
              sx={{ ml: 1, color: "custom.red" }}
              fontWeight="bold"
            >
              {item?.price}
            </Typography>
          </Typography>
          <Stack direction={"row"} alignItems="center" mt={2}>
            <Typography mr={2}>Quantity: </Typography>
            <Typography fontWeight={"bold"} px={2}>
              {item?.quantity}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      ))}
    </Container>
  )
}

export default OrderDetails