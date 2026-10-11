import { useState } from 'react';
import { Settings, Bell, MapPin, Check, RotateCcw } from 'lucide-react';

interface SettingsPageProps {
  onResetDemo: () => void;
}

interface PreferencesState {
  expressDelivery: boolean;
  whatsappAlerts: boolean;
  emailReceipts: boolean;
  smsAlerts: boolean;
  currencySymbol: string;
  preferredCity: string;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onResetDemo }) => {
  const [preferences, setPreferences] = useState<PreferencesState>({
    expressDelivery: true,
    whatsappAlerts: true,
    emailReceipts: true,
    smsAlerts: false,
    currencySymbol: '₹ (INR)',
    preferredCity: 'Bengaluru, Karnataka',
  });
  const [savedNotice, setSavedNotice] = useState(false);

  type ToggleKey = 'expressDelivery' | 'whatsappAlerts' | 'emailReceipts' | 'smsAlerts';

  const handleToggle = (key: ToggleKey) => {
    setPreferences((prev: PreferencesState) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div id="settings-view" className="space-y-6 animate-fadeIn max-w-3xl">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600" />
            <span>App & Shopping Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your regional preferences, notification channels, and demo configuration.
          </p>
        </div>

        {savedNotice && (
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Preferences Saved</span>
          </span>
        )}
      </div>

      {/* Preferences Cards */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>Regional & Delivery Setup</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Default Currency</span>
                <span className="text-[11px] text-slate-500">Indian Rupee format standard</span>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                {preferences.currencySymbol}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Default Shipping City</span>
                <span className="text-[11px] text-slate-500">Preselected delivery hub</span>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {preferences.preferredCity}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Express 1-Day Delivery</span>
                <span className="text-[11px] text-slate-500">Prefer express dispatch when eligible</span>
              </div>
              <button
                onClick={() => handleToggle('expressDelivery')}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  preferences.expressDelivery ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    preferences.expressDelivery ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Setup */}
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <span>Notification Channels</span>
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">WhatsApp Order Updates</span>
                <span className="text-[11px] text-slate-500">Instant dispatch and OTP notifications</span>
              </div>
              <button
                onClick={() => handleToggle('whatsappAlerts')}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  preferences.whatsappAlerts ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    preferences.whatsappAlerts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Email Invoices & Offers</span>
                <span className="text-[11px] text-slate-500">Receive tax invoice copies by email</span>
              </div>
              <button
                onClick={() => handleToggle('emailReceipts')}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  preferences.emailReceipts ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    preferences.emailReceipts ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Demo Data Management */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 block">Reset Application Demo State</span>
            <span className="text-[11px] text-slate-500">
              Restores initial products, cart items, forms, and test switches.
            </span>
          </div>
          <button
            id="settings-reset-demo-btn"
            onClick={onResetDemo}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
