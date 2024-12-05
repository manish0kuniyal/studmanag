import { Button } from "@/components/ui/button";
import { TableDemo } from "./StudentTable";
import StudentCard from "./StudentCard";

export default function Home() {
  return (
    <>
      <div>
        <div className="hidden md:block">
          <TableDemo />
        </div>
        <div className="block md:hidden">
          <StudentCard />
        </div>
      </div>
    </>
  );
}
