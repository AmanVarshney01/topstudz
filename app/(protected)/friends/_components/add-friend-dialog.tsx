import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddFriendDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Friend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
        </DialogHeader>
        <p>Search by email</p>
        <form
          action={async (formData: FormData) => {
            "use server";
            console.log(formData.get("search"));
          }}
        >
          <Label htmlFor="search">Email</Label>
          <Input name="search" type="email" />
          <Button type="submit">Search</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
