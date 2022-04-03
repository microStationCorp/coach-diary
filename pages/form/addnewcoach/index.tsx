import { CoachData } from "@/utils/interface";
import { CustomButton } from "component/CustomButton";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const InputClass =
  "form-control w-full px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

const AddCoachDetails: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CoachData>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ coachType: "", coachNumber: "", returnDate: "" });
    }
  }, [reset, isSubmitSuccessful]);

  const onSubmit: SubmitHandler<CoachData> = (data) => {
    console.log(data);
    fetch("/api/addcoach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((d) => console.log(d));
    });
  };

  return (
    <>
      <Head>
        <title>Add Coach Details</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex items-center flex-col">
        <div className="capitalize text-2xl font-mono my-3 text-center underline decoration-wavy">
          coach details form
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mt-5 gap-6 bg-cyan-100 p-5 rounded-lg shadow-md">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-baseline">
                <label>Coach Type:</label>
                <input
                  className={InputClass}
                  {...register("coachType", { required: true })}
                />
                {errors.coachType && <span> Coach Type required</span>}
              </div>
              <div>
                <label>Coach Number:</label>
                <input
                  className={InputClass}
                  {...register("coachNumber", { required: true })}
                />
                {errors.coachNumber && <span>Coach Number required</span>}
              </div>
              <div>
                <label>Return Date:</label>
                <input className={InputClass} {...register("returnDate")} />
              </div>
              <div>
                <label>AC Plant:</label>
                <input className={InputClass} {...register("acPlant")} />
              </div>
              <div>
                <label>Inverter:</label>
                <input className={InputClass} {...register("inverter")} />
              </div>
              <div>
                <label>Pump 1:</label>
                <input className={InputClass} {...register("pump1")} />
              </div>
              <div>
                <label>Pump 2:</label>
                <input className={InputClass} {...register("pump2")} />
              </div>
              <div>
                <label>RRU PP:</label>
                <input className={InputClass} {...register("rruPP")} />
              </div>
              <div>
                <label>RRU NPP:</label>
                <input className={InputClass} {...register("rruNPP")} />
              </div>
            </div>
            <div>
              <CustomButton />
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddCoachDetails;
