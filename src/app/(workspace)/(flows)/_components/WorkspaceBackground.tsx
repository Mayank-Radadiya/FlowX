/**
 * WorkspaceBackground
 * -------------------
 * Renders decorative background elements for the workspace area.
 *
 * Responsibilities:
 *  - Add soft, blurred gradient shapes to enhance visual depth
 *  - Stay fixed behind all workspace content
 *  - Avoid interfering with user interactions
 *
 * This component is purely visual and contains no state
 * or interactive logic.
 */

const WorkspaceBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top-right ambient glow */}
      <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[120px]" />

      {/* Bottom-left ambient glow */}
      <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

      {/* Center-left accent glow */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />

      {/* Bottom-right accent glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[90px]" />
    </div>
  );
};

export default WorkspaceBackground;
