import React from 'react';
import type { NotificationItem } from '../types';
import { Bell, CheckCheck, Clock, Tag, ShoppingBag, ShieldAlert } from 'lucide-react';

interface NotificationsPageProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onToggleRead: (id: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  notifications,
  onMarkAllAsRead,
  onToggleRead,
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'deal':
        return <Tag className="w-4 h-4 text-amber-500" />;
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <Bell className="w-4 h-4 text-indigo-500" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div id="notifications-view" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-indigo-600" />
            <span>Store Notifications</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time delivery status, price alerts, and festive flash deal updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
            {unreadCount} Unread
          </span>
          {unreadCount > 0 && (
            <button
              id="mark-all-read-btn"
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            id={notif.id}
            onClick={() => onToggleRead(notif.id)}
            className={`rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
              notif.unread
                ? 'bg-blue-50/50 border-blue-200 shadow-2xs'
                : 'bg-white/80 border-slate-200/70 hover:bg-white'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                notif.unread ? 'bg-white shadow-xs' : 'bg-slate-100'
              }`}
            >
              {getIcon(notif.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3
                  className={`text-sm ${
                    notif.unread ? 'font-black text-slate-900' : 'font-bold text-slate-700'
                  }`}
                >
                  {notif.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{notif.timestamp}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
            </div>

            {notif.unread && (
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
