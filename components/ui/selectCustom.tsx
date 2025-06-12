import React from "react";

export default function SelectCustom() {
  return (
    <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  );
}
