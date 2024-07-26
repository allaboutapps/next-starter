export const locales = ["de", "en"] as const;
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export type Locales = (typeof locales)[number];

export const DEFAULT_LOCALE = "de";

export const MOBILE_BREAKPOINT = 768;

export const DEBUG = true;

export const IS_SERVER = typeof window === "undefined";

export const IS_BUILD = process?.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
