import { MicroCMSApiBaseSchema, MicroCMSCustomFieldBaseSchema } from './common';
import { MicroCMSApiWorksSchema } from './works';

export type MicroCMSCustomFieldPickupSchema = MicroCMSCustomFieldBaseSchema<
  'pickup',
  {
    title: string;
    description?: string;
    works: MicroCMSApiWorksSchema[];
  }
>;

export type MicroCMSCustomFieldMaintenanceSchema =
  MicroCMSCustomFieldBaseSchema<
    'maintenance',
    {
      enabled: boolean;
      message?: string;
    }
  >;

export type MicroCMSCustomFieldNotificationSchema =
  MicroCMSCustomFieldBaseSchema<
    'notification',
    {
      enabled: boolean;
      title?: string;
      url?: string;
    }
  >;

export type MicroCMSApiSettingsSchema = MicroCMSApiBaseSchema<{
  pickup: MicroCMSCustomFieldPickupSchema;
  maintenance: MicroCMSCustomFieldMaintenanceSchema;
  notificationBar: MicroCMSCustomFieldNotificationSchema;
}>;
