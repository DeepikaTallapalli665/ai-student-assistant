export type EventType =
  | 'placement'
  | 'internship'
  | 'interview'
  | 'assignment'
  | 'exam'
  | 'webinar'
  | 'college_notice';

export interface ExtractedEvent {
  title: string;
  dateTime: string;
  location: string;
  description: string;
  eventType: EventType;
  durationMinutes: number;
}

export interface Email {
  id: string;
  subject: string;
  sender: string;
  date: string;
  body: string;
  isRead: boolean;
  category: EventType | 'other';
  aiSummary: string;
  extractedEvent?: ExtractedEvent;
  syncedToCalendar: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  description: string;
  eventType: EventType;
  sourceEmailId?: string;
  calendarSynced: boolean;
}

export interface ConnectionStatus {
  googleAuth: boolean;
  gmailConnected: boolean;
  calendarConnected: boolean;
  n8nWebhookConnected: boolean;
  geminiConnected: boolean;
}

export interface SystemSettings {
  n8nWebhookUrl: string;
  customGoogleClientId: string;
  customGoogleClientSecret: string;
  enableAutoSync: boolean;
  enableNotifications: boolean;
  syncIntervalMinutes: number;
  filterKeywords: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  course: string;
  semester: string;
  avatarUrl: string;
}
