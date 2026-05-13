import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { useAllUsers, useSendEmail } from "~/hooks/useApi";
import { sendEmailSchema } from "~/utils/schemas";
import { z } from "zod";
import { Search, CheckCircle2 } from "lucide-react";

type SendEmailPayload = z.infer<typeof sendEmailSchema>;

export default function DashboardEmails() {
  const { data: users, isLoading: isLoadingUsers } = useAllUsers();
  const { mutate: sendEmail, isPending: isSending } = useSendEmail();
  
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SendEmailPayload>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      subject: "",
      body: "",
      recipientIds: [],
    },
  });

  const selectedRecipientIds = watch("recipientIds");

  const filteredUsers = users?.filter((user: any) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleUserSelection = (userId: number) => {
    const currentSelected = [...selectedRecipientIds];
    if (currentSelected.includes(userId)) {
      setValue("recipientIds", currentSelected.filter((id: number) => id !== userId), { shouldValidate: true });
    } else {
      setValue("recipientIds", [...currentSelected, userId], { shouldValidate: true });
    }
  };

  const handleSelectAllFiltered = () => {
    if (!filteredUsers) return;
    const filteredIds = filteredUsers.map((u: any) => u.id);
    const newSelection = Array.from(new Set([...selectedRecipientIds, ...filteredIds]));
    setValue("recipientIds", newSelection, { shouldValidate: true });
  };

  const handleClearSelection = () => {
    setValue("recipientIds", [], { shouldValidate: true });
  };

  const onSubmit = (data: SendEmailPayload) => {
    sendEmail(data, {
      onSuccess: () => {
        reset();
        setSearchTerm("");
      }
    });
  };

  return (
    <ProtectedRoute allowedRoles={[1]}>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Broadcast Emails</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Subject</label>
            <input
              type="text"
              {...register("subject")}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Important: Next General Meeting"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Body</label>
            <textarea
              {...register("body")}
              rows={6}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                errors.body ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Write the email content here..."
            />
            {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Select Recipients <span className="text-blue-600">({selectedRecipientIds.length} selected)</span>
              </label>
              
              <div className="space-x-2 text-sm">
                <button type="button" onClick={handleSelectAllFiltered} className="text-blue-600 hover:underline">
                  Select Visible
                </button>
                <span className="text-gray-300">|</span>
                <button type="button" onClick={handleClearSelection} className="text-red-600 hover:underline">
                  Clear All
                </button>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search members by name or email..."
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {isLoadingUsers ? (
              <div className="animate-pulse space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-lg w-full"></div>
                ))}
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {filteredUsers?.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No users found matching your search.</p>
                ) : (
                  filteredUsers?.map((user: any) => {
                    const isSelected = selectedRecipientIds.includes(user.id);
                    return (
                      <div
                        key={user.id}
                        onClick={() => toggleUserSelection(user.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div>
                          <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="text-blue-600 w-5 h-5" />}
                      </div>
                    );
                  })
                )}
              </div>
            )}
            
            {errors.recipientIds && (
              <p className="text-red-500 text-sm mt-3">{errors.recipientIds.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSending}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer ${
                isSending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {isSending ? "Sending Emails..." : "Send Broadcast"}
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}