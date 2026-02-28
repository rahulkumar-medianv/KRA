import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import type { Profile } from "../types/AuthType";

type Props = {
  user: Profile;
};

export default function ProfileCard({ user }: Props) {
  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
      <CardContent className="flex flex-col items-center gap-4 p-6">

        {/* Avatar */}
        <Avatar sx={{ width: 80, height: 80 }}>
          {user.name.charAt(0)}
        </Avatar>

        {/* Name */}
        <Typography variant="h5" fontWeight="bold">
          {user.name}
        </Typography>

        {/* Email */}
        <Typography color="secondary">
          {user.email}
        </Typography>

        {/* Button */}
        <Button variant="contained" color="secondary">
          Edit Profile
        </Button>

      </CardContent>
    </Card>
  );
}