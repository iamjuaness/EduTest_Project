import React from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useForm } from "react-hook-form";

export default function Login() {
  // States
  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Método para login
  const onSubmit = async (values) => {
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: values.email, 
          password: values.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }
  
      const userData = await response.json();
      // Guardar en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData));
      if (userData.roleId === 1) {
        navigate("/studentPage");
      } else if (userData.roleId === 2) {
        navigate("/teacherPage");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <Card className="max-w-full w-[340px] bg-[#6b9795] flex">
        <CardBody className="overflow-auto">
          <form
            className="flex flex-col gap-8 mt-6 h-[350px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register("email", { required: "Email is required" })}
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              autoComplete="username"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...register("password", { required: "Password is required" })}
              label="Password"
              isRequired
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
              autoComplete="current-password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            <div className="mt-10 justify-end">
              <Button
                fullWidth
                className="bg-[#a0ab94]"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
