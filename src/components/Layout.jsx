import { Fragment } from "react";
import Header from "./nav/Header";
import Footer from "./nav/Footer";

export default function LayOut(props) {
  return (
    <Fragment>
        <Header />
        <main>
            {props.children}
        </main>
        <Footer />
    </Fragment>
  )
}
