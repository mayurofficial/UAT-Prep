declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module 'next' {
  export type Metadata = {
    title?: string | { default: string; template: string };
    description?: string;
    icons?: string | { icon: string };
    [key: string]: any;
  };

  export type Viewport = {
    width?: string | number;
    initialScale?: number;
    maximumScale?: number;
    userScalable?: boolean;
    themeColor?: string;
    [key: string]: any;
  };

  export type ResolvingMetadata = Promise<Metadata>;
  export type ResolvingViewport = Promise<Viewport>;
}

declare module 'next/types.js' {
  export type Metadata = {
    title?: string | { default: string; template: string };
    description?: string;
    [key: string]: any;
  };

  export type Viewport = {
    width?: string | number;
    initialScale?: number;
    maximumScale?: number;
    userScalable?: boolean;
    themeColor?: string;
    [key: string]: any;
  };

  export type ResolvingMetadata = Promise<Metadata>;
  export type ResolvingViewport = Promise<Viewport>;
}

declare module 'next/server' {
  export class NextRequest extends Request {
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
      has(name: string): boolean;
      set(name: string, value: string): void;
      delete(name: string): boolean;
      clear(): void;
    };
    nextUrl: URL;
    ip?: string;
  }

  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static rewrite(destination: string | URL, init?: ResponseInit): NextResponse;
    static next(init?: ResponseInit): NextResponse;
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
      has(name: string): boolean;
      set(options: {
        name: string;
        value: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: 'lax' | 'strict' | 'none';
        path?: string;
        maxAge?: number;
        expires?: Date;
      }): NextResponse;
      delete(name: string): boolean;
      clear(): void;
    };
  }
}

declare module 'next/server.js' {
  export class NextRequest extends Request {
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
      has(name: string): boolean;
      set(name: string, value: string): void;
      delete(name: string): boolean;
      clear(): void;
    };
    nextUrl: URL;
    ip?: string;
  }

  export class NextResponse extends Response {
    static json(body: any, init?: ResponseInit): NextResponse;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static rewrite(destination: string | URL, init?: ResponseInit): NextResponse;
    static next(init?: ResponseInit): NextResponse;
    cookies: {
      get(name: string): { name: string; value: string } | undefined;
      getAll(): Array<{ name: string; value: string }>;
      has(name: string): boolean;
      set(options: {
        name: string;
        value: string;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: 'lax' | 'strict' | 'none';
        path?: string;
        maxAge?: number;
        expires?: Date;
      }): NextResponse;
      delete(name: string): boolean;
      clear(): void;
    };
  }
}
