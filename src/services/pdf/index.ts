import { jsPDF } from 'jspdf';
import { TravelRecommendation } from '../ai';

export const pdfService = {
  async generateTravelPlan(
    tripData: {
      destination: string;
      startDate: string;
      endDate: string;
      budget: number;
    },
    recommendations: TravelRecommendation
  ): Promise<Blob> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = margin;

    // Add title
    doc.setFontSize(24);
    doc.text('Travel Plan', pageWidth / 2, y, { align: 'center' });
    y += 20;

    // Add trip details
    doc.setFontSize(16);
    doc.text('Trip Details', margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Destination: ${tripData.destination}`, margin, y);
    y += 7;
    doc.text(`Dates: ${tripData.startDate} - ${tripData.endDate}`, margin, y);
    y += 7;
    doc.text(`Budget: $${tripData.budget}`, margin, y);
    y += 15;

    // Add recommendations
    doc.setFontSize(16);
    doc.text('AI Recommendations', margin, y);
    y += 10;

    // Activities
    doc.setFontSize(14);
    doc.text('Top Activities:', margin, y);
    y += 7;
    doc.setFontSize(12);
    recommendations.activities.forEach(activity => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(`• ${activity}`, margin + 5, y);
      y += 7;
    });
    y += 5;

    // Local Tips
    doc.setFontSize(14);
    doc.text('Local Tips:', margin, y);
    y += 7;
    doc.setFontSize(12);
    recommendations.localTips.forEach(tip => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(`• ${tip}`, margin + 5, y);
      y += 7;
    });
    y += 5;

    // Budget Tips
    doc.setFontSize(14);
    doc.text('Budget Tips:', margin, y);
    y += 7;
    doc.setFontSize(12);
    recommendations.budgetTips.forEach(tip => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(`• ${tip}`, margin + 5, y);
      y += 7;
    });
    y += 5;

    // Weather Info
    doc.setFontSize(14);
    doc.text('Weather Information:', margin, y);
    y += 7;
    doc.setFontSize(12);
    doc.text(recommendations.weatherInfo, margin + 5, y);

    // Convert to blob
    return doc.output('blob');
  }
}; 