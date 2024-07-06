"use client";

import { useState, useEffect, useRef } from "react";
import UploadExcelForm from "./UploadExcelForm";
import { I18nProviderClient, useCurrentLocale } from "@/locales/client";
import { tt } from "@/lib";

export default function BatchAssignGrade({ course }: { course: any}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const locale = useCurrentLocale();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className='mb-4'>
      <button className='btn' onClick={handleOpenModal}>
        {tt(locale, {
          en: "Batch Assign Grades",
          ar: "تعيين الدرجات جماعيًا",
        })}
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div
            className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative'
            ref={modalRef}
          >
            <button
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className='text-2xl font-bold mb-4'>
              {tt(locale, {
                en: "Batch Assign Grades",
                ar: "تعيين الدرجات جماعيًا",
              })}
            </h2>
            <I18nProviderClient locale={locale}>
              <UploadExcelForm
                course={course}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </I18nProviderClient>
          </div>
        </div>
      )}
    </div>
  );
}
