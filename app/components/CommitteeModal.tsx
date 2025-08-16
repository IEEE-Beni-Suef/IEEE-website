import React, { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "./Modal";
import { FormInput } from "./form/FormInput";
import { FormSelect } from "./form/FormSelect";
import { FormMultiSelect } from "./form/FormMultiSelect";
import { Button } from "./ui/Button";
import { committeeSchema } from "~/utils/scemas";
import { useAllUsers } from "~/hooks/useApi";
import { Users, UserCheck, Building2 } from "lucide-react";

type CommitteeFormData = z.infer<typeof committeeSchema>;

interface CommitteeSubmissionData {
  name: string;
  headId: number;
  vicesId: number[];
}

interface CommitteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CommitteeSubmissionData) => void;
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
      headId: "",
      vicesId: [],
    },
  });

  const watchedHeadId = watch("headId");

  // Reset form when modal opens/closes or committee changes
  useEffect(() => {
    if (isOpen) {
      if (committee) {
        reset({
          name: committee.name,
          headId: committee.headId.toString(),
          vicesId: committee.vicesId.map((id) => id.toString()),
        });
      } else {
        reset({
          name: "",
          headId: "",
          vicesId: [],
        });
      }
    }
  }, [isOpen, committee, reset]);

  const handleFormSubmit = (data: CommitteeFormData) => {
    // Convert string values back to numbers for submission
    const submitData = {
      name: data.name,
      headId: Number(data.headId),
      vicesId: data.vicesId.map((id) => Number(id)),
    };
    onSubmit(submitData);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Filter users to get only those who can be heads (role 2) and vices (role 5)
  // Assuming users have a roleId property
  const headOptions = users
    .filter((user: any) => user.roleId === 2 || user.roleId === 1) // Committee Head or High Board
    .map((user: any) => ({
      value: user.id.toString(),
      label: `${user.firstName} ${user.lastName}`,
    }));

  const viceOptions = users
    .filter(
      (user: any) => user.roleId === 5 && user.id !== Number(watchedHeadId)
    ) // Vice and not the selected head
    .map((user: any) => ({
      value: user.id.toString(),
      label: `${user.firstName} ${user.lastName}`,
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
