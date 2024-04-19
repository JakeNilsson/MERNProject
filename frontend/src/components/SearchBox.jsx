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
  const { data: categories, isLoading, error } = useGetProductCategoriesQuery();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
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
              <Dropdown.Item href={`/category/${category}`}>
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
