import React from "react";

interface NotificationBannerProps {
  show: boolean;
  onEnable: () => Promise<void>;
  isLoading?: boolean;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  show,
  onEnable,
  isLoading = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            🔊
          </div>
          <span className="font-medium">
            Bildirim seslerini ve browser bildirimlerini aktif etmek için
            tıklayın.
          </span>
        </div>
        <button
          onClick={onEnable}
          disabled={isLoading}
          className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Aktif Ediliyor..." : "Aktif Et"}
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
