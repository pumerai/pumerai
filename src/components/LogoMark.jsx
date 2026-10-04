import logo from "../assets/pumerai-logo.png";

function LogoMark({ className = "", label = "Pumerai Hotel", src = logo, large = false, width, height }) {
  const defaultSize = large ? 180 : 96;
  return (
    <img
      className={`logo-mark ${large ? "logo-mark-large" : ""} ${className}`.trim()}
      src={src}
      alt={label}
      width={width || defaultSize}
      height={height || defaultSize}
    />
  );
}

export default LogoMark;
