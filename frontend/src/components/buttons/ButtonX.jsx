import ButtonSvg from "./ButtonSvg";

/**
 * Button Component
 *
 * This component renders either a button or a link based on the presence of the `href` prop.
 * It accepts various props to customize its appearance and behavior.
 *
 * Props:
 * - className: Additional CSS classes to apply to the button/link.
 * - href: If provided, the component renders a link instead of a button.
 * - onClick: Click event handler for the button.
 * - children: Content to be displayed inside the button/link.
 * - px: Padding-x class to apply to the button/link (default is "px-7").
 * - white: Boolean to determine the text color (true for "text-n-8", false for "text-n-1").
 */

const ButtonX = ({
  className,
  href,
  onClick,
  children,
  px = "px-7",
  white,
}) => {
  // Construct the CSS classes for the button/link
  const classes = `button relative inline-flex items-center justify-center transition-colors hover:text-green-100 ${px} ${
    white ? "text-neutral-800" : "text-green-400"
  } ${className || ""}`;

  // CSS classes for the span inside the button/link
  const spanClasses = "relative z-10";

  // Function to render a button element
  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  // Function to render a link element
  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </a>
  );

  // Render a link if `href` is provided, otherwise render a button
  return href ? renderLink() : renderButton();
};

export default ButtonX;
