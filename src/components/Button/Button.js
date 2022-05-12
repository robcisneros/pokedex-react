const Button = (props) => {
  return (
    <button
      type={'button'} key={props.lakey}
    > {props.contenido}
      {props.children}
    </button>
  );
};

export default Button;
