import React, { useState, useEffect } from "react";
import { Upload, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as LucideIcons from 'lucide-react';
import LiveCodePreview from './LiveCodePreview';
import LiveCodeEditor from './LiveCodeEditor';

const BACKEND_URL = "http://127.0.0.1:3000";

const ImageToCodeGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null | undefined>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  useEffect(() => {
    if (generatedCode) {
      setTimeout(() => setShowPreview(true), 100);
    } else {
      setShowPreview(false);
    }
  }, [generatedCode]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setSelectedImage(e?.target?.result);
        setGeneratedCode(""); // Reset generated code when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCode = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      // In a real application, replace this URL with your actual API endpoint
      const response = await fetch(`${BACKEND_URL}/generate-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const data = await response.json();
      const code = data.code.replace("```javascript", "").replace("```", "");
      setGeneratedCode(code);
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode("Error: Failed to generate code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const scope = {
    ...LucideIcons,
    React,
    // Add any other dependencies you want to make available
  };

  const wrappedCode = `
    ${generatedCode}

    render(
      <React.StrictMode>
        <CodeComponent />
      </React.StrictMode>
    );
  `;

  return (
    <div className={`h-screen overflow-hidden ${generatedCode ? 'flex' : 'flex justify-center'}`}>
      <div className={`transition-all duration-500 ease-in-out ${showPreview ? 'w-1/2' : 'w-full'} 
                       ${!generatedCode ? 'max-w-5xl' : ''} overflow-y-auto p-4`}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Image to Code Generator</CardTitle>
            <CardDescription>
              Transform your UI designs into ready-to-use React components.
              Simply upload an image of your design, and we'll generate the
              corresponding code.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Your Design</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center p-5">
                  {selectedImage ? (
                    <div className="w-full max-h-64 flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedImage as string}
                        alt="Uploaded"
                        className="max-w-full max-h-full object-scale-down"
                      />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {selectedImage && (
              <Button
                onClick={generateCode}
                disabled={isLoading}
                className="mt-4"
              >
                {isLoading ? "Generating..." : "Generate Code"}
              </Button>
            )}
          </CardContent>
        </Card>

        {generatedCode ? (
          <LiveCodeEditor code={wrappedCode} scope={scope} />
        ) : (
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>Waiting for code generation</AlertTitle>
            <AlertDescription>
              Upload an image and click "Generate Code" to get started
            </AlertDescription>
          </Alert>
        )}
      </div>

      {showPreview && (
        <div className="w-1/2 overflow-hidden transition-all duration-500 ease-in-out p-4">
          <LiveCodePreview code={wrappedCode} scope={scope} />
        </div>
      )}
    </div>
  );
};

export default ImageToCodeGenerator;