import Link from "next/link";

const AppBar = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link href="/" passHref>
            <a>Timeline</a>
          </Link>
        </div>
        <div>
          <Link href="/coachlist" passHref>
            <a>Coach List</a>
          </Link>
        </div>
        <div>
          <Link href="/form/addnewcoach" passHref>
            <a>new Coach form</a>
          </Link>
        </div>
        <div>
          <Link href="/form/report" passHref>
            <a>Coach report form</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AppBar;
