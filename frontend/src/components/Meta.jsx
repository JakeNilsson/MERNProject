import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

Meta.defaultProps = {
  title: "Welcome to ProShop",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
