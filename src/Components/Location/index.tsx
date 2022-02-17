import { Grid } from "@material-ui/core";
import GooglePlacesAutocomplete , { geocodeByAddress,getLatLng } from "react-google-places-autocomplete";
import { ILocationComponent } from "./types";

export const Location = ({address, setAddress, setValue}: ILocationComponent) => {
  const handleSelect = async (value:any) => {
    try { 
    let addressLine = ""
    setAddress(value);
    const address = await geocodeByAddress(value.label)
    const latLong = await getLatLng(address[0])
    address[0].address_components.forEach((element) => {
      if (element.types.includes("street_number")) {
        addressLine = element.long_name;
      }
      if (element.types.includes("route")) {
        addressLine =addressLine +" " + element.long_name;
      }
      if (element.types.includes("locality")) {
        setValue("AddressModels[0].city",element.long_name)
      }
      if (element.types.includes("administrative_area_level_1")) {
        setValue("AddressModels[0].state",element.short_name)
      }
      if (element.types.includes("postal_code")) {
        setValue("AddressModels[0].zipCode",element.long_name)
      }
    });
    if(addressLine){
      setValue("AddressModels[0].addressLine",addressLine)
    }
    if(latLong){
      setValue("AddressModels[0].location.latitude",latLong.lat)
      setValue("AddressModels[0].location.longitude",latLong.lng)
    }
    setAddress(null);
    } catch(e){
        setAddress(null);
    }
  };

  return (
    <Grid>
        <GooglePlacesAutocomplete
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