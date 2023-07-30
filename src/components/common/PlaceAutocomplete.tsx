import {
  createStyles,
  Group,
  List,
  TextInput,
  TextInputProps,
  Text,
} from "@mantine/core";
import usePlacesAutocomplete, {
  GeocodeResult,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useClickOutside } from "@mantine/hooks";

import React, { useEffect, useMemo, useState } from "react";
import { IconMap, IconMapPin } from "@tabler/icons-react";

import { GoogleMap } from "@react-google-maps/api";
import { SelectedPlace } from "../../types/SelectedPlace";

const usaCenter = {
  lat: 37.0902,
  lng: -95.7129,
};

const PlaceAutoComplete = (props: Props) => {
  const { setselectedplace, initialValue, initialTextValue, showMap, inputLabel, withIcon, inputClasses } = props;
  const { classes } = useStyles();
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: initialValue?.lat,
    lng: initialValue?.lng,
  });
  const [mapZoom, setMapZoom] = useState<number>(8);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      // restrict search within USA
      componentRestrictions: { country: "us" },
    },
    cache: false,
    debounce: 400,
  });
  const ref = useClickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInputChange = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  // const handleMapCenter

  const handleSelect =
    ({
      description,
      place_id,
      structured_formatting,
    }: google.maps.places.AutocompletePrediction) =>
    async () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      const geocodes = await getGeocode({ address: description });
      const { lat, lng } = getLatLng(geocodes[0]);

      // set map center to selected place
      setMapCenter({ lat, lng });

      // set selectedPlace state value
      setselectedplace({
        description,
        main_text: structured_formatting.main_text,
        secondary_text: structured_formatting.secondary_text,
        place_id,
        lat: lat.toString(),
        lng: lng.toString(),
      });

      setMapZoom(16);
    };

  const handleMapCenterChange = async () => {
    if (mapRef) {
      const center = mapRef.getCenter();
      if (!center) return;
      const lat = center.lat();
      const lng = center.lng();
      const geocode = await getGeocode({ location: { lat, lng } });
      setValue(geocode[0].formatted_address, false);
      clearSuggestions();
      setselectedplace({
        description: geocode[0].formatted_address,
        main_text: geocode[0].address_components[0].long_name,
        secondary_text: geocode[0].address_components[1].long_name,
        place_id: geocode[0].place_id,
        lat: lat.toString(),
        lng: lng.toString(),
      });
    }
  };

  const setMapCenterByAddress = async (address: string) => {
    const geocode = await getGeocode({ address });
    const { lat, lng } = getLatLng(geocode[0]);
    setMapCenter({ lat, lng });
  };

  useEffect(() => {
    if (initialValue && initialValue.description) {
      setValue(initialValue.description, false);
    } else if (initialTextValue) {
      setValue(initialTextValue, false);
      setMapCenterByAddress(initialTextValue);
      setMapZoom(16);
    } else {
      setValue("");
      setMapCenter(usaCenter);
    }
  }, [initialValue, initialTextValue]);

  //   List item for autocomplete suggestions
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Group
          className={classes.suggestionListItem}
          noWrap
          key={place_id}
          onClick={handleSelect(suggestion)}>
          <IconMapPin />

          <div>
            <Text>{main_text}</Text>
            <Text size="xs" color="dimmed">
              {secondary_text}
            </Text>
          </div>
        </Group>
      );
    });

  return (
    <div>
      <div ref={ref}>
        {/* Location search input */}
        <TextInput
          value={value}
          onChange={handleInputChange}
          disabled={!ready}
          icon={withIcon ? <IconMap /> : null}
          label={inputLabel}
          classNames={inputClasses}
          placeholder="Search places"
          {...props}
        />

        {status === "OK" && (
          <List className={classes.suggestionList}>{renderSuggestions()}</List>
        )}

        {showMap ? (
          <div
            style={{
              height: "400px",
              width: "100%",
              marginTop: "10px",
            }}>
            <GoogleMap
              id="map"
              options={mapOptions}
              zoom={mapZoom}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              onLoad={(map) => setMapRef(map)}
              onDragEnd={handleMapCenterChange}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PlaceAutoComplete;

// Styles
const useStyles = createStyles((theme, _params, getRef) => {
  return {
    suggestionList: {
      position: "absolute",
      zIndex: 10,
      marginTop: 10,
      backgroundColor: "white",
      boxShadow: theme.shadows.md,
      padding: 10,
      width: "calc(100% - 50px)",
    },
    suggestionListItem: {
      padding: 8,
      cursor: "pointer",
      borderRadius: 4,
      ":hover": {
        backgroundColor: theme.colors.gray[2],
      },
    },
  };
});

// Component props type
interface Props extends TextInputProps {
  setselectedplace: (selectedPlace: SelectedPlace) => void;
  initialValue?: any | null;
  initialTextValue?: string | undefined;
  showMap?: boolean;
  inputLabel?: string;
  withIcon?: boolean;
  inputClasses?: any;
}
