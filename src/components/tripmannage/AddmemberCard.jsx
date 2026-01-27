import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AddMemberCard({ className, onAdd, ...props }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    onAdd?.(trimmed);
    setName("");
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
                  required
                />
                <FieldDescription>
                  Tip: Use short names for easy settlement.
                </FieldDescription>
              </Field>

              <Field>
                <div className="w-1/2 flex justify-center"><Button type="submit" className="bg-amber-200 ">
                  + Add Member
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
