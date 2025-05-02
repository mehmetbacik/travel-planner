import React from 'react';
import { useTranslation } from 'next-i18next';
import { usePDFGenerator } from '@/utils/pdfGenerator';

interface PDFDownloadButtonProps {
  elementId: string;
  fileName: string;
  title: string;
  className?: string;
}

export const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  elementId,
  fileName,
  title,
  className = '',
}) => {
  const { t } = useTranslation();
  const { downloadPDF } = usePDFGenerator();

  const handleDownload = async () => {
    try {
      await downloadPDF(elementId, fileName, title);
    } catch (error) {
      console.error('PDF download error:', error);
      // Here, the user can be informed in case of an error.
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      {t('common:downloadPDF')}
    </button>
  );
}; 