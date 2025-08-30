import type { MetaArgs } from "react-router";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
import { ProgressSteps } from "../components/ProgressSteps";
import { AuthIllustration } from "../components/AuthIllustration";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
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
  governorateOptions,
  roleOptions,
  yearOptions,
} from "~/utils/lists";
import { registerSchema } from "~/utils/scemas";
import { useMutation } from "@tanstack/react-query";
import { useCommittees } from "~/hooks/useApi";
import type { Committee } from "~/types";
import toast from "react-hot-toast";

export function meta({}: MetaArgs) {
  return [
    { title: "Join IEEE BNS - Create Account" },
    {
      name: "description",
      content: "Join the IEEE BNS community at Beni Suef University",
    },
  ];
}

type RegisterFormData = z.infer<typeof registerSchema>;

const steps = [
  {
    id: 1,
    title: "Personal Info",
  },
  {
    id: 2,
    title: "Academic Info",
  },
  {
    id: 3,
    title: "Contact & Role",
  },
];

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      CommitteeIds: [],
    },
    mode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: Register } = useMutation({
    mutationFn: (data: RegisterFormData) => registerApi(data),
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error("Registration failed: " + error.message);
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

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof RegisterFormData)[] => {
    switch (step) {
      case 1:
        return ["firstName", "middleName", "lastName", "email"];
      case 2:
        return ["year", "sex", "faculty", "goverment"];
      case 3:
        return ["phone", "roleId", "password"];
      default:
        return [];
    }
  };

  const committeeOptions = useCommittees();
  console.log(committeeOptions);

  const transformedCommitteeOptions =
    committeeOptions?.data?.map((committee: Committee) => ({
      value: committee.id.toString(),
      label: committee.name,
    })) ?? [];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
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

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              register={register}
              error={errors.email}
              icon={Mail}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
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

            <FormSelect
              id="faculty"
              label="Faculty"
              options={facultyOptions}
              placeholder="Select Your Faculty"
              register={register}
              error={errors.faculty}
            />

            <FormSelect
              id="goverment"
              label="Government"
              options={governorateOptions}
              placeholder="e.g., Beni Suef"
              register={register}
              error={errors.goverment}
              icon={MapPin}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
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

            <FormMultiSelect
              id="CommitteeIds"
              label="Committees (Optional)"
              options={transformedCommitteeOptions}
              placeholder="Select committees you're interested in"
              register={register}
              setValue={setValue}
              watch={watch}
              error={errors.CommitteeIds as any}
              icon={Users}
            />

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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Section
      variant="gradient"
      padding="xl"
      className="min-h-screen flex items-center"
    >
      <div className="w-full  max-w-7xl mx-auto">
        {/* Mobile header with illustration */}
        <div className="lg:hidden text-center mb-8">
          <AuthIllustration type="register" className="max-w-xs mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Join IEEE BNS
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Create your account and become part of our community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Illustration Side - Desktop Only */}
          <div className="hidden lg:block lg:sticky lg:top-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Join IEEE BNS Community
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Connect with fellow innovators and advance your technical career
              </p>
            </div>
            <AuthIllustration type="register" className="max-w-md mx-auto" />

            {/* Benefits Section */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Access to exclusive technical workshops</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Professional development opportunities</span>
              </div>
              <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Networking with industry professionals</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            <Card variant="elevated" className="backdrop-blur-md">
              <CardContent>
                <ProgressSteps steps={steps} currentStep={currentStep} />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {renderStepContent()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        leftIcon={<ArrowLeft className="w-5 h-5" />}
                      >
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        rightIcon={<ArrowRight className="w-5 h-5" />}
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                </form>

                {/* Divider */}
                <div className="my-4">
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
        </div>
      </div>
    </Section>
  );
};

export default Register;
