import type { GetServerSideProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "utils/dbConnect";
import Coach from "model/CoachModel";
import { CoachSchemaData } from "model/CoachModel";

function CoachReport({ searchedCoach }: { searchedCoach: CoachSchemaData }) {
  return (
    <>
      <Head>
        <title>Coach data</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>coach {searchedCoach.coachNumber} data</h1>
        <div>
          <span>coach type : {searchedCoach.coachType}</span>
        </div>
        <div>
          <span>coach number : {searchedCoach.coachNumber}</span>
        </div>
        <div>
          <span> return date : {searchedCoach.returnDate}</span>
        </div>
        <div>
          <span>AC plant : {searchedCoach.acPlant}</span>
        </div>
        <div>
          <span>inverter : {searchedCoach.inverter}</span>
        </div>
        <div>
          <span>pump 1 : {searchedCoach.pump1}</span>
        </div>
        <div>
          <span>pump 2 : {searchedCoach.pump2}</span>
        </div>
        <div>
          <span>RRU PP side : {searchedCoach.rruPP}</span>
        </div>
        <div>
          <span>RRU NPP side : {searchedCoach.rruNPP}</span>
        </div>
        <h2>report :</h2>
        {searchedCoach.coachReport.length == 0 ? (
          <span>no report</span>
        ) : (
          <ol>
            {searchedCoach.coachReport.map((rep) => (
              <li key={rep._id}>
                <div>date : {rep.date}</div>
                <div>report details : {rep.reportDetails}</div>
                <div>escorting fitter : {rep.escortingFitter}</div>
              </li>
            ))}
          </ol>
        )}
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
