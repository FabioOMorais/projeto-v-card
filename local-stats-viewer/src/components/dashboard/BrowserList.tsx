import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface BrowserListProps {
  browsers: {
    chrome: number;
    safari: number;
    firefox: number;
  };
}

export const BrowserList = ({ browsers }: BrowserListProps) => {
  const browserData = [
    { name: "Chrome", count: browsers.chrome },
    { name: "Safari", count: browsers.safari },
    { name: "Firefox", count: browsers.firefox },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Acessos por Navegador</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {browserData.map((browser) => (
            <div key={browser.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{browser.name}</span>
              </div>
              <span className="text-sm font-bold">{browser.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
