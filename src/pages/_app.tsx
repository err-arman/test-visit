import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import localFont from "next/font/local";
import { AppProps } from "next/app";
import Head from "next/head";
import { useLoadScript } from "@react-google-maps/api";
import "../styles/globals.css";
import PageLoading from "../components/common/PageLoading";
const crimsonPro = localFont({
  src: "../assets/fonts/CrimsonPro-VariableFont_wght.ttf",
});
const inter = localFont({
  src: "../assets/fonts/Inter-VariableFont_slnt_wght.ttf",
});

/*
theme colors guide
primary color: #FDCD00
secondary color: #15724F
title texts: #444342
all texts: #3A3A3A
light background: #F5F1EA
*/

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const googleMapLibraries: any = ["places"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
    libraries: googleMapLibraries,
  });
  if (!isLoaded) return <PageLoading />;

  return (
    <>
      <Head>
        <title>My-Visits</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: inter.style.fontFamily,
          headings: {
            fontFamily: crimsonPro.style.fontFamily,
          },
          // color

          colors: {
            "myvisits-yellow": [
              "#E8E5D8",
              "#DDD6BB",
              "#D6CB9D",
              "#D5C47C",
              "#DAC258",
              "#E8C52E",
              "#FDCD00",
              "#CDAA17",
              "#A88F25",
              "#8B7A2D",
            ],
            "myvisits-green": [
              "#628D7D",
              "#548573",
              "#477F6A",
              "#3A7A62",
              "#2E765B",
              "#217354",
              "#15724F",
              "#1B5E45",
              "#1F4F3D",
              "#204335",
            ],
            "myvisits-gray": [
              "#F5F1EA",
              "#E3DBCC",
              "#D0C6B4",
              "#BDB3A0",
              "#ABA18F",
              "#9B9180",
              "#8B8373",
            ],
          },
          // components
          components: {
            Text: {
              variants: {
                text: (theme) => ({
                  root: {
                    color: "#3A3A3A",
                  },
                }),
              },
            },
            Button: {
              variants: {
                primary: (theme) => ({
                  root: {
                    color: "#3A3A3A",
                    backgroundColor: "#FDCD00",
                    fontWeight: 500,
                    ...theme.fn.hover({
                      backgroundColor: "#D8B10B",
                    }),
                  },
                }),
                secondary: (theme) => ({
                  root: {
                    color: "#FFFFFF",
                    backgroundColor: "#15724F",
                    fontWeight: 500,
                    ...theme.fn.hover({
                      backgroundColor: "#176246",
                    }),
                  },
                }),
              },
            },
          },
        }}>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
