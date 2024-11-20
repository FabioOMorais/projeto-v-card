export interface StatsData {
  total: number;
  today: number;
  lastAccess: string;
  averagePerDay: number;
  peakHourToday: string;
  byDevice: {
    android: number;
    ios: number;
    desktop: number;
  };
  byBrowser: {
    chrome: number;
    safari: number;
    firefox: number;
  };
  byDay: {
    [date: string]: number;
  };
}
