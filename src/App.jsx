import React, { useRef } from "react";
import QRious from "qrious";

const App = () => {
  const textareaRef = useRef(null);
  const canvasRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = textareaRef.current.value.trim();
    if (!text) return;

    await fetch("https://qr-code-indol-delta.vercel.app/qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          const qrUrl = `https://qr-codesio.vercel.app/qr/${data.id}`;
          new QRious({
            element: canvasRef.current,
            value: qrUrl,
            size: 250,
          });
        } else {
          console.log("Error storing in DB", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">QR Code Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            ref={textareaRef}
            rows={5}
            placeholder="Enter text or URL"
            required
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Generate QR Code
          </button>
        </form>
        <div className="flex flex-col items-center">
          <canvas ref={canvasRef} className="mt-4" />
          <button
            onClick={downloadQRCode}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Download as PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
