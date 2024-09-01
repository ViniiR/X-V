import Header from "@components/Header";
import Footer from "@components/Footer";
import Feed from "./Feed";
import "@styles/home.scss"

interface HomeProps {
    setTheme: CallableFunction;
}

export default function Home(props: HomeProps) {
    return (
        <main className="home">
            <Header></Header>
            <Feed></Feed>
            <Footer></Footer>
        </main>
    );
}
