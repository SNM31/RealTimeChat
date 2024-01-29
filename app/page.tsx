import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function Home() {
 const state=false
  return (
      <>
      <div className="flex-col">
      <h1 className="text-3xl font-bold text-indigo-500"> Hello to Personal Project</h1>
      <Button className={cn("bg-indigo-500",state && "bg-red-500")} >Click Me !</Button>
      </div>
      </>

  );
}
