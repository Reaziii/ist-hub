import Header from "@/components/Header";
import PaginatedJobs from "@/components/PaginatedJobs";
import { getPaginatedJobs, toggleJobWhitelist } from "@/lib/jobs";

export default function Home() {

  return (
    <main className="h-[100vh] w-ful">
      <Header />
      <div className="pt-[60px]" />
      <div className="max-w-screen-xl mx-auto">
        <PaginatedJobs
          toggleWhiteList={toggleJobWhitelist}
          getPaginatedJobs={getPaginatedJobs} />
      </div>
    </main>
  );
}
