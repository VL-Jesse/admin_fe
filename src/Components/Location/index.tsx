import { Grid } from "@material-ui/core";
import GooglePlacesAutocomplete , { geocodeByPlaceId,geocodeByLatLng } from "react-google-places-autocomplete";
import { ILocationComponent } from "./types";

export const Location = ({address, setAddress, locationHandle}: ILocationComponent) => {
  const handleSelect = async (value:any) => {
    try {
    console.log(value)
    // const results = await geocodeByLatLng(value.place_id)
    const locationParams =  {
      addressLine: "",
      city: "",
      state: "",
      zipCode: "",
      latitude: 0,
      longitude: 0
    };
    locationHandle(locationParams)
    setAddress(value);

    } catch(e){
        console.log(e)
    }
  };

  return (
    <Grid>
        <GooglePlacesAutocomplete
        apiKey="AIzaSyA5bYw5QPkHBBkb5kM02-XcJpgFnOIA25Y"
        selectProps={{
          address,
          onChange: handleSelect,
        }}
        autocompletionRequest={{
            componentRestrictions: {
            country: ['us'],
            }
          }}
        />
    </Grid>
  );
}