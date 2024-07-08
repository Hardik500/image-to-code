import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BACKEND_URL = 'http://127.0.0.1:3000';

const ImageToCodeGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setGeneratedCode(''); // Reset generated code when new image is uploaded
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      const data = await response.json();
      setGeneratedCode(data.generatedCode);
    } catch (error) {
      console.error('Error generating code:', error);
      setGeneratedCode('Error: Failed to generate code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Image to Code Generator</CardTitle>
          <CardDescription>
            Transform your UI designs into ready-to-use React components. 
            Simply upload an image of your design, and we'll generate the corresponding code.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Your Design</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
              <div className="flex flex-col items-center justify-center p-5">
                {selectedImage ? (
                  <div className="w-full max-h-64 flex items-center justify-center overflow-hidden">
                    <img src={selectedImage} alt="Uploaded" className="max-w-full max-h-full object-scale-down" />
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
            <Button onClick={generateCode} disabled={isLoading} className="mt-4">
              {isLoading ? 'Generating...' : 'Generate Code'}
            </Button>
          )}
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
          <AlertTitle>Waiting for code generation</AlertTitle>
          <AlertDescription>
            Upload an image and click "Generate Code" to get started
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ImageToCodeGenerator;