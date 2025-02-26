import { SeverityEnumType } from "@//constants/severityEnum";
import { StatusEnumType } from "@//constants/statusEnum";

export interface Report {
  id: string;
  image: string;
  severity: SeverityEnumType;
  coodenates?: { latitude: string; longitude: string };
  subregion?: string;
  address?: string;
  geohash?: string;
  district?: string;
  street?: string;
  status?: StatusEnumType;
  date: string;
  submit: boolean;
}
