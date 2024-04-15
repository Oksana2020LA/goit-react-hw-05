import css from "./ErrorMessage.module.css";

export const ErrorMessage = () => {
  return (
    <p className={css.txtError}>
      Oops, something went wrong! Try to reload the page...
    </p>
  );
};

export const NfMessage = () => {
  return (
    <p className={css.txtError}>Nothing was found! Try another request...</p>
  );
};