import logo from "../assets/pumerai-logo.png";

function LogoMark({ className = "", label = "Pumerai Hotel", src = logo, large = false }) {
  return (
    <img
      className={`logo-mark ${large ? "logo-mark-large" : ""} ${className}`.trim()}
      src={src}
      alt={label}
    />
  );
}

export default LogoMark;
