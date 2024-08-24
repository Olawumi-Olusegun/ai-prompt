"use client";

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;
