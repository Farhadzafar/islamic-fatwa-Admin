import React from "react";

export function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
