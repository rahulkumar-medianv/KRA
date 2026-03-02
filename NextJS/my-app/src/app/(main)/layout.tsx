import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ChatWidget from "../../components/ChatWidget";

export default function mainLayout({children}: Readonly<{
  children: React.ReactNode;
}>){
    return (
      <>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
      <ChatWidget />
      </>
    )
}