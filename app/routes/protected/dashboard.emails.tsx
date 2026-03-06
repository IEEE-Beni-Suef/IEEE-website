import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function SendEmailPage() {
    return (
        <ProtectedRoute allowedRoles={[1]}>
            
        </ProtectedRoute>
    )
}