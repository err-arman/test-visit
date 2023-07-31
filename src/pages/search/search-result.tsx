import { GuestHeader } from "@/components/common/GuestHeader";
import hospitalData from "@/components/demoData";
import SearchBox from "@/components/search/SearchBox";
import useUser from "@/hooks/useUser";
import { Location } from "@/types/Location";
import axiosInstance, { setAuthToken } from "@/utils/api";
import validateToken from "@/utils/validateToken";
import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Image,
  ScrollArea,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { UserHeader } from "../../components/common/UserHeader";

const DEFAULT_ZOOM_LEVEL = 12;
type MapOptions = google.maps.MapOptions;

type Props = {
  token: string;
};

const SearchPage = ({ token }: Props) => {
  setAuthToken(token);
  const user = useUser(token);
  const router = useRouter();

  const { classes } = useStyles();
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const mapRef = useRef<google.maps.Map>();
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    // New york city
    lat: 40.73061,
    lng: -73.935242,
  });

  // map configuration
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      fullscreenControl: true,
      zoomControl: true,
      // styles: skyBlueMapStyle,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const handleSearch = () => {
    const { search_query, location, visit_time, accepted_patient } =
      router.query;
    setIsSearchLoading(true);
    console.log({
      search_query,
      location,
      visit_time,
      accepted_patient,
    });

    axiosInstance
      .post("/locations/search", {
        search_query,
        location,
        visit_time,
        accepted_patient,
      })
      .then((res) => {
        console.log(res.data);
        setIsSearchLoading(false);

        if (res.data?.success && res.data?.data?.locations) {
          setLocations(res.data.data.locations);
          // set map center to first location
          if (res.data.data.locations.length > 0) {
            setMapCenter({
              lat: res.data.data.locations[0].latitude,
              lng: res.data.data.locations[0].longitude,
            });
          }
        } else {
          setLocations([]);
          notifications.show({
            title: "No results found",
            message: res.data?.message || "No results found",
            color: "red",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSearchLoading(false);
      });
  };

  const handleClick = (location: any) => {
    const locationId = location.id;
    const url = `/hospital` + `?location_id=${locationId}`;
    router.push(url);
  };

  const getLatLongFromAddress = async (address: string) => {
    // Get latitude and longitude via utility functions
    const geocodes = await getGeocode({ address: address });
    const { lat, lng } = getLatLng(geocodes[0]);
    return { lat, lng };
  };

  const setMapCenterFromAddress = async (address: string) => {
    const { lat, lng } = await getLatLongFromAddress(address);
    setMapCenter({ lat, lng });
  };

  const zoomToLocation = async (location: Location) => {
    const { latitude, longitude } = location;
    mapRef.current?.panTo({
      lat: latitude,
      lng: longitude,
    });
    mapRef.current?.setZoom(16);
  };

  useEffect(() => {
    handleSearch();
    if (router.query?.location) {
      setMapCenterFromAddress(router.query.location as string);
    }
  }, [router.query]);

  return (
    <div>
      <Container size="xl">
        {token ? <UserHeader accessToken={token} /> : <GuestHeader />}
        <SearchBox isLoading={isSearchLoading} />

        <Flex className={classes.searchResultsRoot} gap="md">
          {/* <SearchResults /> */}
          <ScrollArea className={classes.searchResults}>
            {locations.length == 0 && (
              <Center mt={200}>
                <Text>No results found</Text>
              </Center>
            )}

            {locations.map((location) => (
              <Card
                key={location.id}
                className={classes.card}
                mb={10}
                shadow="sm"
                padding={"lg"}
                radius={"md"}
                withBorder
                onClick={() => {
                  handleClick(location);
                }}
              >
                <Flex gap={"lg"}>
                  <Group>
                    <Image
                      width={"100px"}
                      height={"100px"}
                      radius={"100%"}
                      src={hospitalData[0].image}
                    />
                  </Group>

                  <div>
                    <Title order={2}>{location.name}</Title>
                    <Text>
                      <b>Open:</b> {location.opens_at}
                    </Text>
                    <Text>
                      <b>Close:</b> {location.closes_at}
                    </Text>
                    <Text
                      onClick={(e) => {
                        e.stopPropagation();
                        zoomToLocation(location);
                      }}
                    >
                      <b>Address:</b> {location.address}
                    </Text>
                  </div>
                </Flex>
                <Text>
                  <b>Service: </b>
                  {location.services.map((service, index) => (
                    <span key={index}>{service}, </span>
                  ))}
                </Text>
              </Card>
            ))}
          </ScrollArea>

          {/* Google map */}
          <Box className={classes.googleMapRoot}>
            <GoogleMap
              zoom={DEFAULT_ZOOM_LEVEL}
              center={mapCenter}
              mapContainerClassName={classes.map_container}
              options={options}
              onLoad={onLoad}
            >
              {/* Marker */}
              {locations.map((location) => (
                <MarkerF
                  key={location.id}
                  position={{
                    lat: location.latitude,
                    lng: location.longitude,
                  }}
                  onClick={() => {
                    handleClick(location);
                  }}
                />
              ))}
            </GoogleMap>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    searchResultsRoot: {
      marginTop: "20px",
      position: "relative",
      height: `calc(100vh - 160px)`,
    },
    searchResults: {
      height: `calc(100vh - 160px)`,
      flex: 1,
    },
    googleMapRoot: {
      flex: 1,
    },
    map_container: {
      width: "100%",
      height: "100%",
      boxShadow: theme.shadows.md,
      borderRadius: theme.radius.sm,
    },
    card: {
      cursor: "pointer",
    },
  };
});

// get server side props
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookieName = process.env.COOKIE_NAME;
  // get token from cookie
  const token = ctx.req.cookies?.[cookieName || ""];
  if (!validateToken(token)) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  // if there is a token, return the token
  return {
    props: {
      token,
    },
  };
};

export default SearchPage;
