import React, { useRef } from "react";
import QRious from "qrious";
import "./index.css";

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
          console.log("Stored in MongoDB with _id:", data.id);

          // Generate QR code pointing to the stored entry on the server
          const qrUrl = `https://qr-codesio.vercel.app/qr?id=${data.id}`;
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <textarea
          ref={textareaRef}
          rows={5}
          placeholder="Enter text or URL"
          required
          style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "5px" }}
        />
        <button type="submit">Generate QR Code</button>
      </form>
      <canvas ref={canvasRef} className="qrcode" />
    </div>
  );
};

export default App;
