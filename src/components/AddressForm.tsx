import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </form>
  );
};
export default AddressForm;
