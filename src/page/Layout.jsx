import { Outlet} from "react-router";
import Navbar from "../components/Navbar";

export default function TripLayout() {
  return (
    <div >
      <header>
        <Navbar/>
      </header>
      <main >
        <Outlet />
      </main>
    </div>
  );
}
