import Navbar from "./Navbar";
import Footer from "./Footer";

const DisplayWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="py-10">{children}</main>
      <Footer />
    </>
  );
};

export default DisplayWrapper;
