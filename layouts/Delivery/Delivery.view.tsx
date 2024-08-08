"use client";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fromLatLng, setKey, setLanguage } from "react-geocode";
import { IoLocationOutline } from "react-icons/io5";
import styles from "./Delivery.module.css";
import { DeliveryProps } from "./Delivery.props";
import Text from "@/components/Text";
import { Position } from "@/types/Position";

setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS as string);
setLanguage("en");

export default (props: DeliveryProps) => {
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition((position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const main = async () => {
      const session = await getSession();

      if (session?.user) {
        setName(`Deliver to ${session?.user.name}`);
      }
    };
    main();
  }, []);

  useEffect(() => {
    const main = async () => {
      if (position) {
        const results = (
          await fromLatLng(position.latitude, position.longitude)
        ).results;

        const result = results[0];

        if (result) {
          const addressComponents = result.address_components;

          const locality =
            addressComponents.find((addressComponent: any) =>
              addressComponent.types.includes("locality")
            ).short_name ?? "";

          const postalCode =
            addressComponents.find((addressComponent: any) =>
              addressComponent.types.includes("postal_code")
            ).short_name ?? "";

          setAddress(`${locality} ${postalCode}`);
        }
      }
    };
    main();
  }, [position]);

  return (
    <div className={styles.container}>
      <>
        <Text color="white">
          <IoLocationOutline size={24} />
        </Text>
        <div>
          <Text color="#CCCCCC" size={12}>
            {name}
          </Text>
          <Text color="white" weight={700}>
            {address}
          </Text>
        </div>
      </>
    </div>
  );
};
