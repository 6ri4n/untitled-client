import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-3">
      404 Not Found
      <Link className="bg-blue-400 rounded-lg px-3 py-1 " to="/">
        Home
      </Link>
    </div>
  );
}
