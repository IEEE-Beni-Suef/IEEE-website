import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "./Modal";
import { FormInput, FormSelect, FormMultiSelect } from "./form";
import { Button } from "./ui/Button";
import { createUserSchema } from "~/utils/schemas";
import { useCommittees } from "~/hooks/useApi";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Phone,
  MapPin,
  Users,
} from "lucide-react";
import {
  facultyOptions,
  genderOptions,
  governorateOptions,
  roleOptions,
  yearOptions,
} from "~/utils/lists";
import type { Committee } from "~/types";

type UserFormData = z.infer<typeof createUserSchema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  user?: UserFormData & { id?: number };
  isLoading?: boolean;
}

export const UsersModal: FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: committees = [] } = useCommittees();
  

  const committeeOptions = React.useMemo(() => 
    committees.map((committee: Committee) => ({
      value: committee.id.toString(),
      label: committee.name,
    })), [committees]);

  const {
    register,
    handleSubmit: handleRHFSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      CommitteeIds: [] as string[],
      isActive: true,
      roleId: "3" as const
    },
  });

  // Reset form when modal opens/closes or user changes
  useEffect(() => {
    if (isOpen) {
      if (user) {
        // Convert numbers to strings for the form if needed
        const formUser = {
          ...user,
          CommitteeIds: user.CommitteeIds?.map(id => id.toString()) || [],
        };
        reset(formUser);
      } else {
        reset({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          year: "",
          faculty: "",
          goverment: "",
          sex: undefined,
          roleId: "3" as const,
          CommitteeIds: [] as string[],
          isActive: true,
        });
      }
    }
  }, [isOpen, user, reset]);

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      console.log("Form data before submission:", data);
      
      // The schema will handle the conversion of CommitteeIds to numbers
      const submitData = {
        ...data,
        CommitteeIds: data.CommitteeIds || []
      };

      console.log("Transformed data:", submitData);
      onSubmit(submitData);
    } catch (error) {
      console.error("Error in form submission:", error);
      alert((error as Error).message);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={user ? "Edit User" : "Create User"}
    >
      <form onSubmit={handleRHFSubmit(handleFormSubmit)} className="space-y-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            id="goverment"
            label="Government"
            options={governorateOptions}
            placeholder="e.g., Beni Suef"
            register={register}
            error={errors.goverment}
            icon={MapPin}
          />
          <FormInput
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="+20 123 456 7890"
            register={register}
            error={errors.phone}
            icon={Phone}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            id="roleId"
            label="Role"
            options={roleOptions}
            placeholder="Select Role"
            register={register}
            error={errors.roleId}
          />
          <FormMultiSelect
            id="CommitteeIds"
            label="Committees"
            options={committeeOptions}
            placeholder="Select committees"
            register={register}
            setValue={setValue}
            watch={watch}
            error={errors.CommitteeIds as any}
            icon={Users}
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

        <div className="flex items-center space-x-2">
          <label
            htmlFor="isActive"
            className="text-m font-medium text-gray-700 dark:text-gray-200"
          >
            Active User
          </label>
          <input
            type="checkbox"
            id="isActive"
            {...register("isActive")}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Creating..." : user ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
