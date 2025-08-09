import type { MetaArgs } from "react-router";
import { useState } from "react";
import { Link } from "react-router";
import { Section } from "../components/ui/Section";
import { registerApi } from "~/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { FormInput, FormSelect, FormMultiSelect } from "../components/form";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  Phone,
  MapPin,
  Users,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  facultyOptions,
  genderOptions,
  roleOptions,
  yearOptions,
} from "~/utils/lists";
import { registerSchema } from "~/utils/scemas";
import { useMutation } from "@tanstack/react-query";
import { useCommittees } from "~/hooks/useApi";

export function meta({}: MetaArgs) {
  return [
    { title: "Join IEEE BSU - Create Account" },
    {
      name: "description",
      content: "Join the IEEE BSU community at Beni Suef University",
    },
  ];
}

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      CommitteeIds: [],
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: Register } = useMutation({
    mutationFn: (data: RegisterFormData) => registerApi(data),
    onSuccess: () => {
      console.log("Registration successful");
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error.message);
    },
  });
  const onSubmit = (data: RegisterFormData) => {
    // Ensure CommitteeIds is always an array
    const submitData = {
      ...data,
      CommitteeIds: data.CommitteeIds || [],
    };
    Register(submitData);
  };

  const committeeOptions = useCommittees();

  return (
    <Section
      variant="gradient"
      padding="xl"
      className="min-h-screen flex items-center"
    >
      <div className="w-full max-w-2xl mx-auto">
        <Card variant="elevated" className="backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">IEEE</span>
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              Join IEEE BSU
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Create your account and become part of our community
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormInput
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  register={register}
                  error={errors.firstName}
                  icon={User}
                />
                <FormInput
                  id="middleName"
                  label="Middle Name"
                  placeholder="Middle"
                  register={register}
                  error={errors.middleName}
                  icon={User}
                />
                <FormInput
                  id="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  register={register}
                  error={errors.lastName}
                />
              </div>

              {/* Email Field */}
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                register={register}
                error={errors.email}
                icon={Mail}
              />

              {/* Academic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormSelect
                  id="year"
                  label="Academic Year"
                  options={yearOptions}
                  placeholder="Select Year"
                  register={register}
                  error={errors.year}
                  icon={GraduationCap}
                />
                <FormSelect
                  id="sex"
                  label="Gender"
                  options={genderOptions}
                  placeholder="Select Gender"
                  register={register}
                  error={errors.sex}
                />
              </div>

              {/* Faculty */}
              <FormSelect
                id="faculty"
                label="Faculty"
                options={facultyOptions}
                placeholder="Select Your Faculty"
                register={register}
                error={errors.faculty}
              />

              {/* Location Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  id="goverment"
                  label="Government"
                  placeholder="e.g., Beni Suef"
                  register={register}
                  error={errors.goverment}
                  icon={MapPin}
                />
              </div>

              {/* Phone and Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="+20 123 456 7890"
                  register={register}
                  error={errors.phone}
                  icon={Phone}
                />
                <FormSelect
                  id="roleId"
                  label="Role"
                  options={roleOptions}
                  placeholder="Select Role"
                  register={register}
                  error={errors.roleId}
                />
              </div>

              {/* Committees */}
              <FormMultiSelect
                id="CommitteeIds"
                label="Committees (Optional)"
                options={committeeOptions.data}
                placeholder="Select committees you're interested in"
                register={register}
                setValue={setValue}
                watch={watch}
                error={errors.CommitteeIds as any}
                icon={Users}
              />

              {/* Password Field */}
              <FormInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
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

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>
            </div>

            {/* Sign In Link */}
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default Register;
