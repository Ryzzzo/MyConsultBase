'use client';

import { FileBarChart, Download } from 'lucide-react';
import { Header } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reports = [
  { id: 1, name: 'Monthly Revenue Report', description: 'Revenue breakdown by client and service', date: 'Generated Dec 1, 2024' },
  { id: 2, name: 'Client Activity Summary', description: 'Engagement metrics and activity logs', date: 'Generated Dec 1, 2024' },
  { id: 3, name: 'Invoice Aging Report', description: 'Outstanding invoices by due date', date: 'Generated Dec 1, 2024' },
  { id: 4, name: 'Quarterly Business Review', description: 'Q4 2024 performance summary', date: 'Generated Nov 30, 2024' },
];

export default function ReportsPage() {
  return (
    <div>
      <Header title="Reports" />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-forest-pale rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileBarChart className="w-6 h-6 text-forest" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-primary mb-1">{report.name}</h3>
                  <p className="text-sm text-neutral-secondary mb-2">{report.description}</p>
                  <p className="text-xs text-neutral-tertiary">{report.date}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t border-border-light">
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-1" /> Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
