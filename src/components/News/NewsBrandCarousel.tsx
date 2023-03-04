import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { NewsBrandList, selectNewsBrand } from "../../atom/News";
import { api } from "../../atom/signin";

import LoadingBar from "../Stock/Loading";

const NewsBrandCarouselMenu = () => {
  const NewsBrand = useRecoilValueLoadable(NewsBrandList);
  const [selectedNewsTitle, setSelectedNewsTitle] =
    useRecoilState(selectNewsBrand);
  // const NewsBrandList =
  //   useRecoilValueLoadable<selectedNewsListType[]>(selectedNewsList);

  let LoadableNewsBrand: String[] = [];

  switch (NewsBrand.state) {
    case "hasValue":
      LoadableNewsBrand = NewsBrand.contents;
      break;
  }

  const handleSelect = async (item: any) => {
    await api.put("/newsuser", { press1: item });
    setSelectedNewsTitle(item);
    location.reload();
  };

  return (
    <div className="mt-12 w-full dropdown dropdown-hover">
      <label tabIndex={0} className="btn w-full">
        {selectedNewsTitle === null ? "언론사 선택" : selectedNewsTitle}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu shadow bg-base-100 max-h-80 w-1/3 overflow-y-auto items-end"
      >
        <div className="flex flex-col overflow-y-auto">
          {NewsBrand.state === "loading" ? (
            <LoadingBar />
          ) : (
            LoadableNewsBrand.map((item, idx) => (
              <li
                onClick={() => handleSelect(item)}
                key={idx}
                className="p-2 cursor-pointer text-gray-600 border-2 border-slate-300 text-sm block w-full"
              >
                {item}
              </li>
            ))
          )}
        </div>
      </ul>
    </div>
  );
};

export default NewsBrandCarouselMenu;
