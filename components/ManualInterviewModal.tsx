"use client";

import React, { useState, useEffect } from "react";
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
import { getCurrentUser } from "@/lib/actions/auth.action";

interface ManualInterviewModalProps {
  onClose: () => void;
  onSubmit: (data: {
    role: string;
    type: string;
    level: string;
    brandLogo: string | null;
    techStack: string;
    amount: string;
    userId: string | null;
  }) => void;
}

const ManualInterviewModal: React.FC<ManualInterviewModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [role, setRole] = useState("");
  const [techStack, setTechStack] = useState("");
  const [amount, setAmount] = useState(""); 
  const [type, setType] = useState("Technical");
  const [level, setLevel] = useState("Junior");
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserId(user?.id ?? null); 
    };
    fetchUser();
  }, []); 

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Upload brandLogo to Cloudinary if it exists
      let brandLogoUrl = null;
      if (brandLogo) {
        const formData = new FormData();
        formData.append("file", brandLogo);
        formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

        // Call Cloudinary API
        const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
          method: "POST",
          body: formData,
        });

        const cloudinaryData = await cloudinaryResponse.json();
        if (cloudinaryData.secure_url) {
          brandLogoUrl = cloudinaryData.secure_url;
        } else {
          throw new Error("Cloudinary upload failed");
        }
      }

      // Send the form data along with the Cloudinary URL to your API
      const response = await fetch('https://prep-ai-nine.vercel.app/api/vapi/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          role,
          level,
          techstack: techStack,
          amount,
          userid: userId,
          brandLogo: brandLogoUrl, // Send the Cloudinary URL
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log('Interview created successfully');
        onSubmit({
          role,
          type,
          level,
          brandLogo: brandLogoUrl, // Send the Cloudinary URL
          techStack,
          amount,
          userId,
        });
      } else {
        console.error('Failed to create interview', data.error);
      }
    } catch (error) {
      console.error('Error submitting interview:', error);
    } finally {
      setIsSubmitting(false);
    }
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
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4"
    >
      <div className="w-full max-w-xl p-6 sm:p-10 rounded-[28px] bg-[#1A1A1A] border border-[#303030] space-y-2 relative max-h-[90vh]">
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
          placeholder="e.g. Frontend Development"
          value={role}
          onChange={(value) => setRole(value)}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <TextInput
            label="Enter your tech stack"
            placeholder="e.g. React, Javascript"
            value={techStack}
            onChange={(value) => setTechStack(value)}
          />

          <TextInput
            label="How many questions?"
            type="number"
            placeholder="e.g. 5"
            value={amount}
            onChange={(value) => setAmount(value)} 
          />
        </div>

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
          <Button
            type="button"
            height="60px"
            fill={false}
            onClick={() => document.getElementById("brand-logo")?.click()}
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
        </div>

        <Button
          text={isSubmitting ? "Creating..." : "Create Interview"}
          height="60px"
          fill={true}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ManualInterviewModal;
