import s from "./switch.module.scss";
import { TfiExchangeVertical } from "react-icons/tfi";

import PropTypes from "prop-types";

const SwitchButton = ({ onClick }) => {
  return (
    <button className={s.btn} onClick={onClick}>
      <TfiExchangeVertical />
    </button>
  );
};

SwitchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SwitchButton;
