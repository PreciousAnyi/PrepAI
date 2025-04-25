"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import TextInput from "./TextInput";
import { Upload, User } from "react-feather";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import Button from "./Button";
import { useRouter } from "next/navigation";
import Toast from "./Toast";
import { useSearchParams } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  React.useEffect(() => {
    const success = searchParams.get("success");
    if (type === "sign-in" && success === "signup") {
      setToastMessage("Sign up successful! Kindly log in.");
    }
  }, [searchParams, type]);

  React.useEffect(() => {
    if (type === "sign-up") {
      setIsButtonDisabled(!(name && email && password && profilePicture));
    } else if (type === "sign-in") {
      setIsButtonDisabled(!(email && password));
    }
  }, [name, email, password, profilePicture, type]);

  const handleNameChange = (value: string): void => setName(value);
  const handleEmailChange = (value: string): void => setEmail(value);
  const handlePasswordChange = (value: string): void => setPassword(value);
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isButtonDisabled) {
      try {
        if (type === "sign-up") {
          let profileImageUrl = "";

          if (profilePicture) {
            const formData = new FormData();
            formData.append("file", profilePicture);
            formData.append(
              "upload_preset",
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );

            const res = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );

            if (!res.ok) {
              const errorData = await res.json();
              console.error("Cloudinary upload error:", errorData);
              setError("Failed to upload image. Please try again.");
              return;
            }

            const data = await res.json();
            profileImageUrl = data.secure_url;
          }

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const result = await signUp({
            uid: userCredential.user.uid,
            name: name!,
            email,
            password,
            profileImageUrl,
          });

          if (!result.success) {
            await userCredential.user.delete();
            setError(result.message);
            return;
          }

          router.push("/sign-in?success=signup");
        } else {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          const idToken = await userCredential.user.getIdToken();
          if (!idToken) {
            setError("Sign in Failed. Please try again.");
            return;
          }

          await signIn({ email, idToken });
          router.push("/");
        }
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setError("This email is already in use. Please log in.");
        } else if (error.code === "auth/invalid-credential") {
          setError("Invalid Credentials");
        } else {
          setError(error.message || "Something went wrong.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 md:px-8 w-full">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      {type === "sign-up" && (
        <>
          <h2 className="font-sora font-bold text-3xl sm:text-4xl md:text-[40px] text-text-primary text-center">
            PrepAI
          </h2>
          <h4 className="font-redhat font-normal text-lg sm:text-xl md:text-2xl pb-6 text-center">
            Prepare for interviews like a pro with PrepAI
          </h4>
        </>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="w-full max-w-[614px] bg-[#1A1A1A] px-6 sm:px-10 py-10 rounded-[28px] border">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-[18px]"
        >
          <h2 className="text-center font-sora font-bold text-2xl sm:text-3xl md:text-[32px] text-text-primary">
            {type === "sign-up"
              ? "Create your account"
              : "Welcome back to PrepAI"}
          </h2>

          {type === "sign-up" && (
            <TextInput
              value={name}
              icon={<User />}
              onChange={handleNameChange}
              placeholder="John Doe"
            />
          )}

          <EmailInput value={email} onChange={handleEmailChange} />
          <PasswordInput value={password} onChange={handlePasswordChange} />

          {type === "sign-up" && (
            <div className="space-y-2">
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="profile-picture"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
              <div
                onClick={() =>
                  document.getElementById("profile-picture")?.click()
                }
                className="w-full"
              >
                <Button
                  type="button"
                  text={
                    profilePicture ? (
                      <div className="flex gap-3 items-center font-redhat font-normal text-text-secondary text-sm sm:text-base">
                        ✅<p>{profilePicture.name}</p>
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center font-redhat font-normal text-text-secondary text-sm sm:text-base">
                        <Upload />
                        <p>Upload your picture</p>
                      </div>
                    )
                  }
                  fill={false}
                />
              </div>
            </div>
          )}

          <Button
            text={type === "sign-up" ? "Sign up" : "Log in"}
            fill={true}
            disabled={isButtonDisabled}
          />

          <div className="flex w-full justify-center mt-6 font-redhat text-[#B3B3B3] font-medium text-sm sm:text-base text-center">
            {type === "sign-up"
              ? "Already have an account?"
              : "Don’t have an account?"}
            <button
              onClick={() =>
                type === "sign-up"
                  ? router.push("/sign-in")
                  : router.push("/sign-up")
              }
              type="button"
              className="pl-2 text-[#B3B3B3] font-redhat font-bold"
            >
              {type === "sign-up" ? "Log In" : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
