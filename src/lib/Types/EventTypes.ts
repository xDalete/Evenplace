import { StringfiedDate } from "./Types";

export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export type Event = {
  id: string;
  name: string;
  description: string;
  startDate: StringfiedDate;
  endDate?: StringfiedDate;
  location: string;
  organizerId: number;
  imageUrl: string;
  categories: string[];
  createdAt: StringfiedDate;
  updatedAt: StringfiedDate;
};

export type EventInfo = {
  attendeesLimit: number;
  attendeesCount: number;
  ticketsAvailable: number;
  ticketsSold: number;
  ticketsPrice: number;
  status: EventStatus;
};

export type EventWithInfo = Event & EventInfo;
