import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { tripAPI } from "../../service/trip.api";

export function AddMemberCard({
  className,
  tripId,
  onAdded,
  ...props
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !tripId) return;

    try {
      setLoading(true);
      setError("");
      await tripAPI.addMember(tripId, { name: trimmed });
      setName("");
      onAdded?.(); // 👈 ให้ TripManage fetch ใหม่
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to add member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Add member</CardTitle>
          <CardDescription>
            Add a participant name for this trip (guest-first).
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="memberName">Member name</FieldLabel>
                <Input
                  id="memberName"
                  type="text"
                  placeholder="e.g., Alice"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
                <FieldDescription>
                  Tip: Use short names for easy settlement.
                </FieldDescription>
              </Field>

              {error && (
                <p className="text-sm text-rose-500">{error}</p>
              )}

              <Field>
                <div className="w-1/2 flex justify-center">
                  <Button
                    type="submit"
                    className="bg-rose-600 hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "+ Add Member"}
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
