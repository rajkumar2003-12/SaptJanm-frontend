
import { Navbar } from "../components/Navbar";
import { Matches } from "../components/GetMatch";
import { GetUsers } from "../components/GetUsers";
import { Quote } from "../components/Quote";
import { UserProfile } from "../components/UserProfile";

export function Dashboard() {
  return (
      <div className="flex flex-col min-h-screen pt-16">
      <Navbar/>

      <div>
        <Quote/>
      </div>
      <div className="pt-6">
      <UserProfile/>
      </div>
      <div className=" mt-6">
        <Matches />
      </div>
      <div>
        <GetUsers/>
      </div>
    </div>
  );
}
