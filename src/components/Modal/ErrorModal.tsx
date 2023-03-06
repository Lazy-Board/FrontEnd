import { BiMessageError } from "react-icons/bi";

export const Modal = (props: any) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-300 w-1/2 min-w-1/2">
          <div className="flex items-center">
            <BiMessageError fill="red" size={20} />
            <h2 className="text-lg font-medium text-gray-900 ml-2 pb-2">
              {props.title}
            </h2>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">{props.message}</p>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700"
              onClick={props.onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
