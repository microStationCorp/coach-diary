export const ErrorText = ({ text }: { text: string }) => {
  return (
    <span className="text-red-600 font-semibold text-xs ml-2 capitalize font-mono">
      {text}
    </span>
  );
};
