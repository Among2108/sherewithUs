import { Link, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTrip from "@/components/AddTrip";

export default function Home() {
  const navigate = useNavigate();

  // ✅ mock tripId ชั่วคราว (เดี๋ยวค่อยผูก localStorage ทีหลัง)
  const mockTripId = "demo-1";

  return (
    <div className="max-h-screen bg-neutral-800 text-white">
      <div className="mx-auto px-4 py-10 space-y-4">
        <h1 className="text-3xl font-bold">sherewithus</h1>
        <p className="text-white/60">Create a trip or open an existing one.</p>

        <div>
          <AddTrip />
        </div>

        {/* ✅ ไปหน้า TripDashboard ตาม route จริง */}
        <Link to={`/trip/${mockTripId}/dashboard`}>
          <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
              src="https://avatar.vercel.sh/shadcn1"
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />

            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>Design systems meetup</CardTitle>
              <CardDescription>
                A practical talk on component APIs, accessibility, and shipping faster.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate(`/trip/${mockTripId}/dashboard`)}
          >
            Open Demo Trip (Navigate)
          </Button>
            </CardFooter>
          </Card>
        </Link>

      </div>
    </div>
  );
}
