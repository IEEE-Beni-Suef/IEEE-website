import type { MetaArgs } from "react-router";
import { useState } from "react";
import { Link } from "react-router";
import { Section } from "../components/ui/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FormInput } from "../components/form";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "utils/scemas";

export function meta({}: MetaArgs) {
  return [
    { title: "Sign In - IEEE BSU" },
    { name: "description", content: "Sign in to your IEEE BSU account" },
  ];
}

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    console.log("Login attempt:", data);
    // Handle login logic here
  };

  return (
    <Section
      variant="gradient"
      padding="xl"
      className="min-h-screen flex items-center"
    >
      <div className="w-full max-w-md mx-auto">
        <Card variant="elevated" className="backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">IEEE</span>
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Sign in to your IEEE BSU account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <FormInput
                id="userName"
                label="Username"
                placeholder="Enter your username"
                register={register}
                error={errors.userName}
                icon={Mail}
              />

              {/* Password Field */}
              <FormInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                register={register}
                error={errors.password}
                icon={Lock}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                }
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full">
                Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Login;
