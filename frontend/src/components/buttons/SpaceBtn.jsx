import SpaceBtnSvg from "./SpaceBtnSvg"; //It is the shape, is a custom SVG component that renders the SpaceBtn.jsx's SVG graphics.

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
 * - type = "button": is to avoid the default behavior of submitting a form when the button is clicked.
 * - Check the example in `frontend/src/components/reg-auth/LoginForm.jsx` for usage.
 */
//NOTE: It is very important to add the `type` prop to the button element to avoid the default behavior of submitting a form when the button is clicked.
//NOTE: After adding it to props, use must pass it the renderButton function as type={type}.

const SpaceBtn = ({
  className,
  href,
  onClick,
  children,
  px = "px-7",
  white,
  type = "button",
}) => {
  // Construct the CSS classes for the button/link
  const classes = `button relative inline-flex items-center justify-center py-[.5rem] font-bold transition-colors duration-1000 cursor-pointer hover:text-red-600 ${px} ${
    white ? "text-neutral-800" : "text-neutral-100/5"
  } ${className || ""}`;

  // CSS classes for the span inside the button/link
  const spanClasses = "relative z-10";

  // Function to render a button element
  const renderButton = () => (
    <button className={classes} onClick={onClick} type={type}>
      <span className={spanClasses}>{children}</span>
      {SpaceBtnSvg(white)}
    </button>
  );

  // Function to render a link element
  const renderLink = () => (
    <a href={href} className={classes}>
      <span className={spanClasses}>{children}</span>
      {SpaceBtnSvg(white)}
    </a>
  );

  // Render a link if `href` is provided, otherwise render a button
  return href ? renderLink() : renderButton();
};

export default SpaceBtn;
