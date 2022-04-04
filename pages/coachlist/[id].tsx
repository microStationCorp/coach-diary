import type { GetServerSideProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "utils/dbConnect";
import Coach from "model/CoachModel";
import { ICoachSchemaData } from "model/CoachModel";
import Link from "next/link";
import { Labels } from "@/utils/labels";
import { DataKeyValue } from "component/DataKeyValueComp";
import { getFullDateFormat } from "@/utils/dateMaker";

function CoachReport({ searchedCoach }: { searchedCoach: ICoachSchemaData }) {
  return (
    <>
      <Head>
        <title>Coach data</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="text-2xl font-mono my-3 text-center capitalize">
          coach - {searchedCoach.coachNumber}(
          <span className="text-cyan-700">{searchedCoach.coachType}</span>)
        </div>
        {/* coach data block */}
        <div className="bg-slate-200 p-2 mb-3 rounded-md pl-4 shadow-md">
          <div className=" mb-2 capitalize text-xl font-semibold underline">
            coach data
          </div>
          <div className="ml-2 mb-4">
            {Object.entries(Labels).map(([key, value]) => (
              <DataKeyValue
                key={key}
                dkey={value}
                /*  @ts-expect-error: */
                dvalue={searchedCoach[key]}
              />
            ))}
          </div>
          <div className="my-2">
            <Link href={`/form/updatecoach/${searchedCoach._id}`} passHref>
              <a className="capitalize cursor-pointer text-blue-400 hover:text-white text-sm font-semibold bg-white hover:bg-blue-400 border border-cyan-400 hover:border-none rounded-md my-2 p-2 hover:shadow-md">
                update coach data
              </a>
            </Link>
          </div>
        </div>
        {/* report block */}
        <div className="p-2 mb-3 rounded-md pl-4 md:shadow-md shadow-none">
          <div className="mb-2 capitalize text-xl font-semibold underline">
            report :
          </div>

          {searchedCoach.coachReport?.length == 0 ? (
            <div className="m-3 font-semibold bg-cyan-100 shadow-md rounded-lg p-5 capitalize text-center">
              --- no report ---
            </div>
          ) : (
            <div className="px-4 flex flex-col lg:grid lg:grid-cols-4 lg:gap-4">
              {searchedCoach.coachReport?.map((rep) => (
                <div
                  key={rep._id}
                  className="m-3 bg-cyan-100 shadow-md rounded-lg p-5"
                >
                  <DataKeyValue
                    dkey="report"
                    dvalue={rep.reportDetails}
                    dtextcolor="text-red-600"
                  />
                  <DataKeyValue
                    dkey="escorting fitter"
                    dvalue={rep.escortingFitter}
                  />
                  {rep.action ? (
                    <DataKeyValue
                      dkey="action"
                      dvalue={rep.action}
                      dtextcolor="text-lime-600"
                    />
                  ) : null}
                  {rep.maintenanceFitter ? (
                    <DataKeyValue
                      dkey="maintenance Fitter"
                      dvalue={rep.maintenanceFitter}
                    />
                  ) : null}
                  <div className="text-xs mt-2 text-slate-500 font-semibold">
                    {" "}
                    <span className="capitalize">date</span> :{" "}
                    {getFullDateFormat(rep.date.toString())}
                  </div>
                  <div className="mt-2">
                    <Link href={`/form/updatereport/${rep._id}`} passHref>
                      <a className="text-blue-500 cursor-pointer hover:underline">
                        update report
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: {
  params?: { id: string } | ParsedUrlQuery | undefined;
}) => {
  await dbConnect();
  const id = context.params?.id;
  const searchedCoach = await Coach.findOne({ _id: id })
    .select("-__v")
    .populate("coachReport");
  return {
    props: {
      searchedCoach: JSON.parse(JSON.stringify(searchedCoach)),
    },
  };
};
export default CoachReport;
