import { useAuth } from "../hooks/useAuth";

export function InactiveBanner() {
  const { user } = useAuth();

  if (!user || user.isActive) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-yellow-900 px-4 py-3 text-center font-medium">
      <p>
        ⚠️ Your account is currently inactive. Please contact an administrator to activate your account.
      </p>
    </div>
  );
}
