import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import css from "./Backlink.module.css";

export const Backlink = ({ to, children }) => {
  return (
    <Link to={to} className={css.backlink}>
      <BsArrowLeft size="20" />
      {children}
    </Link>
  );
};