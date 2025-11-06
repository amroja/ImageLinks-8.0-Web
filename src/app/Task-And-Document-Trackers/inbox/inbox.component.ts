import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

interface DocumentTag {
  label: string;
  type?: 'pending' | 'review';
  priority?: 'high' | 'medium' | 'low';
}

interface Document {
  id: string;
  title: string;
  user: string;
  date: string;
  department: string;
  tags: DocumentTag[];
}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatIcon],
})
export class InboxComponent implements OnInit {
  documents: Document[] = [];

  constructor() {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    // Mock Data
    this.documents = [
      {
        id: 'INV-2024-001',
        title: 'Document Instance INV-2024-001',
        user: 'John Smith',
        date: '2024-01-15',
        department: 'Accounting',
        tags: [
          { label: 'pending', type: 'pending' },
          { label: 'high priority', priority: 'high' },
          { label: 'Invoice' },
        ],
      },
      {
        id: 'HR-2024-045',
        title: 'Document Instance HR-2024-045',
        user: 'Sarah Johnson',
        date: '2024-01-14',
        department: 'HR',
        tags: [
          { label: 'review', type: 'review' },
          { label: 'medium priority', priority: 'medium' },
          { label: 'Policy' },
        ],
      },
      {
        id: 'FIN-2024-012',
        title: 'Document Instance FIN-2024-012',
        user: 'Michael Brown',
        date: '2024-01-13',
        department: 'Finance',
        tags: [
          { label: 'pending', type: 'pending' },
          { label: 'high priority', priority: 'high' },
          { label: 'Report' },
        ],
      },
      {
        id: 'IT-2024-089',
        title: 'Document Instance IT-2024-089',
        user: 'Emily Davis',
        date: '2024-01-12',
        department: 'IT',
        tags: [
          { label: 'review', type: 'review' },
          { label: 'low priority', priority: 'low' },
          { label: 'Request' },
        ],
      },
      {
        id: 'MKT-2024-033',
        title: 'Document Instance MKT-2024-033',
        user: 'David Wilson',
        date: '2024-01-11',
        department: 'Marketing',
        tags: [
          { label: 'pending', type: 'pending' },
          { label: 'medium priority', priority: 'medium' },
          { label: 'Campaign' },
        ],
      },
    ];
  }
}
