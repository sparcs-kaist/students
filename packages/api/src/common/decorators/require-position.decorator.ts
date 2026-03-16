import { SetMetadata } from "@nestjs/common";

export enum Position {
  MANAGER = "manager",
  PRESIDENT = "president",
  STAFF = "staff",
  UAPRESIDENT = "uapresident",
}

export const REQUIRE_POSITIONS_KEY = "requirePositions";

export const RequirePositions = (...positions: Position[]) =>
  SetMetadata(REQUIRE_POSITIONS_KEY, positions);

export const ManagerOnly = () => RequirePositions(Position.MANAGER);
export const PresidentOnly = () => RequirePositions(Position.PRESIDENT);
export const StaffOnly = () => RequirePositions(Position.STAFF);
export const UapresidentOnly = () => RequirePositions(Position.UAPRESIDENT);
