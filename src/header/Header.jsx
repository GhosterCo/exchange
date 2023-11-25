import React from "react";
import PropTypes from "prop-types";
import s from "./Header.module.scss";

const Header = ({ rates }) => {
  const uahToUsdRate = rates["UAH"] / rates["USD"];
  const uahToEurRate = rates["UAH"] / rates["EUR"];

  return (
    <div className={s.header}>
      <p>Current Exchange Rates:</p>
      <p>UAH to USDT: {uahToUsdRate.toFixed(4)}</p>
      <p>UAH to EUR: {uahToEurRate.toFixed(4)}</p>
    </div>
  );
};

Header.propTypes = {
  rates: PropTypes.object.isRequired,
};

export default Header;
