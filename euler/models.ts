export interface HandlerArgs { id: string, answer?: string };

export type Handler = (args: HandlerArgs) => Promise<string>

export type Command = "CREATE" | "RUN" | "VERIFY";