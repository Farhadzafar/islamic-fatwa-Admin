"use client";

import { useState } from "react";

const initialState = {
  len: "",
  title: "",
  description: "",
  category: "",
  tags: [] as string[],
  status: "",
  mezhab: "",
  fatwaBy: "",
  views: 0,
  likes: 0,
  verified: false,
  reference: [] as string[],
  data: "",
};

export default function FatwaForm() {
  const [form, setForm] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleArrayChange = (name: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add New Fatwa</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="len"
          placeholder="Length"
          value={form.len}
          onChange={handleChange}
          className="input"
        />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="input"
        />
        <input
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="input"
        />
        <input
          name="mezhab"
          placeholder="Mezhab"
          value={form.mezhab}
          onChange={handleChange}
          className="input"
        />
        <input
          name="fatwaBy"
          placeholder="Fatwa By"
          value={form.fatwaBy}
          onChange={handleChange}
          className="input"
        />
        <input
          name="views"
          type="number"
          placeholder="Views"
          value={form.views}
          onChange={handleChange}
          className="input"
        />
        <input
          name="likes"
          type="number"
          placeholder="Likes"
          value={form.likes}
          onChange={handleChange}
          className="input"
        />
        <input
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
          className="input"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="input w-full h-24"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={(e) => handleArrayChange("tags", e.target.value)}
        className="input w-full"
      />

      <input
        name="reference"
        placeholder="References (comma separated)"
        onChange={(e) => handleArrayChange("reference", e.target.value)}
        className="input w-full"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="verified"
          checked={form.verified}
          onChange={handleChange}
          className="form-checkbox"
        />
        <span className="text-gray-700">Verified</span>
      </label>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
