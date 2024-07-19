import Footer from "./Footer";
import NavBar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};
function LayOut(props: LayoutProps) {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
}

export default LayOut;
