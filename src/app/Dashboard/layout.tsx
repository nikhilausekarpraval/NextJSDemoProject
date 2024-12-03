

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="w-full">
         {children} 
    </div>
        
  );
};

export default Layout;