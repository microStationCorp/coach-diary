export const DataKeyValue = ({
    dkey,
    dvalue,
    dtextcolor,
  }: {
    dkey: string;
    dvalue: string;
    dtextcolor?: string;
  }) => {
    return (
      <div>
        <div className="capitalize">
          <span className="font-semibold">{dkey} :</span>
          <span className={`${dtextcolor}`}> {dvalue}</span>
        </div>
      </div>
    );
  };