import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import * as TailwindCSS from 'tailwindcss/plugin';

interface LiveCodePreviewProps {
    code: string;
}

const LiveCodePreview = ({ code }: LiveCodePreviewProps) => {
  const scope = {
    ...LucideIcons,
    ...TailwindCSS,
    React, // Make sure React is available in the scope
    // Add any other dependencies you want to make available
  };

  // Wrap the code with a render function for noInline mode
  const wrappedCode = `
    ${code}

    render(
      <React.StrictMode>
        <CodeComponent />
      </React.StrictMode>
    );
  `;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <LiveProvider code={wrappedCode} scope={scope} noInline>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Editor</h3>
              <LiveEditor className="rounded-md overflow-hidden" />
              <LiveError className="text-red-500 mt-2" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <div className="border rounded-md p-4">
                <LivePreview />
              </div>
            </div>
          </div>
        </LiveProvider>
      </CardContent>
    </Card>
  );
};

export default LiveCodePreview;