import React, { type FC, useState } from "react";
import { X, Bell } from "lucide-react";

interface Notification {
  id: number;
  type: "approval" | "member_added" | "role_changed" | "csv_import" | "custom";
  title: string;
  description: string;
  timeAgo: string;
  icon?: string;
  read?: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
  isLoading?: boolean;
}

export const NotificationModal: FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications = [],
  isLoading = false,
}) => {
  // TODO: REPLACE hardcoded notifications with API call
  // Add this to your hook: const { data: notifications, isLoading } = useNotificationsAPI();
  // API Endpoint: GET /api/notifications
  // Expected Response: Array of Notification objects
  const [notificationsList] = useState<Notification[]>(
    notifications.length > 0
      ? notifications
      : [
          {
            id: 1,
            type: "approval",
            title: "New Pending Approval",
            description: "Karim Nasser requested to join diabetes committee",
            timeAgo: "2h ago",
            read: false,
          },
          {
            id: 2,
            type: "member_added",
            title: "Member Added",
            description:
              "Sara Mahmoud was successfully added to Computer & Information",
            timeAgo: "5m ago",
            read: false,
          },
          {
            id: 3,
            type: "role_changed",
            title: "Role Changed",
            description: "Omar Farish's role was updated to Admin",
            timeAgo: "1h ago",
            read: true,
          },
          {
            id: 4,
            type: "csv_import",
            title: "CSV Import Complete",
            description: "Your CSV has been imported successfully",
            timeAgo: "3h ago",
            read: true,
          },
        ],
  );

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  // TODO: ADD API call here to mark all as read
  // await markAllNotificationsAsReadAPI();
  const handleMarkAllRead = async () => {
    try {
      // TODO: Replace console.log with API call:
      // const response = await markAllNotificationsAsReadAPI();
      console.log("Marking all notifications as read");
      // TODO: Then invalidate/refresh notifications: queryClient.invalidateQueries({ queryKey: ['notifications'] });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // TODO: ADD API call here to view all notifications
  // Navigate to notifications page: useNavigate('/dashboard/notifications')
  const handleViewAllNotifications = () => {
    console.log("View all notifications");
    // TODO: Navigate to full notifications page
    // const navigate = useNavigate();
    // navigate('/dashboard/notifications');
  };

  const getNotificationIcon = (type: string) => {
    const iconClasses = "w-5 h-5";
    switch (type) {
      case "approval":
        return <Bell className={`${iconClasses} text-yellow-500`} />;
      case "member_added":
        return <Bell className={`${iconClasses} text-green-500`} />;
      case "role_changed":
        return <Bell className={`${iconClasses} text-purple-500`} />;
      case "csv_import":
        return <Bell className={`${iconClasses} text-blue-500`} />;
      default:
        return <Bell className={`${iconClasses} text-gray-500`} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Backdrop - lighter opacity, same as ApproveModal */}
        <div
          className="fixed inset-0 bg-gray-200/40"
          onClick={onClose}
          style={{ zIndex: 40 }}
        ></div>

        {/* Modal - solid white, same rounded-2xl shadow-xl treatment as ApproveModal */}
        <div className="relative z-50 inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-[#000640]">
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mark all read link */}
          {unreadCount > 0 && (
            <div className="px-6 py-2 border-b border-gray-100 bg-white">
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-[#5A10A5] hover:text-[#4460EF] font-medium transition-colors"
              >
                Mark all read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)] bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2 text-gray-600">
                  <div className="w-4 h-4 border-2 border-[#5A10A5] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Loading notifications...</span>
                </div>
              </div>
            ) : notificationsList.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notificationsList.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-[#F5F0FF]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 pt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {notification.timeAgo}
                        </p>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div className="flex-shrink-0 w-2 h-2 bg-[#5A10A5] rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <Bell className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            )}
          </div>

          {/* Footer - View all link */}
          {notificationsList.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-100 text-center bg-white">
              <button
                onClick={handleViewAllNotifications}
                className="text-sm text-[#5A10A5] hover:text-[#4460EF] font-medium transition-colors"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};