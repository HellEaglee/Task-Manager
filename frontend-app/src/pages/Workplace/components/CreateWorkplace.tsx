import { FormEvent, useState } from "react";
import { plus_icon } from "../../../assets";
import { useCreateWorkplaceMutation } from "../../../api/workplaceApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { toast } from "react-toastify";

const CreateWorkplace = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const [createWorkplace, { isLoading, error }] = useCreateWorkplaceMutation();

  if (!user) {
    return <div>No user</div>;
  }
  const creator_id = user?.id;

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createWorkplace({ name: name, creator_id: creator_id }).unwrap();
      setName("");
      setShow((prev) => !prev);
      toast.success("Workplace created successfully!");
    } catch (err) {
      console.error("Failed to create workplace: ", err);
    }
  };

  return (
    <>
      {!show ? (
        <div className="flex pl-3 mt-6">
          <div
            onClick={toggleShow}
            className="flex gap-2 px-2 py-1 cursor-pointer hover:bg-graysecondary duration-75 rounded-md"
          >
            <img src={plus_icon} alt="" />
            <p className="font-normal text-graysilver text-sm">
              Создать рабочее место
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-1">
          <input
            id="name"
            type="text"
            placeholder="Напишите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-base text-graysilver font-normal h-7 bg-transparent border-[0.0625px] border-graysecondary rounded-md placeholder:text-graysecondary"
          />
          <div className="flex gap-1">
            <button
              className={`text-sm text-graywhite font-normal py-1 px-2 ${
                isLoading ? "bg-graysecondary" : "bg-secondary"
              }  rounded hover:brightness-125`}
              disabled={isLoading}
            >
              {isLoading ? "Обработка..." : "Создать"}
            </button>
            <button
              type="submit"
              onClick={toggleShow}
              className="flex justify-center items-center text-base text-graysilver font-bold h-7 w-7 bg-graysecondary rounded hover:brightness-125"
              disabled={isLoading}
            >
              ✕
            </button>
            {error && <div className="text-red-500">Error</div>}
          </div>
        </form>
      )}
    </>
  );
};

export default CreateWorkplace;
