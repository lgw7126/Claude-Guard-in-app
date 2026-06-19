export type TabId = "home" | "care" | "feed";
export type ServiceType = "medicine" | "pet" | "escort";
export type AppFlowState = "idle" | "matching" | "success" | "escalation";

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}
