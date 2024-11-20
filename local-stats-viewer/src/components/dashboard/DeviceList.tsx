import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet } from "lucide-react";

interface DeviceListProps {
  devices: {
    android: number;
    ios: number;
    desktop: number;
  };
}

export const DeviceList = ({ devices }: DeviceListProps) => {
  const deviceData = [
    { name: "Android", count: devices.android, icon: Smartphone },
    { name: "iOS", count: devices.ios, icon: Tablet },
    { name: "Desktop", count: devices.desktop, icon: Monitor },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Acessos por Dispositivo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deviceData.map((device) => (
            <div key={device.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <device.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{device.name}</span>
              </div>
              <span className="text-sm font-bold">{device.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
