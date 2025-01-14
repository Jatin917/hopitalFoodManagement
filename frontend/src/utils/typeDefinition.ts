import { z } from "zod";

// Enum schemas
export const RoleEnum = z.enum(["ADMIN", "PANTRY_STAFF", "DELIVERY_PERSONNEL"]);
export enum roleEnum {ADMIN="ADMIN",PANTRY_STAFF="PANTRY_STAFF",DELIVERY_PERSONNEL="DELIVERY_PERSONNEL"}
export type RoleType = z.infer<typeof RoleEnum>;

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);
export type GenderType = z.infer<typeof GenderEnum>;

export const MealTypeEnum = z.enum(["MORNING", "EVENING", "NIGHT"]);
export type MealEnumType = z.infer<typeof MealTypeEnum>;

export const MealStatusEnum = z.enum([
  "NOT_ASSIGNED",
  "PENDING",
  "IN_PREPARATION",
  "READY_FOR_DELIVERY",
  "DELIVERED",
]);
export type MealStatusType = z.infer<typeof MealStatusEnum>;

// Interfaces converted to Zod schemas

// User schema
export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: RoleEnum,
  contactInfo: z.string().nullable(),
  Pantryid: z.number().nullable(),
});
export type UserType = z.infer<typeof UserSchema>;

export const PantryStaffSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.literal("PANTRY_STAFF"),
  contactInfo: z.string().optional(),
});
export type PantryStaffType = z.infer<typeof PantryStaffSchema>;

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: RoleEnum,
  contactInfo: z.string().optional(),
  // Pantryid: z.number().optional(),
});
export type signUpType = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: RoleEnum,
});
export type signInType = z.infer<typeof SignInSchema>
// Patient schema
export const PatientSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  diseases: z.array(z.string()),
  allergies: z.array(z.string()),
  roomNumber: z.string(),
  bedNumber: z.string(),
  floorNumber: z.number(),
  age: z.number(),
  gender: GenderEnum,
  contactInfo: z.string(),
  emergencyContact: z.string(),
});
export type PatientType = z.infer<typeof PatientSchema>;

// DietChart schema
export const DietChartSchema = z.object({
  id: z.number().optional(),
  patientId: z.number(),
  morningMealId: z.number(),
  eveningMealId: z.number(),
  nightMealId: z.number(),
});
export type DietChartType = z.infer<typeof DietChartSchema>;

// Meal schema
export const MealSchema = z.object({
  ingredients: z.array(z.string()),
  instructions: z.string().optional(),
  mealType: MealTypeEnum,
});
export type MealType = z.infer<typeof MealSchema>;

// Pantry schema
export const PantrySchema = z.object({
  name: z.string(),
  contactInfo: z.string(),
  location: z.string(),
  staff:z.array(UserSchema).optional()
});
export type PantryType = z.infer<typeof PantrySchema>;

// PantryTask schema
export const PantryTaskSchema = z.object({
  staffId: z.number(),
  mealId: z.number(),
  createdAt:z.date().optional(),
  updatedAt:z.date().optional()
});
export type PantryTaskType = z.infer<typeof PantryTaskSchema>;

// DeliveryTask schema
export const DeliveryTaskSchema = z.object({
  deliveryPersonId: z.number(),
  mealId: z.number(),
  deliveredAt: z.date().optional(),
  deliveryNotes: z.string().optional(),
});
export type DeliveryTaskType = z.infer<typeof DeliveryTaskSchema>;

export const DeliveryPersonSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.literal("PANTRY_STAFF"),
  contactInfo: z.string().optional(),
});
export type DeliveryPersonType = z.infer<typeof DeliveryPersonSchema>;

// MealTracking schema
export const MealTrackingSchema = z.object({
  id: z.number().optional(),
  mealId: z.number().optional(),
  patientId: z.number().optional(),
  roomNumber: z.string(),
  status: MealStatusEnum,
  pantryStaffId: z.number().optional(),
  deliveryPersonId: z.number().optional(),
  preparedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  deliveryNotes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type MealTrackingType = z.infer<typeof MealTrackingSchema>;
