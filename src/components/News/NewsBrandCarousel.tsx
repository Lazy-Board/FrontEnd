import { Listbox, Transition } from "@headlessui/react";
import { RiArrowDownSFill } from "react-icons/ri";
import { Fragment } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  NewsBrandList,
  selectNews,
  selectNewsBrand,
  selectedNewsListType,
} from "../../atom/News";
import { api } from "../../atom/signin";
import BrandLoading from "./BrandLoading";

const NewsBrandCarouselMenu = () => {
  const NewsBrand = useRecoilValueLoadable(NewsBrandList);
  const title = useRecoilValueLoadable(selectNews);

  const [selectedNewsTitle, setSelectedNewsTitle] =
    useRecoilState(selectNewsBrand);

  let LoadableNewstitle = [];

  switch (title.state) {
    case "hasValue":
      LoadableNewstitle = title.contents.map(
        (item: selectedNewsListType) => item.pressName
      );
      break;
  }
  console.log(LoadableNewstitle);
  let LoadableNewsBrand: String[] = [];

  switch (NewsBrand.state) {
    case "hasValue":
      LoadableNewsBrand = NewsBrand.contents;
      break;
  }

  const handleSelect = async (item: any) => {
    setSelectedNewsTitle(item);
    await api.put("/newsuser", { press1: item });
    location.reload();
  };

  return NewsBrand.state === "loading" ? (
    <BrandLoading />
  ) : (
    <div className="mt-12 w-full">
      <Listbox value={selectedNewsTitle} onChange={setSelectedNewsTitle}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-700 py-2 pl-3 pr-10 text-center shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-slate-100">
            <span className="block truncate ml-7">
              {LoadableNewstitle[0] === undefined
                ? "언론사 선택"
                : LoadableNewstitle[0]}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-stone-500 dark:text-slate-200">
              <RiArrowDownSFill size={24} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {LoadableNewsBrand.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 dark:text-slate-200 dark:hover:text-amber-900 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-center ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default NewsBrandCarouselMenu;
