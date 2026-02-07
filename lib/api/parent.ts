import { api } from "./client";
import type {
  ParentDashboardResponse,
  MenteeStatusResponse,
  MentorInfoResponse,
} from "./parentTypes";

export const parentApi = {
  getDashboard: () =>
    api.get<ParentDashboardResponse>("/api/parent/dashboard"),

  getMenteeStatus: () =>
    api.get<MenteeStatusResponse>("/api/parent/mentee-status"),

  getMentorInfo: () =>
    api.get<MentorInfoResponse>("/api/parent/mentor-info"),
};
