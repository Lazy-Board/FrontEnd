import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { NewsBrandList, selectNewsBrand } from "../../atom/News";
import { api } from "../../atom/signin";

import LoadingBar from "../Stock/Loading";

const NewsBrandCarouselMenu = () => {
  const NewsBrand = useRecoilValueLoadable(NewsBrandList);
  const [selectedNewsTitle, setSelectedNewsTitle] =
    useRecoilState(selectNewsBrand);

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
  return NewsBrand.state === "loading" ? (
    <LoadingBar />
  ) : (
    <div className="mt-12 w-full">
      <Listbox value={selectedNewsTitle} onChange={setSelectedNewsTitle}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-center shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selectedNewsTitle === null ? "언론사 선택" : selectedNewsTitle}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <button className="w-5 h-5">▼</button>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {LoadableNewsBrand.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
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
