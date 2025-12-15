/**
 * PageHeaderAction Component
 * -------------------------
 * Renders an optional action area inside the PageHeader layout.
 *
 * Responsibilities:
 *  - Conditionally render page-level actions (buttons, links, controls)
 *  - Reserve layout space only when an action is provided
 *  - Apply subtle interaction feedback for better user experience
 *
 * This component keeps PageHeader clean by isolating
 * right-aligned action rendering logic.
 */

export function PageHeaderAction({ children }: { children?: React.ReactNode }) {
  /**
   * Guard clause
   * ------------
   * If no action content is provided, render nothing.
   * This avoids empty containers and unnecessary DOM nodes.
   */
  if (!children) return null;

  return (
    <div
      className="
        shrink-0                 /* Prevents the action area from shrinking */
        lg:self-center           /* Vertically centers action on large screens */
        hover:scale-105          /* Subtle hover emphasis */
        transition-transform     /* Smooth scaling animation */
      "
    >
      {children}
    </div>
  );
}
