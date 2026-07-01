import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportAnalytics(analytics) {
  const doc = new jsPDF();
  const primaryColor = [56, 189, 248]; // #9FA1FF
  const textColor = [47, 58, 68]; // #2F3A44
  
  // Title
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('BrowseSense Analytics Report', 14, 22);

  // Date
  doc.setFontSize(10);
  doc.setTextColor(109, 123, 135); // #6D7B87
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

  // Summary Metrics Section
  doc.setFontSize(14);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Performance Summary', 14, 45);

  const productivityScore = analytics?.productivityScore ?? 0;
  const rating = analytics?.productivityScoreDetails?.overallRating ?? 'Poor';
  
  autoTable(doc, {
    startY: 50,
    head: [['Today Visits', 'Productivity Score', 'Rating', 'Peak Hour']],
    body: [[
      analytics?.todayVisits ?? 0,
      `${productivityScore} / 100`,
      rating,
      analytics?.mostActiveHour?.hour !== undefined && analytics?.mostActiveHour?.hour !== 'N/A' 
        ? `${analytics.mostActiveHour.hour}:00` 
        : 'N/A'
    ]],
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: 255 },
    styles: { halign: 'center', fontSize: 11 },
  });

  // Top Websites
  const topSites = (analytics?.top10Websites || []).map(s => [s.name, s.value]);
  doc.text('Top Websites', 14, doc.lastAutoTable.finalY + 15);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Website', 'Visits']],
    body: topSites.length ? topSites : [['No data', '-']],
    theme: 'striped',
    headStyles: { fillColor: [71, 85, 105] }, // Slate 600
  });

  // Top Categories
  const categories = (analytics?.categoryDistribution || []).slice(0, 10).map(c => [c.name, c.value]);
  doc.text('Top Categories', 14, doc.lastAutoTable.finalY + 15);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Category', 'Visits']],
    body: categories.length ? categories : [['No data', '-']],
    theme: 'striped',
    headStyles: { fillColor: [71, 85, 105] },
  });

  // Insights
  const insights = (analytics?.insights || []).map(i => [i]);
  doc.text('Quick Insights', 14, doc.lastAutoTable.finalY + 15);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Insight']],
    body: insights.length ? insights : [['No insights available yet']],
    theme: 'grid',
    headStyles: { fillColor: primaryColor },
  });

  // Recent Activity
  const activity = (analytics?.recentActivity || []).slice(0, 15).map(v => [
    v.title ? (v.title.length > 50 ? v.title.substring(0, 47) + '...' : v.title) : 'Untitled',
    v.domain || v.url,
    v.category,
    v.displayTime
  ]);
  
  doc.addPage();
  doc.setFontSize(14);
  doc.text('Recent Activity', 14, 22);
  autoTable(doc, {
    startY: 28,
    head: [['Page Title', 'Domain', 'Category', 'Time']],
    body: activity.length ? activity : [['No data', '-', '-', '-']],
    theme: 'striped',
    headStyles: { fillColor: [71, 85, 105] },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 50 },
      2: { cellWidth: 35 },
      3: { cellWidth: 30 }
    }
  });

  doc.save('browsesense-analytics.pdf');
}
