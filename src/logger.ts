/* eslint-disable no-console */
export function isBrowser(): boolean {
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
interface MICRO_AGENT {
  noticeError(
    arg0: Error,
    arg1: {
      customAttributes: { contextData: { [x: string]: unknown } };
      level: string;
    },
    arg2: () => void,
  ): unknown;
  log(
    message: string,
    options?: {
      customAttributes?: object;
      level?: "ERROR" | "WARN" | "INFO" | "TRACE" | "DEBUG";
    },
  ): unknown;
}
const isBrowserEnv = isBrowser();

let nrMicroAgent: MICRO_AGENT;
let nrMicroAgentInitPromise: Promise<void> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let testBrowserAgent: any;

if (isBrowserEnv) {
  nrMicroAgentInitPromise = (async () => {
    try {
      const { MicroAgent } = await import(
        "@newrelic/browser-agent/loaders/micro-agent"
      );
      const { Logging } = await import(
        "@newrelic/browser-agent/features/logging"
      );
      const { JSErrors } = await import(
        "@newrelic/browser-agent/features/jserrors"
      );

      const { BrowserAgent } = await import(
        "@newrelic/browser-agent/loaders/browser-agent"
      );

      const { NR } = await import("./constants.ts");
      const options = {
        info: {
          beacon: "bam.nr-data.net",
          errorBeacon: "bam.nr-data.net",
          licenseKey: NR.licenseKey,
          applicationID: NR.applicationID,
          sa: 1,
        },
        loader_config: {
          accountID: NR.accountID,
          trustKey: NR.trustKey,
          agentID: NR.agentID,
          licenseKey: NR.licenseKey,
          applicationID: NR.applicationID,
        },
        init: {
          distributed_tracing: { enabled: true },
          privacy: { cookies_enabled: true },
          ajax: { deny_list: ["bam.nr-data.net"] },
        },
        features: [Logging, JSErrors],
      };
      nrMicroAgent = new MicroAgent(options);
      testBrowserAgent = new BrowserAgent(options);
    } catch (error) {
      console.error("Failed to load New Relic modules:", error);
    }
  })();
}

const ensureAgentReady = async (): Promise<void> => {
  if (nrMicroAgentInitPromise) {
    await nrMicroAgentInitPromise;
  }
};

const error = async function (
  errorMeesage: string,
  contextData?: Record<string, unknown>,
): Promise<void> {
  await ensureAgentReady();
  if (nrMicroAgent) {
    try {
      const data = typeof contextData !== "undefined" ? { ...contextData } : {};
      nrMicroAgent.log(errorMeesage, {
        level: "ERROR",
        customAttributes: { contextData: data },
      });
    } catch (error) {
      console.error("Error logging error message:", error);
    }
  }
};

const warn = async function (
  warnMessage: string,
  contextData?: Record<string, unknown>,
): Promise<void> {
  await ensureAgentReady();
  if (nrMicroAgent) {
    try {
      const data = typeof contextData !== "undefined" ? { ...contextData } : {};
      nrMicroAgent.log(warnMessage, {
        level: "WARN",
        customAttributes: { contextData: data },
      });
    } catch (error) {
      console.error("Error logging warn message:", error);
    }
  }
};

const info = async function (
  infoMessage: string,
  contextData?: Record<string, unknown>,
): Promise<void> {
  await ensureAgentReady();

  if (nrMicroAgent) {
    try {
      console.log("start sending info log");
      const data = typeof contextData !== "undefined" ? { ...contextData } : {};

      nrMicroAgent.log("nrMicroAgent custom log APR 15 10:17 pm", {
        level: "DEBUG",
        customAttributes: { contextData: data },
      });
      testBrowserAgent.log("testBrowserAgent custom log APR 15 10:17 pm", {
        level: "INFO",
        customAttributes: { contextData: data },
      });
      console.log("end sending info log");

      // nrMicroAgent.log(infoMessage, {
      //   level: "INFO",
      //   customAttributes: { contextData: data },
      // });
      // testBrowserAgent.log(infoMessage, {
      //   level: "INFO",
      //   customAttributes: { contextData: data },
      // });
      //keepimg this for testing purpose, need to remove once custom log is working
      // nrMicroAgent.noticeError(
      //   new Error(infoMessage),
      //   {
      //     customAttributes: { contextData: data },
      //     level: "INFO",
      //   },
      //   () => {
      //     console.log("Info message logged successfully");
      //   },
      // );
    } catch (error) {
      console.error("Error logging info message:", error);
    }
  }
  else{
    console.log("test log not sent intentionally", infoMessage);
  }
};

export const logger = {
  error,
  warn,
  info,
};
