import React from 'react';
import { LiveProvider, LivePreview } from "react-live";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LiveCodePreviewProps {
  code: string;
  scope?: object;
}

const LiveCodePreview: React.FC<LiveCodePreviewProps> = ({ code, scope }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] overflow-auto">
        <LiveProvider code={code} scope={scope} noInline>
          <LivePreview />
        </LiveProvider>
      </CardContent>
    </Card>
  );
};

export default LiveCodePreview;
