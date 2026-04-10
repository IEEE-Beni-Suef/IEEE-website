import { useForm } from "react-hook-form";
import { FormInput, FormTextarea } from "../form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSponserSchema } from "~/utils/scemas";
import type z from "zod";

interface IProps {}

type sponserFormData = z.infer<typeof addSponserSchema>;

const AddSponserForm = ({}: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sponserFormData>({
    resolver: zodResolver(addSponserSchema),
  });
  return (
    <form>
      <FormInput
        id="title"
        label="Enter the The sponser Title"
        register={register}
      />
      <FormTextarea id="description" label="Desciption" register={register} />
    </form>
  );
};

export default AddSponserForm;
