import React from "react";
import Hero from "../components/hero";
import Convenios from "../components/convenios";
import Afiliados from "../components/afiliados";
import Servicios from "./servicios";
import Footer from "../components/footer";


const Home = () => {
  return (
    <>
      <Hero />
      <Convenios />
      <Afiliados />
      <Servicios />
      <Footer />
    </>
  );
};
