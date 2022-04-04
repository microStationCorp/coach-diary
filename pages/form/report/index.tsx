import { GetServerSideProps } from "next";
import Head from "next/head";
import dbConnect from "utils/dbConnect";
import Coach from "model/CoachModel";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReportData } from "@/utils/interface";
import { CustomButton } from "component/CustomButton";
import { useState } from "react";
import Loader from "component/loader";
import { ErrorText } from "component/ErrorText";

interface chlist {
  _id: string;
  coachType: string;
  coachNumber: string;
}

function CoachReportForm({ coachlist }: { coachlist: chlist[] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportData>();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ReportData> = (data) => {
    setLoading(true);
    fetch("/api/addreport", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((d) => {
        setLoading(false);
        reset();
      });
    });
  };

  if (loading) {
    return <Loader type="spinningBubbles" color="black" />;
  }

  return (
    <>
      <Head>
        <title> Coach report form</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex items-center flex-col">
        <div className="capitalize text-2xl font-mono my-3 text-center underline decoration-wavy">
          coach report form
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mt-5 gap-6 bg-cyan-100 p-5 rounded-lg shadow-md">
            <div className="flex flex-col items-baseline gap-3">
              <div>
                <label htmlFor="coach">Choose a coach:</label>
                <select
                  className="form-select appearance-none px-3 py-1 ml-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  {...register("_id", {
                    validate: (value) => {
                      if (value === "") {
                        return false;
                      } else {
                        return true;
                      }
                    },
                  })}
                  id="coach"
                >
                  <option value={""}>--select coach--</option>
                  {coachlist.map((cl) => (
                    <option value={cl._id} key={cl._id}>
                      {cl.coachNumber}-{cl.coachType}
                    </option>
                  ))}
                </select>
                {errors._id && <ErrorText text="* select coach" />}
              </div>
              <div>
                <label className="">Report Details :</label>
                <textarea
                  rows={4}
                  className="form-control w-full
                  px-3
                  py-1
                  ml-2
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                  {...register("reportDetails", { required: true })}
                />
                {errors.reportDetails && (
                  <ErrorText text="* report details requires" />
                )}
              </div>
              <div>
                <label>Escorting Fitter :</label>
                <input
                  type="text"
                  className="form-control ml-2 px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                  {...register("escortingFitter", { required: true })}
                />
                {errors.escortingFitter && (
                  <ErrorText text="* escorting fitter name required" />
                )}
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
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const result = await Coach.find({}).select("coachType coachNumber");
  return {
    props: {
      coachlist: result.map((r) => {
        return {
          _id: r._id.toString(),
          coachType: r.coachType,
          coachNumber: r.coachNumber,
        };
      }),
    },
  };
};
export default CoachReportForm;
