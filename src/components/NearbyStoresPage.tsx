import React, { useState } from 'react';
import type { Store } from '../types';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Info,
  CheckCircle2,
  Building,
} from 'lucide-react';

interface NearbyStoresPageProps {
  stores: Store[];
}

export const NearbyStoresPage: React.FC<NearbyStoresPageProps> = ({ stores }) => {
  const [selectedPincode, setSelectedPincode] = useState('560038');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleAction = (message: string) => {
    setActionNotice(message);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div id="nearby-stores-view" className="space-y-6 animate-fadeIn">
      {/* Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold">Demo Notice:</strong> This section displays sample retail store locations across India. Physical store inventory and live geolocation APIs are simulated for demonstration purposes.
        </div>
      </div>

      {/* Header and Pincode Checker */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>Retail Experience Centers</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Nearby ShopEase Stores
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pick up your orders same-day or try products in person across Bengaluru, Mumbai & Delhi.
          </p>
        </div>

        {/* Pincode Lookup Widget */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          <input
            id="pincode-check-input"
            type="text"
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}
            placeholder="Enter Indian PIN Code"
            className="w-28 text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
            maxLength={6}
          />
          <button
            onClick={() => handleAction(`Showing nearest stores for PIN code ${selectedPincode}`)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
          >
            Check PIN
          </button>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Store Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stores.map((store) => (
          <div
            key={store.id}
            id={store.id}
            className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <span>{store.name}</span>
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                    {store.area}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                  {store.distance}
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                {store.address}
              </p>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{store.openHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px]">{store.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span
                className={`text-[11px] font-semibold flex items-center gap-1 ${
                  store.pickupAvailable ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {store.pickupAvailable ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Store Pickup Available</span>
                  </>
                ) : (
                  <span>Walk-in Experience Only</span>
                )}
              </span>

              <button
                onClick={() =>
                  handleAction(`Simulated navigation: Opening directions to ${store.name}`)
                }
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
