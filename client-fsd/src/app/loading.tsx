const Loading = () => (
  <div
    className="fixed left-0 top-0 z-[99999999999999] flex h-screen w-screen items-center
      justify-center bg-black/40"
  >
    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white" />
  </div>
);

export default Loading;
