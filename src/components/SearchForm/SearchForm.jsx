import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchForm.module.css";

export const SearchForm = ({ onSearch }) => {
  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const inputValue = inputRef.current.value;
    if (!inputValue.trim()) {
      toast.error("Please fill in the search field");
      return;
    }
    onSearch(inputValue);
    evt.target.reset;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder=""
          defaultValue={""}
        />
        <button type="submit">Search</button>
        <Toaster style={{ padding: "80px" }} />
      </form>
    </div>
  );
};