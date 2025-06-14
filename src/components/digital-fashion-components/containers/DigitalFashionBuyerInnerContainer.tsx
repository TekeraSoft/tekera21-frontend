function DigitalFashionBuyerInnerContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 px-3 md:px-8 py-3 w-full min-h-screen ">
      {children}
    </div>
  );
}

export default DigitalFashionBuyerInnerContainer;
