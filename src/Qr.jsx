import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Qr() {
  const data = useLoaderData();

  return (
    <div className="h-screen p-2 md:p-8 bg-gray-100">
      {Array.isArray(data) && data.length > 0 ? (
        <div className=" p-4 rounded-lg space-y-4">
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
