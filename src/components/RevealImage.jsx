/**
 * RevealImage — Reusable component for drop-down scroll revealed content images.
 * Applies .reveal-drop and optional stagger delay class.
 */
export default function RevealImage({
  src,
  alt = "",
  className = "",
  delayIndex = 0,
  loading = "lazy",
  decoding = "async",
  width,
  height,
  style,
  ...props
}) {
  const delayClass = `reveal-delay-${Math.abs(delayIndex) % 4}`;
  const combinedClass = `reveal-drop ${delayClass} ${className}`.trim();

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      width={width}
      height={height}
      style={style}
      className={combinedClass}
      {...props}
    />
  );
}
