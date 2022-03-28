import Link from "next/link";

const links: { name: string; url: string }[] = [
  {
    name: "timeline",
    url: "/",
  },
  {
    name: "coach list",
    url: "/coachlist",
  },
  {
    name: "new coach form",
    url: "/form/addnewcoach",
  },
  {
    name: "Coach report form",
    url: "/form/report",
  },
];

const AppBar = () => {
  return (
    <>
      <div className="flex bg-slate-500 text-white">
        {links.map((link) => (
          <div key={link.url} className="mx-3 my-3 text-xl font-mono capitalize hover:text-slate-300">
            <Link href={link.url} passHref>
              <a>{link.name}</a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppBar;
