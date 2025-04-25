"use client";

import React, { useState } from "react";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "react-feather";

interface ManualInterviewModalProps {
  onClose: () => void;
  onSubmit: (data: {
    role: string;
    type: string;
    level: string;
    brandLogo: File | null;
  }) => void;
}

const ManualInterviewModal: React.FC<ManualInterviewModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [brandLogo, setBrandLogo] = useState<File | null>(null);

  const handleSubmit = () => {
    onSubmit({ role, type, level, brandLogo });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandLogo(file);
    }
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

  return (
    <div onClick={handleBackdropClick} className="fixed inset-0 z-50 bg-black bg-opacity-50 md:bg-transparent flex justify-center items-center px-4">
      <div className="w-full max-w-xl p-6 sm:p-10 rounded-[28px] bg-[#1A1A1A] border border-[#303030] space-y-6 relative">
        <button
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="text-center space-y-2">
          <h3 className="font-sora text-2xl font-bold text-white">
            Create an Interview
          </h3>
          <p className="font-redhat text-[#D6E0FF] text-base">
            Manually create an interview to be taken later.
          </p>
        </div>

        <TextInput
          label="What role are you interested in?"
          placeholder="e.g. Quality Assurance"
          value={role}
          onChange={(value) => setRole(value)}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="type" className="block pb-2 text-white">
              Interview type
            </label>
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-full min-h-[60px]">
                <SelectValue placeholder="Technical" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="non-technical">Non-Technical</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <label htmlFor="level" className="block pb-2 text-white">
              Level
            </label>
            <Select onValueChange={(value) => setLevel(value)}>
              <SelectTrigger className="w-full min-h-[60px]">
                <SelectValue placeholder="Junior" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid-level">Mid-level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="brand-logo"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => document.getElementById("brand-logo")?.click()}
            className="w-full"
          >
            <Button
              type="button"
              height="60px"
              fill={false}
              text={
                brandLogo ? (
                  <div className="flex gap-3 items-center font-redhat text-text-secondary text-sm sm:text-base">
                    ✅ <p>{brandLogo.name}</p>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center font-redhat text-text-secondary text-sm sm:text-base">
                    <Upload />
                    <p>Upload brand logo</p>
                  </div>
                )
              }
            />
          </button>
        </div>

        <Button
          text="Create Interview"
          height="60px"
          fill={true}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ManualInterviewModal;
