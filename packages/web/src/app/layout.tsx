import type { Metadata } from "next";

import classNames from "classnames";

import "@sparcs-students/web/styles/globals.css";

import {
  pretendard,
  raleway,
} from "@sparcs-students/web/styles/fonts/googleFonts";
import StyledComponentsRegistry from "@sparcs-students/web/common/libs/styledComponents/StyledComponentRegistry";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import Header from "@sparcs-students/web/common/components/Header";
import Footer from "@sparcs-students/web/common/components/Footer";

import { UseClientProvider } from "@sparcs-students/web/common/providers/UseClientProvider";
import ResponsiveContent from "@sparcs-students/web/common/components/Responsive";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import DebugBadge from "../common/components/DebugBadge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SPARCS Students for StudentsUA",
  description:
    "Created by SPARCS Academic Relations AR-007 TF Team, Copyright 2024",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={classNames(pretendard.variable, raleway.variable)}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <StyledComponentsRegistry>
              <UseClientProvider>
                <DebugBadge />
                <Header />
                <ResponsiveContent>{children}</ResponsiveContent>
                <Footer />
              </UseClientProvider>
            </StyledComponentsRegistry>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
