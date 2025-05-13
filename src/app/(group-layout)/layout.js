import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function GroupLayout({ children }) {
    return (
        <div className="bg-base-100">
            <Navbar />
            <div className="">
                {children}
            </div>
            <Footer />
        </div>
    );
}
