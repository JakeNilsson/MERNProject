import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useGetProductCategoriesQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const { data: categories, isLoading, error } = useGetProductCategoriesQuery();

  const submitHandler = (e) => {
    e.preventDefault();
    setKeyword("");
    setMinPrice("");
    setMaxPrice("");
    if (keyword.trim()) {
      if (minPrice && maxPrice) {
        navigate(`/search/${keyword}/min/${minPrice}/max/${maxPrice}`);
      } else if (minPrice) {
        navigate(`/search/${keyword}/min/${minPrice}`);
      } else if (maxPrice) {
        navigate(`/search/${keyword}/max/${maxPrice}`);
      } else {
        navigate(`/search/${keyword}`);
      }
    } else {
      if (minPrice && maxPrice) {
        navigate(`/min/${minPrice}/max/${maxPrice}`);
      } else if (minPrice) {
        navigate(`/min/${minPrice}`);
      } else if (maxPrice) {
        navigate(`/max/${maxPrice}`);
      } else {
        navigate(`/`);
      }
    }
  };

  const handleItemClick = (category) => {
    setKeyword("");
    setMinPrice("");
    setMaxPrice("");
    if (keyword.trim()) {
      if (minPrice && maxPrice) {
        navigate(
          `/category/${category}/search/${keyword}/min/${minPrice}/max/${maxPrice}`
        );
      } else if (minPrice) {
        navigate(`/category/${category}/search/${keyword}/min/${minPrice}`);
      } else if (maxPrice) {
        navigate(`/category/${category}/search/${keyword}/max/${maxPrice}`);
      } else {
        navigate(`/category/${category}/search/${keyword}`);
      }
    } else {
      if (minPrice && maxPrice) {
        navigate(`/category/${category}/min/${minPrice}/max/${maxPrice}`);
      } else if (minPrice) {
        navigate(`/category/${category}/min/${minPrice}`);
      } else if (maxPrice) {
        navigate(`/category/${category}/max/${maxPrice}`);
      } else {
        navigate(`/category/${category}`);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return <Message variant="danger">{error}</Message>;
  } else {
    return (
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          className="mr-sm-2"
        ></Form.Control>

        <Form.Control
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="mr-sm-2"
        ></Form.Control>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>

        <Dropdown as={ButtonGroup} className="mx-2">
          <Button type="submit" variant="outline-light">
            Search
          </Button>
          <Dropdown.Toggle split variant="outline-light" />
          <Dropdown.Menu>
            <Dropdown.ItemText>Categories</Dropdown.ItemText>
            <Dropdown.Divider />
            {categories.map((category) => (
              <Dropdown.Item onClick={() => handleItemClick(category)}>
                {category}
              </Dropdown.Item>
            ))}{" "}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    );
  }
};

export default SearchBox;
