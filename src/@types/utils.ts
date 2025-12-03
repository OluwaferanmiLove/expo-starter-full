import { CURRENCIES, Media, Transaction, Video } from 'catlog-shared';

export interface AppMediaType extends Omit<Media, 'imageHash' | 'file'> {
  file: string | null;
  imageHash?: string; // Optional for backward compatibility
  mediaHash?: string; // New hash property for all media types
  duration?: number; // Video duration in seconds
  fileSize?: number; // File size in bytes
  newFile?: boolean;
}

export interface Image {
  src: string;
  name: string;
  file: string | null; // base64 string
  isUploading: boolean;
  uploadProgress: number;
  url?: string;
  error?: boolean;
  newFile?: boolean;
  key: string;
  meta?: any;
  imageHash?: string;
  isPicker?: boolean;
  lastModified?: number;
}

export interface IMedia extends AppMediaType {
  // duration: number;
}

export interface IVideo extends AppMediaType {
  // duration: number;
  status?: "failed" | "completed" | "pending" | "processing";
  currentStep?: string;
  stepProgress?: Record<string, number>;
  overallProgress?: number;
  queueId?: string;
  meta?: {
    id: string;
    thumbnail: {
      src: string;
      name: string;
      lastModified: number;
      file: string | null;
      isUploading: boolean;
      uploadProgress: number;
      url: string;
      error: boolean;
      key: string;
    };
  };
}

export interface TrimData {
  duration: number;
  endPercentage: number;
  endTime: number;
  startPercentage: number;
  startTime: number;
  videoDuration: number;
}

export interface BaseTransaction {
  created_at: string;
}

export type GroupedTransactions<T extends BaseTransaction> = {
  date: Date;
  transactions: T[];
};

export type WithKey<T, K extends string> = T & { [key in K]: any };

export enum VERIFICATION_TYPE {
  'EMAIL',
  'PHONE',
}

export enum TimeRange {
  TODAY = 'Today',
  THIS_WEEK = 'This Week',
  LAST_WEEK = 'Last Week',
  LAST_30_DAYS = 'Last 30 Days',
  THIS_YEAR = 'This Year',
  ALL_TIME = 'All Time',
  CUSTOM = 'Custom',
}

export enum SETUP_TYPE {
  BOOK_ONBOARDING_CALL,
  JOIN_COMMUNITY,
  FOLLOW_OUR_SOCIALS,

  VERIFY_EMAIL_PHONE,
  UPLOAD_TEN_PRODUCTS,
  ADD_STORE_LINK_TO_SOCIAL,
  TAKE_ORDER_WITH_PAYMENT,

  ADD_LOGO_AND_COVER_IMAGE,
  ADD_LINK_TO_SOCIAL,
  UPLOAD_10_PRODUCT,
  VERIFY_IDENTITY,
  ADD_SECURITY_PIN,
  ADD_WITHDRAWAL_ACCOUNT,
  GET_VERIFIED,

  ADD_STORE_LOCATION,
  CUSTOMIZE_COLOR,
  ADD_DELIVERY_AREA,
  ADD_DELIVERY_TIMELINE,
}


export const ONBOARDING_CREDITS = {
  // [SETUP_TYPE.WATCH_SETUP_VIDEO]: {
  //   [CURRENCIES.NGN]: 500_00,
  //   [CURRENCIES.GHC]: 5_00,
  //   [CURRENCIES.KES]: 60_00,
  //   [CURRENCIES.ZAR]: 10_00,
  // },
  // [SETUP_TYPE.ENABLE_PUSH_NOTIFICATION]: {
  //   [CURRENCIES.NGN]: 250_00,
  //   [CURRENCIES.GHC]: 3_00,
  //   [CURRENCIES.KES]: 30_00,
  //   [CURRENCIES.ZAR]: 5_00,
  // },
  [SETUP_TYPE.TAKE_ORDER_WITH_PAYMENT]: {
    [CURRENCIES.NGN]: 250_00,
    [CURRENCIES.GHC]: 3_00,
    [CURRENCIES.KES]: 30_00,
    [CURRENCIES.ZAR]: 5_00,
  },
  [SETUP_TYPE.VERIFY_IDENTITY]: {
    [CURRENCIES.NGN]: 500_00,
    [CURRENCIES.GHC]: 5_00,
    [CURRENCIES.KES]: 60_00,
    [CURRENCIES.ZAR]: 10_00,
  },
  [SETUP_TYPE.UPLOAD_10_PRODUCT]: {
    [CURRENCIES.NGN]: 250_00,
    [CURRENCIES.GHC]: 3_00,
    [CURRENCIES.KES]: 30_00,
    [CURRENCIES.ZAR]: 5_00,
  },
};
