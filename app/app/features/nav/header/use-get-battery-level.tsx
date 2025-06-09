import { useEffect, useState } from "react";

// Define types for the Battery API as it's not included in the standard TypeScript definitions
type BatteryAPI = EventTarget & {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(type: "levelchange", listener: EventListener): void;
  removeEventListener(type: "levelchange", listener: EventListener): void;
};

// Define types for the Navigator API with battery
type NavigatorWithBattery = Navigator & {
  getBattery(): Promise<BatteryAPI>;
};

/**
 * Custom hook to get the current battery level of the device and if it's charging
 */
export const useGetBatteryInfo = () => {
  const [batteryData, setBatteryData] = useState<
    | {
        level: number;
        isCharging: boolean;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (!("getBattery" in navigator) || !navigator.getBattery) return;

    let battery: BatteryAPI | null = null;

    const handleChange = () => {
      if (battery) setBatteryData({ level: Math.round(battery.level * 100), isCharging: battery.charging });
    };

    (navigator as NavigatorWithBattery).getBattery().then((_battery) => {
      battery = _battery;
      handleChange();

      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingchange", handleChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleChange);
        battery.removeEventListener("chargingchange", handleChange);
      }
    };
  }, []);

  return batteryData;
};
