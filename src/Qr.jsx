import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Qr() {
  const data = useLoaderData();

  return (
    <div className="p-8">
      {Array.isArray(data) && data.length > 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              {item.text.split("\n").map((line, i) => (
                <p key={i} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No data found for this QR code.</p>
      )}
    </div>
  );
}
