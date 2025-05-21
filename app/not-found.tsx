import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="p-10 w-full ">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Frown className="h-10 w-10 text-primary/70" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" passHref>
          <Button className="text-white font-semibold px-6 py-2 rounded-lg">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
