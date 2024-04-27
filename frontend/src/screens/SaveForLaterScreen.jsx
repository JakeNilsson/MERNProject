import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart } from '../slices/cartSlice'
import { removeFromSavedItems } from '../slices/saveSlice'

const SaveForLaterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const saved = useSelector((state) => state.saved);
  const {savedItems} = saved;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({...product, qty}));
    dispatch(removeFromSavedItems(product._id));
    navigate('/cart');
  };
  
  const removeFromSavedHandler = async (id) => {
    dispatch(removeFromSavedItems(id));
  }

  return <Row>
    <Col md={8}>
        <h1 style={{marginBottom: '20px'}}>Saved For Later</h1>
        {savedItems.length === 0 ? (
            <Message>
                You have no saved items <Link to='/'>Go Back</Link>
            </Message>
        ) : (
            <ListGroup variant='flush'>
                {savedItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row>
                            <Col md={2}>
                                <Image src={ item.image } alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={ `/product/${item._id}` }>
                                    {item.name}
                                </Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                              <Button 
                                type='button' 
                                variant='light'
                                disabled={item.countInStock === 0}
                                onClick={() => addToCartHandler(item, 1)}
                              >Add to Cart</Button>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={() => removeFromSavedHandler(item._id)}>
                                    <FaTrash />
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </Col>
    </Row>;
}

export default SaveForLaterScreen