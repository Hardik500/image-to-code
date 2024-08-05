import React from 'react';
import { LiveProvider, LiveEditor, LiveError } from 'react-live';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LiveEditorProps {
  code: string;
  scope?: object;
}

const LiveEditorComponent: React.FC<LiveEditorProps> = ({ code, scope }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Code</CardTitle>
      </CardHeader>
      <CardContent>
        <LiveProvider code={code} scope={scope} noInline>
          <LiveEditor className="rounded-md overflow-hidden" />
          <LiveError className="text-red-500 mt-2" />
        </LiveProvider>
      </CardContent>
    </Card>
  );
};

export default LiveEditorComponent;