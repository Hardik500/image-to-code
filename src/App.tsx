import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ImageToCodeGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // Simulate code generation
        setTimeout(() => {
          setGeneratedCode(`
// Generated React component
import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Generated Component</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Click me
      </button>
    </div>
  );
};

export default GeneratedComponent;
          `);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Image to Code Generator</CardTitle>
          <CardDescription>
            Transform your UI designs into ready-to-use React components. Simply
            upload an image of your design, and we'll generate the corresponding
            code.
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
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="max-h-48 mb-4 rounded-lg"
                  />
                ) : (
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                )}
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
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
        </CardContent>
      </Card>

      {generatedCode ? (
        <Card>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertTitle>Waiting for image</AlertTitle>
          <AlertDescription>Upload an image to generate code</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ImageToCodeGenerator;
