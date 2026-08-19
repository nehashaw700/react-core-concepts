import { useEffect, useState } from "react";

const AccordionItems = ({ data, shouldShow }) => {
  return shouldShow && <div>{data}</div>;
};

export default AccordionItems;
