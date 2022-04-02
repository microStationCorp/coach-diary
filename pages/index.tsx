import CoachModel from "@/model/CoachModel";
import reportModel from "@/model/reportModel";
import { getFullDateFormat } from "@/utils/dateMaker";
import dbConnect from "@/utils/dbConnect";
import { DataKeyValue } from "component/DataKeyValueComp";
import Head from "next/head";

// var options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

function Home({
  data,
}: {
  data: {
    _id: string;
    reportDetails: string;
    escortingFitter: string;
    coachNumber: string;
    coachType: string;
    date: string;
    maintenanceFitter: string;
    action: string;
  }[];
}) {
  return (
    <>
      <Head>
        <title>Timeline</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="text-2xl font-mono my-3 text-center underline decoration-wavy">
          Timeline
        </div>
        <ol className="px-4 flex flex-col lg:flex-row lg:flex-wrap">
          {data.map((d) => (
            <li
              key={d._id}
              className="m-3 bg-cyan-100 shadow-md rounded-lg p-5"
            >
              <div className="text-center text-lg font-medium tracking-wide mb-2">
                <span className="lining-nums">{d.coachNumber}</span>
                <span className="uppercase">-{d.coachType}</span>
              </div>
              <DataKeyValue
                dkey="report"
                dvalue={d.reportDetails}
                dtextcolor="text-red-600"
              />
              <DataKeyValue
                dkey="escorting fitter"
                dvalue={d.escortingFitter}
              />
              {d.action ? (
                <DataKeyValue
                  dkey="action"
                  dvalue={d.action}
                  dtextcolor="text-lime-600"
                />
              ) : null}
              {d.maintenanceFitter ? (
                <DataKeyValue
                  dkey="maintenance Fitter"
                  dvalue={d.maintenanceFitter}
                />
              ) : null}{" "}
              <div className="text-xs mt-2 text-slate-500 font-semibold">
                <span className="capitalize">date :</span>
                <span> {getFullDateFormat(d.date)}</span>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  await CoachModel.find();
  const reportList = await reportModel
    .find({})
    .populate("coach")
    .sort({ date: -1 });

  const data = reportList.map((rl) => {
    return {
      _id: rl._id,
      reportDetails: rl.reportDetails,
      escortingFitter: rl.escortingFitter,
      coachNumber: rl.coach.coachNumber,
      coachType: rl.coach.coachType,
      date: rl.date,
      action: rl.action,
      maintenanceFitter: rl.maintenanceFitter,
    };
  });

  return {
    props: { data: JSON.parse(JSON.stringify(data)) },
  };
}

export default Home;
