"use client";


export default function ProfileCard({user}: any) {
    if (!user) return null;
    console.log(user)
  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition">
      
      {/* Avatar */}
      <img
        src={""}
        alt={user.email?.split("@")[0]}
        className="w-16 h-16 rounded-full object-cover border"
      />

      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {user.email?.split("@")[0]}
        </h2>
        <p className="text-gray-500 text-sm">
          {user.email}
        </p>
      </div>
      
    </div>
  );
}