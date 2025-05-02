import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTranslation } from 'next-i18next';

interface PDFGeneratorProps {
  elementId: string;
  fileName: string;
  title: string;
}

export const generatePDF = async ({ elementId, fileName, title }: PDFGeneratorProps) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add title
    pdf.setFontSize(20);
    pdf.text(title, 105, 20, { align: 'center' });
    position = 30;

    // Add content
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 297; // A4 height

    // Add new pages if content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    // Download PDF
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

export const usePDFGenerator = () => {
  const { t } = useTranslation();

  const downloadPDF = async (elementId: string, fileName: string, title: string) => {
    try {
      await generatePDF({ elementId, fileName, title });
    } catch (error) {
      console.error('PDF download error:', error);
      throw error;
    }
  };

  return { downloadPDF };
}; 