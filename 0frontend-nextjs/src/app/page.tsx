import { Button } from "antd";
import BookGrid from "./components/bookgrid/bookgrid";
import Header from "./components/homepage/homepage.header";
import { signIn } from "../../auth";



export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <BookGrid />
        </main>
      </div>
    </>
  );
}
