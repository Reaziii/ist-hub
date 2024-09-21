"use client";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import handleToast from "./handleToast";

const VerifyModal: React.FC<{
  isOpen: boolean;
  setIsOpen: () => void;
  canVerify: boolean;
  handleVerifyUser: () => void;
}> = ({ isOpen, setIsOpen, canVerify, handleVerifyUser }) => {
  if (!isOpen) return <></>;
  console.log(canVerify);
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#00000081] z-20 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={setIsOpen}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {canVerify
                ? "Are you sure you want to verify this user?"
                : "You are not allowed to verify an user"}
            </h3>
            {canVerify ? (
              <>
                <button
                  onClick={handleVerifyUser}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={setIsOpen}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const VerifiedModal: React.FC<{
  isOpen: boolean;
  setIsOpen: () => void;
  userid: string;
}> = ({ isOpen, setIsOpen, userid }) => {
  const [verifier, setVerifier] = useState({ userid: "", username: "" });
  useEffect(() => {
    fetch(`/api/users/verifier?userid=${userid}`)
      .then((resp) => resp.json())
      .then(
        (
          resp: ServerMessageInterface & {
            verifier?: { userid: string; username: string };
          }
        ) => {
          if (resp.success && resp.verifier) {
            setVerifier(resp.verifier);
          }
        }
      );
  }, [isOpen]);
  if (!isOpen) return <></>;
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-[#00000081] z-20 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={setIsOpen}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="lightgreen"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Verified by{" "}
              <a href={`/profile/${verifier.userid}`}>{verifier.username}</a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyUserModal: React.FC<{
  verifyUser: (userid: string) => Promise<ServerMessageInterface>;
  verified: boolean;
  iamverified: boolean;
  userid: string;
}> = ({ iamverified, verified, userid, verifyUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const [_verified, setVerified] = useState(verified);
  const handleVerifyUser = () => {
    verifyUser(userid).then((resp) => {
      handleToast(resp);
      if (resp.success) {
        setVerified(true);
      }
    });
  };
  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <FaCheckCircle
          size={20}
          color={`${_verified ? "lightgreen" : "lightgray"}`}
        />
      </button>
      {!_verified && (
        <VerifyModal
          handleVerifyUser={handleVerifyUser}
          isOpen={openModal}
          setIsOpen={() => {
            setOpenModal(false);
          }}
          canVerify={iamverified}
        />
      )}
      {_verified && (
        <VerifiedModal
          userid={userid}
          isOpen={openModal}
          setIsOpen={() => {
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
};

export default VerifyUserModal;
