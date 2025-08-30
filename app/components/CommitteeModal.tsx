import React, { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "./Modal";
import {
  FormInput,
  FormSelect,
  FormMultiSelect,
  FormFileInput,
  FormTextarea,
} from "./form";
import { Button } from "./ui/Button";
import { committeeSchema } from "~/utils/scemas";
import { useAllUsers } from "~/hooks/useApi";
import { Users, UserCheck, Building2, FileText, Image } from "lucide-react";

type CommitteeFormData = z.infer<typeof committeeSchema>;

interface CommitteeSubmissionData {
  name: string;
  description: string;
  headId: number;
  vicesId: number[];
  image?: File;
}

interface CommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  committee?: CommitteeSubmissionData & { id?: number };
  isLoading?: boolean;
}

export const CommitteeModal: FC<CommitteeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  committee,
  isLoading = false,
}) => {
  const { data: users = [], isLoading: usersLoading } = useAllUsers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CommitteeFormData>({
    resolver: zodResolver(committeeSchema),
    defaultValues: {
      name: "",
      description: "",
      headId: "",
      vicesId: [],
      image: undefined,
    },
  });

  const watchedHeadId = watch("headId");

  // Reset form when modal opens/closes or committee changes
  useEffect(() => {
    if (isOpen) {
      if (committee) {
        reset({
          name: committee.name,
          description: committee.description,
          headId: committee.headId.toString(),
          vicesId: committee.vicesId.map((id) => id.toString()),
          image: undefined,
        });
      } else {
        reset({
          name: "",
          description: "",
          headId: "",
          vicesId: [],
          image: undefined,
        });
      }
    }
  }, [isOpen, committee, reset]);

  const handleFormSubmit = (data: CommitteeFormData) => {
    // Create FormData for submission to handle file upload
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("headId", data.headId);

    // Append vice members as separate entries
    data.vicesId.forEach((id) => {
      formData.append("vicesId", id);
    });

    // Append image if provided
    if (data.image) {
      formData.append("imageUrl", data.image);
    }

    onSubmit(formData as any);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const headOptions = users
    .filter((user: any) => user.roleId === 2) // Committee Head or High Board
    .map((user: any) => ({
      value: user.id.toString(),
      label: `${user.fName} ${user.lName}`,
    }));

  const viceOptions = users
    .filter((user: any) => user.roleId === 5)
    .map((user: any) => ({
      value: user.id.toString(),
      label: `${user.fName} ${user.lName}`,
    }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={committee ? "Edit Committee" : "Create Committee"}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          id="name"
          label="Committee Name"
          placeholder="Enter committee name"
          register={register}
          error={errors.name}
          icon={Building2}
        />

        <FormTextarea
          id="description"
          label="Committee Description"
          placeholder="Enter committee description"
          register={register}
          error={errors.description}
          icon={FileText}
          rows={3}
        />

        <FormFileInput
          id="image"
          label="Committee Image"
          accept="image/*"
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.image as any}
          icon={Image}
          placeholder="Choose committee image..."
        />

        <FormSelect
          id="headId"
          label="Committee Head"
          options={headOptions}
          register={register}
          error={errors.headId}
          icon={UserCheck}
          placeholder="Select committee head"
        />

        <FormMultiSelect
          id="vicesId"
          label="Vice Members"
          options={viceOptions}
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.vicesId as any}
          icon={Users}
          placeholder="Select vice members"
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || usersLoading}
          >
            {isLoading
              ? "Saving..."
              : committee
                ? "Update Committee"
                : "Create Committee"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
