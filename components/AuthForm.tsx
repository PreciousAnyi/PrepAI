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

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    const success = searchParams.get("success");
    if (type === "sign-in" && success === "signup") {
      setToastMessage("Sign up successful! Kindly log in.");
    }
  }, [searchParams, type]);

  const checkInputs = (): void => {
    if (type === "sign-up") {
      setIsButtonDisabled(!(name && email && password));
    } else if (type === "sign-in") {
      setIsButtonDisabled(!(email && password));
    }
  };

  const handleNameChange = (value: string): void => {
    setName(value);
    checkInputs();
  };

  const handleEmailChange = (value: string): void => {
    setEmail(value);
    checkInputs();
  };

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    checkInputs();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isButtonDisabled) {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const payload = {
        firstName,
        lastName,
        email,
        password,
        userType: "creator",
      };
      console.log(payload);

      try {
        if (type === "sign-up") {
          router.push("/sign-in?success=signup");
        } else {
          router.push("/");
        }
      } catch (error: any) {
        setError("Invalid email or something went wrong.");
      } finally {
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] w-full">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      {type === "sign-up" && (
        <>
          <h2 className="font-sora font-bold text-[40px] text-text-primary">
            PrepAI
          </h2>
          <h4 className="font-redhat font-normal text-2xl pb-[32px]">
            Prepare for interviews like a pro with PrepAI
          </h4>
        </>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form */}
      <div className="flex justify-center bg-[#1A1A1A] px-[50px] pb-[58px] pt-[56px] rounded-[28px] w-[614px] border">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-[18px]"
        >
          <h2 className="text-center font-sora font-bold text-[32px] text-text-primary">
            {type === "sign-up"
              ? "Create your account"
              : "Welcome back to PrepAI"}
          </h2>
          {type === "sign-up" ? (
            <TextInput
              value={name}
              icon={<User />}
              onChange={handleNameChange}
              placeholder="John Doe"
            />
          ) : (
            ""
          )}
          <EmailInput value={email} onChange={handleEmailChange} />
          <PasswordInput value={password} onChange={handlePasswordChange} />
          {type === "sign-up" && (
            <>
              <label
                htmlFor="profile-picture"
                className="text-body text-base font-medium font-redhat block"
              >
                Profile Picture
              </label>
              <Button
                text={
                  <div className="flex gap-3 font-redhat font-normal text-text-secondary text-[16px]">
                    <Upload />
                    <p>Upload your picture</p>
                  </div>
                }
                fill={false}
                disabled={isButtonDisabled}
              />
            </>
          )}
          <Button
            text={type === "sign-up" ? "Sign up" : "Log in"}
            fill={true}
            disabled={isButtonDisabled}
          />

          <div className="flex w-full justify-center mt-[27px] font-redhat text-[#B3B3B3] font-medium md:font-normal text-body">
            {type === "sign-up"
              ? "Already have an account?   "
              : "Don’t have an account?   "}
            <button
              onClick={() => {
                if (type === "sign-up") {
                  router.push("/sign-in");
                } else router.push('/sign-up')
              }}
              className="pl-2 text-[#B3B3B3] font-redhat font-bold cursor-pointer"
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
