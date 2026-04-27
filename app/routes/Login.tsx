
import type { MetaArgs } from "react-router";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Section } from "../components/ui/Section";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FormInput } from "../components/form";
import { AuthIllustration } from "../components/AuthIllustration";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "~/utils/schemas";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "~/lib/api";
import { saveAuth } from "~/hooks/useAuth";

export function meta({}: MetaArgs) {
  return [
    { title: "Sign In - IEEE BNS" },
    { name: "description", content: "Sign in to your IEEE BNS account" },
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
  const navigate = useNavigate();
  const { mutate: Login } = useMutation({
    mutationFn: (data: LoginFormData) => loginApi(data),
    onSuccess: (data) => {
      // data expected: { accessToken, refreshToken, userId }
      saveAuth(data.accessToken, data.refreshToken, data.user.id);
      navigate("/");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
  const onSubmit = (data: LoginFormData) => {
    const submitData = {
      ...data,
    };
    Login(submitData);
  };

  return (
    <Section
      variant="gradient"
      padding="xl"
      className="min-h-screen flex items-center"
    >
      <div className="w-full  max-w-6xl mx-auto">
        <div className="lg:hidden text-center mb-8">
          <AuthIllustration type="login" className="max-w-xs mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Sign in to your IEEE BNS account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to IEEE BNS
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Join our community of innovators and technology enthusiasts
              </p>
            </div>
            <AuthIllustration type="login" className="max-w-md mx-auto" />
          </div>

          {/* Form Side */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card variant="elevated" className="backdrop-blur-md">
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Username Field */}
                  <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
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
                <div className="my-4">
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
        </div>
      </div>
    </Section>
  );
};

export default Login;
