import { useNavigate, useLocation } from "react-router-dom";
import ButtonSvg from "./ButtonSvg"; // Is the shape of the button
import PropTypes from "prop-types";

/**
 * Button Component
 *
 * This component renders either a button or a link based on the presence of the `href` prop.
 * It includes smooth scrolling functionality when the `href` points to the current route.
 *
 * Props:
 * - className: Additional CSS classes to apply to the button/link.
 * - href: If provided, the component handles navigation or smooth scrolling.
 * - onClick: Click event handler for the button.
 * - children: Content to be displayed inside the button/link.
 * - px: Padding-x class to apply to the button/link (default is "px-7").
 * - white: Boolean to determine the text color (true for "text-n-8", false for "text-n-1").
 */

const Button = ({ className, href, onClick, children, px = "px-7", white }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Construct the CSS classes for the button/link
  const classes = `button relative inline-flex items-center justify-center py-2 transition-colors hover:text-red-500 ${px} ${
    white ? "text-neutral-800" : "text-yellow-400/50"
  } ${className || ""}`;

  // CSS classes for the span inside the button/link
  const spanClasses = "relative z-10";

  const handleClick = (e) => {
    e.preventDefault();
    // adding PageHash to the href to check if it is a hash link Then scroll or navigate to the target route!
    if (href) {
      const isSamePageHash = href.startsWith("#") && location.pathname === "/";

      if (isSamePageHash) {
        // Scroll to section within the same page
        const targetId = href.slice(1); // Remove the "#" symbol
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } else if (location.pathname === href) {
        // Smooth scroll to the top if already on the target route
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Navigate to the target route
        navigate(href);
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button className={classes} onClick={handleClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  px: PropTypes.string,
  white: PropTypes.bool,
};

export default Button;
