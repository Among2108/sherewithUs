import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

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
import { tripAPI } from "../service/trip.api";
import { useAsync } from "../hooks/useAsync";

export default function Home() {
  const navigate = useNavigate();

  const { run, loading, error } = useAsync(tripAPI.getAll);
  const [trips, setTrips] = useState([]);
  const [deletingId, setDeletingId] = useState("");

  const fetchTrips = () => run().then((res) => setTrips(res.data));

  useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  const handleDelete = async (e, tripId) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ กันไม่ให้ Card onClick ทำงาน

    const ok = confirm("Delete this trip? (This will remove all its expenses)");
    if (!ok) return;

    try {
      setDeletingId(tripId);
      await tripAPI.delete(tripId);

      // ✅ อัปเดต UI ทันที
      setTrips((prev) => prev.filter((t) => t._id !== tripId));

      // หรือถ้าอยากชัวร์สุด (ดึงใหม่จาก server) ใช้:
      // await fetchTrips();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete trip");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-800 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold">sherewithus</h1>
        <p className="text-white/60">Create a trip or open an existing one.</p>

        {/* Add Trip */}
        <AddTrip onAdded={fetchTrips} />

        {/* Loading / Error */}
        {loading && <p className="text-white/60">Loading trips...</p>}
        {error && <p className="text-rose-400">{error}</p>}

        {/* Trip List */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <Card
              key={trip._id}
              className="relative cursor-pointer overflow-hidden"
              onClick={() => navigate(`/trip/${trip._id}/dashboard`)}
            >
              <img
                src={trip.coverImage || `https://avatar.vercel.sh/${trip._id}`}
                alt="Trip cover"
                className="aspect-video w-full object-cover brightness-60"
              />

              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">
                    {trip.members?.length || 0} members
                  </Badge>
                </CardAction>

                <CardTitle>{trip.title}</CardTitle>
                <CardDescription>Invite code: {trip.inviteCode}</CardDescription>
              </CardHeader>

              <CardFooter>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={(e) => handleDelete(e, trip._id)}
                  disabled={deletingId === trip._id}
                >
                  <MdDeleteForever className="text-rose-500" />
                  <span className="ml-2">
                    {deletingId === trip._id ? "Deleting..." : "Delete"}
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
