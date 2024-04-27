import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";

const Paginate = ({
  pages,
  page,
  minPrice,
  maxPrice,
  isAdmin = false,
  keyword = "",
  category = "",
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? category
                  ? keyword
                    ? minPrice
                      ? maxPrice
                        ? `/category/${category}/search/${keyword}/min/${minPrice}/max/${maxPrice}/page/${
                            x + 1
                          }`
                        : `/category/${category}/search/${keyword}/min/${minPrice}/page/${
                            x + 1
                          }`
                      : maxPrice
                      ? `/category/${category}/search/${keyword}/max/${maxPrice}/page/${
                          x + 1
                        }`
                      : `/category/${category}/search/${keyword}/page/${x + 1}`
                    : minPrice
                    ? maxPrice
                      ? `/category/${category}/min/${minPrice}/max/${maxPrice}/page/${
                          x + 1
                        }`
                      : `/category/${category}/min/${minPrice}/page/${x + 1}`
                    : maxPrice
                    ? `/category/${category}/max/${maxPrice}/page/${x + 1}`
                    : `/category/${category}/page/${x + 1}`
                  : keyword
                  ? minPrice
                    ? maxPrice
                      ? `/search/${keyword}/min/${minPrice}/max/${maxPrice}/page/${
                          x + 1
                        }`
                      : `/search/${keyword}/min/${minPrice}/page/${x + 1}`
                    : maxPrice
                    ? `/search/${keyword}/max/${maxPrice}/page/${x + 1}`
                    : `/search/${keyword}/page/${x + 1}`
                  : minPrice
                  ? maxPrice
                    ? `/min/${minPrice}/max/${maxPrice}/page/${x + 1}`
                    : `/min/${minPrice}/page/${x + 1}`
                  : maxPrice
                  ? `/max/${maxPrice}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

Paginate.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  keyword: PropTypes.string,
};

export default Paginate;
